"""Gera os MP3 de uma unidade a partir do texto, usando espeak-ng (offline).
Uso: python make_audio.py <pasta_saida>
Requer: pip install espeakng-loader ; ffmpeg no PATH."""
import ctypes, sys, os, wave, subprocess, tempfile
import espeakng_loader as E

lib = ctypes.CDLL(E.get_library_path())
CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p)
lib.espeak_Initialize.restype = ctypes.c_int
RATE = lib.espeak_Initialize(2, 0, E.get_data_path().encode(), 0)
buf = bytearray()
def _cb(wav, n, ev):
    if wav and n > 0: buf.extend(ctypes.string_at(wav, n * 2))
    return 0
cb = CB(_cb); lib.espeak_SetSynthCallback(cb)

def say(text, voice, wpm=125, pitch=50):
    lib.espeak_SetVoiceByName(voice.encode())
    lib.espeak_SetParameter(1, wpm, 0)      # rate
    lib.espeak_SetParameter(3, pitch, 0)    # pitch
    buf.clear()
    b = text.encode()
    lib.espeak_Synth(b, len(b) + 1, 0, 0, 0, 1, None, None)
    lib.espeak_Synchronize()
    return bytes(buf)

def silence(sec): return b"\x00\x00" * int(RATE * sec)

VOICES = {"Tom": "en-us+m3", "Ana": "en-us+f3", "Yuki": "en-us+f5", "Carlos": "en-us+m7", "Emma": "en-gb+f4", "T": "en-us+f2"}

def render(parts, out_dir, name):
    pcm = b"".join(parts)
    wav_path = os.path.join(tempfile.gettempdir(), name + ".wav")
    with wave.open(wav_path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(pcm)
    out = os.path.join(out_dir, name + ".mp3")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav_path, "-ac", "1", "-b:a", "96k", out], check=True)
    os.remove(wav_path); print(out, round(len(pcm) / 2 / RATE, 1), "s")

def dialogue(lines, gap=0.7, wpm=125):
    parts = []
    for who, txt in lines: parts += [say(txt, VOICES[who], wpm), silence(gap)]
    return parts

def repeat_list(items, voice="T", gap_factor=1.0, wpm=115):
    parts = [say("Listen and repeat.", VOICES[voice], wpm), silence(1.0)]
    for it in items:
        s = say(it, VOICES[voice], wpm)
        parts += [s, silence(0.5 + gap_factor * len(s) / 2 / RATE + 0.5)]   # pausa para o aluno repetir
    return parts

if __name__ == "__main__":
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    render(dialogue([("Tom","Hello! I'm Tom. What's your name?"),("Ana","Hi, Tom! My name's Ana. Nice to meet you."),("Tom","Nice to meet you, too. Are you Brazilian?"),("Ana","Yes, I am. I'm from São Paulo. And you?"),("Tom","I'm from Canada. I'm a teacher."),("Ana","Great! I'm a student. See you later!")]), out, "1.1")
    render(dialogue([("Ana","Hi! I'm Ana. I'm from Brazil. I'm Brazilian. I'm a student."),("Tom","Hello! I'm Tom. I'm from Canada. I'm Canadian. I'm a teacher."),("Yuki","Hi! My name's Yuki. I'm from Japan. I'm Japanese. I'm a doctor.")], gap=1.2), out, "1.2")
    render(repeat_list(["Hello. Hi.","Good morning.","Good afternoon.","Good evening.","Goodbye. Bye.","See you later.","Nice to meet you.","Thank you."]), out, "1.3")
    render(repeat_list(["Brazil. Brazilian.","The USA. American.","Canada. Canadian.","England. English.","Portugal. Portuguese.","Japan. Japanese."]), out, "1.4")
    render(repeat_list(["teacher","student","doctor","engineer","manager"]), out, "1.5")
    render(repeat_list(list("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), gap_factor=0.6), out, "1.6")
    render(dialogue([("Carlos","Good evening! I'm Carlos. I'm from Brazil. C, A, R, L, O, S."),("Emma","Hi! I'm Emma. E, M, M, A. I'm from England."),("Yuki","Hello! My name's Yuki. Y, U, K, I. I'm from Japan. See you later!")], gap=2.0, wpm=115), out, "1.7")
