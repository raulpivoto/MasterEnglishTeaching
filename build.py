"""Builds the study site from its sources.

    pip install markdown   # once
    python build.py

Inputs
  src/studio.html   the page (no <html>/<head> wrapper), with an empty
                    <script id="formacaoData"> placeholder
  formacao/*.md     the three training tracks (one "## Módulo" per module)

Outputs
  dist/studio.html  the page published on Claude (artifact)
  index.html        the installable phone app (PWA), plus a new cache
                    version stamped into sw.js
"""

import hashlib
import json
import re
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent
TRACKS = [
    ("f1", "Trilha 1", "01-fluencia-c2.md"),
    ("f2", "Trilha 2", "02-metodologia-elt.md"),
    ("f3", "Trilha 3", "03-freire-idiomas.md"),
]


def md_to_html(text: str) -> str:
    # Python-Markdown nests lists at 4 spaces; the docs use 2 (GitHub style).
    text = re.sub(r"(?m)^( +)", lambda m: m.group(1) * 2, text)
    # ...and needs a blank line between a paragraph and a list that follows it.
    item = re.compile(r"^\s*(?:[-*]|\d+\.)\s")
    out = []
    for line in text.split("\n"):
        if item.match(line) and out and out[-1].strip() and not item.match(out[-1]):
            out.append("")
        out.append(line)
    return markdown.markdown("\n".join(out), extensions=["tables", "sane_lists"])


def parse_track(tid: str, label: str, filename: str) -> dict:
    raw = (ROOT / "formacao" / filename).read_text(encoding="utf-8")
    title = re.search(r"(?m)^# (.+)$", raw).group(1).split("·", 1)[-1].strip()
    parts = re.split(r"(?m)^## ", raw)
    intro = re.sub(r"(?m)^# .+$", "", parts[0])
    modules = []
    for i, part in enumerate(parts[1:], start=1):
        heading, _, body = part.partition("\n")
        modules.append({
            "id": f"{tid}-m{i}",
            "title": heading.strip(),
            "extra": not heading.startswith("Módulo"),
            "html": md_to_html(body.strip().rstrip("-").strip()),
        })
    return {"id": tid, "label": label, "title": title, "intro": md_to_html(intro.strip().rstrip("-").strip()), "modules": modules}


formacao = [parse_track(*t) for t in TRACKS]
data = json.dumps(formacao, ensure_ascii=False).replace("</", "<\\/")

src = (ROOT / "src" / "studio.html").read_text(encoding="utf-8")
placeholder = '<script type="application/json" id="formacaoData">[]</script>'
assert placeholder in src, "formacaoData placeholder missing from src/studio.html"
page_body = src.replace(placeholder, f'<script type="application/json" id="formacaoData">{data}</script>')

# 1) Artifact published on Claude
(ROOT / "dist").mkdir(exist_ok=True)
(ROOT / "dist" / "studio.html").write_text(page_body, encoding="utf-8")

# 2) Installable phone app
head_end = page_body.index("</style>") + len("</style>")
head, body = page_body[:head_end], page_body[head_end:]

pwa_head = """
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#2B46B0">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Lens Studio">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32.png">
<style>
/* same safe-area padding Claude's artifact viewer adds */
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
</style>"""

sw_register = """
<script>
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  navigator.serviceWorker.register("sw.js").catch(function(){});
}
</script>"""

page = ("<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n<meta charset=\"utf-8\">\n"
        + head + pwa_head + "\n</head>\n<body>\n" + body.strip() + "\n" + sw_register + "\n</body>\n</html>\n")
(ROOT / "index.html").write_text(page, encoding="utf-8")

version = hashlib.sha1(page.encode("utf-8")).hexdigest()[:10]
sw = ROOT / "sw.js"
sw.write_text(re.sub(r'const CACHE = "[^"]*";', f'const CACHE = "lls-{version}";', sw.read_text(encoding="utf-8")), encoding="utf-8")

n = sum(len([m for m in t["modules"] if not m["extra"]]) for t in formacao)
print(f"dist/studio.html + index.html built ({n} modules), cache lls-{version}")
