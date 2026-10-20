from playwright.sync_api import sync_playwright
url="file:///home/user/MasterEnglishTeaching/curso-ingles/web/study-guide-b1/index.html"
OUT="/home/user/MasterEnglishTeaching/curso-ingles/web/study-guide-b1-PRINTABLE.pdf"
CSS="""
@page{size:A4;margin:14mm 12mm}
.bar,.chips,#end,.say,.hint[data-def],.audio audio,.stepno~.hint{display:none!important}
.audio{background:#fff!important;color:#001737!important;border:1px dashed #9AA7BD;padding:4px 10px!important;margin:6px 0!important}
.audio .t:after{content:" (audio in the web version; or read the script aloud)";font-weight:400;color:#5B6B82}
.blk{break-before:page;margin-top:0}
#start{break-after:auto}
#answers{break-before:page}
h2,h3,h4,.tab,.exh,.audio,.steps{break-after:avoid}
.ex,.card,.item,.box,.text,.tl,tr,.tts{break-inside:avoid}
textarea{border:1.5px solid #9AA7BD!important;background:#fff!important}
.opts button{border:1.5px solid #9AA7BD!important}
table{min-width:0!important}
details.key{break-inside:auto}
"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
    pg=b.new_page(viewport={"width":1000,"height":900})
    pg.goto(url); pg.wait_for_timeout(800)
    pg.evaluate("""()=>{document.querySelectorAll('details').forEach(d=>d.open=true);
      document.querySelectorAll('textarea').forEach(t=>{t.style.height='auto'});
      const r=document.getElementById('answers');r.querySelector('.hint').textContent='Do not read this part until you finish the exercises of each block.';}""")
    pg.add_style_tag(content=CSS); pg.wait_for_timeout(800)
    pg.pdf(path=OUT,format="A4",print_background=True,scale=0.85,margin={"top":"14mm","bottom":"14mm","left":"12mm","right":"12mm"})
    print("ok")
