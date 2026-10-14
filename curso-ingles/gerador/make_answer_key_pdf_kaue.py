from playwright.sync_api import sync_playwright
url="file:///home/user/MasterEnglishTeaching/curso-ingles/web/homework-kaue-lesson1/index.html"
OUT="/home/user/MasterEnglishTeaching/curso-ingles/web/homework-kaue-lesson1-ANSWER-KEY.pdf"
SUMMARY=("My name is Sam. I'm twenty-five years old and I live in a big city. I work and I study at the same time. My hobbies are playing video games and going to the gym. "
"My favorite food is pizza, and my favorite animals are dogs because they are friendly. I have a dog. Last weekend I went to a birthday party on Saturday, and on Sunday I watched a thriller. I like thrillers because the plot is exciting.")
CSS="""
@page{size:A4;margin:14mm 12mm}
.bar,.donebox,.tools,.say,.audio audio,#rep,#repmsg,#nm,label[for],#repbox,.steps,.hint#defbox{display:none!important}
.audio{background:#fff!important;color:#001737!important;border:1px dashed #9AA7BD;padding:4px 10px!important;margin:6px 0!important}
.audio .t:after{content:" (audio in the page)";font-weight:400;color:#5B6B82}
.audio .n{background:#FFCD04}
html{scroll-behavior:auto}
.ex,.card,.item,.box,.text,.model,figure,.flashrow{break-inside:avoid}
section{padding-top:16px}
.banner{background:#001737;color:#FFCD04;border-radius:12px;padding:12px 18px;margin:12px 0;font:700 20px 'Arial Narrow',Arial,sans-serif;letter-spacing:.08em}
.banner small{display:block;color:#fff;font:400 13px Calibri,Arial,sans-serif;letter-spacing:0;margin-top:2px}
.photo.wide img{aspect-ratio:21/6}
table{min-width:0!important}
.key td:first-child{white-space:normal}
h2,h3,.tab,.exh,.audio,.photo{break-after:avoid}
.model{display:none!important}
textarea{border:2px solid #7EE0B8!important;background:#E2F7EE!important;min-height:0!important;height:auto}
"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
    pg=b.new_page(viewport={"width":1000,"height":900})
    pg.goto(url); pg.wait_for_timeout(800)
    pg.evaluate("""(SUMMARY)=>{
      document.querySelectorAll('.ex[data-ex]').forEach(ex=>{const bs=[...ex.querySelectorAll('.tools button')];bs[1].click();bs[0].click()});
      document.querySelectorAll('.model').forEach(m=>m.classList.add('show'));
      document.querySelectorAll('details').forEach(d=>d.open=true);
      // open answers
      CQ.forEach((q,i)=>{const t=document.querySelector('[data-k=cq'+i+']');t.value=q[1]});
      document.querySelector('[data-k=warm]').value='1. My name is Sam. 2. I live in Campinas. 3. I am twenty-five years old. 4. I am from Brazil.';
      const hw=document.getElementById('hw');hw.value=SUMMARY;
      document.querySelectorAll('textarea').forEach(t=>{t.style.height='auto';t.rows=Math.max(2,Math.ceil(t.value.length/95));t.style.minHeight='0'});
      // flashcards as a table
      document.getElementById('cards').outerHTML='<div class="tbl"><table class="key"><thead><tr><th>Word</th><th>Meaning</th><th>Example</th><th>PT</th></tr></thead><tbody>'+CARDS.map(c=>'<tr><td>'+c[0]+' <span class="hint">('+c[1]+')</span></td><td>'+c[2]+'</td><td><i>'+c[3]+'</i></td><td>'+c[4]+'</td></tr>').join('')+'</tbody></table></div>';
      // mc buttons: show chosen answer only
      document.querySelectorAll('.opts button[aria-pressed=false]').forEach(b=>b.style.opacity='.35');
      // photos: remove lazy
      document.querySelectorAll('img').forEach(i=>i.loading='eager');
      // banner
      const h=document.querySelector('.hero');const bn=document.createElement('div');bn.className='banner';bn.innerHTML='ANSWER KEY · Homework Lesson 1<small>All exercises completed with the correct answers, model answers for the open questions, and a model paragraph. Audio is played in the web page.</small>';h.after(bn);
      document.getElementById('rates').outerHTML='';
      [...document.querySelectorAll('h3')].filter(h=>h.textContent==='Your report').forEach(h=>h.remove());const nmp=document.getElementById('nm');if(nmp)nmp.closest('p').remove();document.getElementById('copy').closest('.tools').remove();
    }""",SUMMARY)
    pg.add_style_tag(content=CSS)
    pg.wait_for_timeout(1500)
    pg.pdf(path=OUT,format="A4",print_background=True,margin={"top":"14mm","bottom":"14mm","left":"12mm","right":"12mm"})
    print("ok")
