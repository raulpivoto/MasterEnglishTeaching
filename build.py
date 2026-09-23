"""Builds the installable phone app (index.html) from src/studio.html.

src/studio.html is the page as published on Claude (no <html>/<head> wrapper).
This script wraps it into a full document, adds the PWA tags (manifest, icons,
service worker) and stamps a new cache version into sw.js.

    python build.py
"""

import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
src = (ROOT / "src" / "studio.html").read_text(encoding="utf-8")

head_end = src.index("</style>") + len("</style>")
head, body = src[:head_end], src[head_end:]

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
print(f"index.html built, cache lls-{version}")
