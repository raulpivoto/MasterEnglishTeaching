"""Gera os MP3 da unidade com vozes neurais Kokoro-82M (ONNX), offline depois de baixar o modelo.
Uso: python make_audio.py <pasta_saida> [pasta_modelo]
Requer: pip install kokoro-onnx onnxruntime ; ffmpeg no PATH.
Modelo/vozes (Hugging Face onnx-community/Kokoro-82M-v1.0-ONNX): onnx/model.onnx e voices/<voz>.bin"""
import sys, os, re, wave, subprocess, tempfile
import numpy as np, onnxruntime as ort
from kokoro_onnx.tokenizer import Tokenizer

MODEL_DIR = sys.argv[2] if len(sys.argv) > 2 else "/tmp/claude-0/kok"
SR = 24000
sess = ort.InferenceSession(os.path.join(MODEL_DIR, "model.onnx"), providers=["CPUExecutionProvider"])
tok = Tokenizer()
_voices = {}
def voice(name):
    if name not in _voices:
        _voices[name] = np.fromfile(os.path.join(MODEL_DIR, name + ".bin"), dtype=np.float32).reshape(-1, 256)
    return _voices[name]

def say(text, v, speed=0.85):
    """Uma frase -> áudio float32. Frases longas são divididas por pontuação."""
    chunks = [c for c in re.split(r"(?<=[.!?])\s+", text.strip()) if c]
    out = []
    for c in chunks:
        ph = tok.phonemize(c, "en-us")
        ids = tok.tokenize(ph)[:500]
        style = voice(v)[len(ids) - 1][None, :]
        audio = sess.run(None, {"input_ids": np.array([[0, *ids, 0]], dtype=np.int64), "style": style.astype(np.float32), "speed": np.array([speed], dtype=np.float32)})[0].ravel()
        out += [audio, silence(0.25)]
    return np.concatenate(out)

def silence(sec): return np.zeros(int(SR * sec), dtype=np.float32)

VOICES = {"Tom": "am_michael", "Ana": "af_bella", "Yuki": "af_sky", "Carlos": "am_adam", "Emma": "bf_emma", "T": "af_heart"}

def render(parts, out_dir, name):
    pcm = (np.clip(np.concatenate(parts), -1, 1) * 32767).astype(np.int16)
    wav_path = os.path.join(tempfile.gettempdir(), name + ".wav")
    with wave.open(wav_path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    out = os.path.join(out_dir, name + ".mp3")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav_path, "-ac", "1", "-b:a", "96k", out], check=True)
    os.remove(wav_path); print(out, round(len(pcm) / SR, 1), "s")

def dialogue(lines, gap=0.8, speed=0.85):
    parts = []
    for who, txt in lines: parts += [say(txt, VOICES[who], speed), silence(gap)]
    return parts

def repeat_list(items, voice_key="T", extra=0.6, speed=0.8, intro=True):
    parts = [say("Listen and repeat.", VOICES[voice_key], speed), silence(1.0)] if intro else []
    for it in items:
        a = say(it, VOICES[voice_key], speed)
        parts += [a, silence(len(a) / SR + extra)]   # pausa do tamanho da frase, para o aluno repetir
    return parts

if __name__ == "__main__":
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    render(dialogue([("Tom","Hello! I'm Tom. What's your name?"),("Ana","Hi, Tom! My name's Ana. Nice to meet you."),("Tom","Nice to meet you, too. Are you Brazilian?"),("Ana","Yes, I am. I'm from São Paulo. And you?"),("Tom","I'm from Canada. I'm a teacher."),("Ana","Great! I'm a student. See you later!")]), out, "1.1")
    render(dialogue([("Ana","Hi! I'm Ana. I'm from Brazil. I'm Brazilian. I'm a student."),("Tom","Hello! I'm Tom. I'm from Canada. I'm Canadian. I'm a teacher."),("Yuki","Hi! My name's Yuki. I'm from Japan. I'm Japanese. I'm a doctor.")], gap=1.2), out, "1.2")
    render(repeat_list(["Hello. Hi.","Good morning.","Good afternoon.","Good evening.","Goodbye. Bye.","See you later.","Nice to meet you.","Thank you."]), out, "1.3")
    render(repeat_list(["Brazil. Brazilian.","The USA. American.","Canada. Canadian.","England. English.","Portugal. Portuguese.","Japan. Japanese."]), out, "1.4")
    render(repeat_list(["teacher.","student.","doctor.","engineer.","manager."]), out, "1.5")
    render(repeat_list([f"{l}." for l in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"], extra=0.3), out, "1.6")
    render(dialogue([("Carlos","Good evening! I'm Carlos. I'm from Brazil. C. A. R. L. O. S."),("Emma","Hi! I'm Emma. E. M. M. A. I'm from England."),("Yuki","Hello! My name's Yuki. Y. U. K. I. I'm from Japan. See you later!")], gap=2.0, speed=0.8), out, "1.7")
