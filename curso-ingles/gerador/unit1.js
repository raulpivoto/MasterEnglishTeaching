const fs = require("fs");
const L = require("./lib.js");
const { pptxgen, icon, svg2png, avatar, PEOPLE, flag, T, box, dot, pill, exHead, audio, line, note, C, HF, BF } = L;
const W = 8.27, H = 11.69, M = 0.6, CW = W - 2*M;
const NAVY=C.NAVY, YEL=C.YEL, GREY=C.GREY;

(async () => {
  const pres = new pptxgen();
  pres.defineLayout({ name: "A4", width: W, height: H }); pres.layout = "A4";
  pres.author = "Raul Pivoto"; pres.company = "The English Skyrocket";
  pres.defineSlideMaster({ title: "PAGE", background: { color: "FFFFFF" },
    objects: [{ text: { text: "THE ENGLISH SKYROCKET  ·  BOOK 1  ·  A1", options: { x: M, y: 11.2, w: 5, h: 0.22, fontSize: 9, bold: true, color: GREY, charSpacing: 2, fontFace: BF, margin: 0 } } }],
    slideNumber: { x: W-M-0.5, y: 11.2, w: 0.5, h: 0.22, color: GREY, fontSize: 10, bold: true, align: "right", fontFace: BF } });

  const av = {}; for (const k of Object.keys(PEOPLE)) av[k] = await svg2png(avatar(PEOPLE[k]), 400);
  const fl = {}; for (const k of ["Brazil","USA","Canada","England","Portugal","Japan"]) fl[k] = await svg2png(flag(k), 500);
  const ic = {}; for (const [k,n,col] of [["sun","FaSun"],["cloud","FaCloudSun"],["moon","FaMoon"],["bed","FaBed"],["chat","FaCommentDots"],["user","FaUserAlt"],["globe","FaGlobeAmericas"],["font","FaFont"],
    ["hand","FaHandPaper"],["walk","FaWalking"],["clock","FaClock"],["shake","FaHandshake"],["smile","FaSmile"],["teacher","FaChalkboardTeacher"],["student","FaUserGraduate"],["doctor","FaUserMd"],["eng","FaHardHat"],["mgr","FaBriefcase"],["phones","FaHeadphones","#FFCD04"]]) ic[k] = await icon(n, col||"#001737");

  // real photo if imgs/<key>.jpg exists, else the fallback drawing
  function photo(s, key, x, y, w, h, fallback) {
    const f = `${__dirname}/imgs/${key}.jpg`;
    if (fs.existsSync(f)) s.addImage({ path: f, x, y, w, h, sizing: { type: "cover", w, h }, altText: key });
    else fallback();
  }
  function sect(s, y, num, label, ttl, size=26) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:M,y,w:0.34,h:0.3,rectRadius:0.06,fill:{color:NAVY},line:{color:NAVY,width:0},objectName:"Section number"});
    s.addText(String(num),{isTextBox:true,x:M,y,w:0.34,h:0.3,align:"center",valign:"middle",fontFace:BF,fontSize:13,bold:true,color:YEL,margin:0});
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:M+0.38,y,w:2.3,h:0.3,rectRadius:0.06,fill:{color:YEL},line:{color:YEL,width:0},objectName:"Section tab"});
    s.addText(label.toUpperCase(),{isTextBox:true,x:M+0.38,y,w:2.3,h:0.3,align:"center",valign:"middle",fontFace:BF,fontSize:11,bold:true,color:NAVY,charSpacing:2,margin:0});
    s.addText(ttl,{isTextBox:true,x:M,y:y+0.36,w:CW,h:0.5,fontFace:HF,fontSize:size,bold:true,color:NAVY,margin:0,valign:"middle",objectName:"Title"});
  }
  const ex = (s,x,y,l,t)=>exHead(pres,s,x,y,l,t,CW-0.5);
  const num = (s,x,y,n,d=0.36)=>dot(pres,s,x,y,d,C.BLUET,n,NAVY,12);
  const P = () => pres.addSlide({ masterName: "PAGE" });
  let s;

  // ===== PAGE 1: UNIT OPENER =====
  s = P();
  s.addText("THE ENGLISH SKYROCKET  ·  BOOK 1  ·  LEVEL A1",{isTextBox:true,x:M,y:0.5,w:6,h:0.3,fontFace:BF,fontSize:11,bold:true,color:GREY,charSpacing:3,margin:0});
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:M,y:1.0,w:1.5,h:1.5,rectRadius:0.15,fill:{color:YEL},line:{color:YEL,width:0},objectName:"Unit number tile"});
  s.addText("1",{isTextBox:true,x:M,y:1.0,w:1.5,h:1.5,align:"center",valign:"middle",fontFace:HF,fontSize:96,bold:true,color:NAVY,margin:0});
  s.addText("UNIT",{isTextBox:true,x:2.35,y:1.0,w:3,h:0.3,fontFace:BF,fontSize:13,bold:true,color:GREY,charSpacing:4,margin:0});
  s.addText("Hello! Nice to meet you",{isTextBox:true,x:2.35,y:1.3,w:5.3,h:1.2,fontFace:HF,fontSize:38,bold:true,color:NAVY,margin:0,valign:"top"});
  photo(s,"cover",M,2.85,CW,3.6,()=>{
    box(pres,s,M,2.85,CW,3.6,C.PANEL,C.LINE,"Photo area");
    s.addImage({data:av.tom,x:1.2,y:3.2,w:1.7,h:1.7,altText:"Tom"}); pill(pres,s,3.0,3.35,1.5,0.55,C.WHITE,"Hello!",NAVY,18);
    s.addImage({data:av.ana,x:5.5,y:3.9,w:1.7,h:1.7,altText:"Ana"}); pill(pres,s,3.6,4.35,1.7,0.55,YEL,"Hi, Tom!",NAVY,18);
    s.addImage({data:av.yuki,x:1.9,y:4.8,w:1.4,h:1.4,altText:"Yuki"}); pill(pres,s,3.5,5.2,1.7,0.55,C.WHITE,"I'm Yuki.",NAVY,18);
  });
  T(s,"In this unit, I can…",{x:M,y:6.75,w:CW,h:0.4,base:{fontSize:20,bold:true}});
  [[ic.chat,"Greet people","dizer *Hello*, *Good morning* e *Goodbye*",C.YELT],[ic.user,"Introduce myself","dizer meu nome e perguntar o nome de alguém",C.BLUET],[ic.globe,"Say where I'm from","dizer meu país, nacionalidade e profissão",C.MINTT],[ic.font,"Spell words","falar o alfabeto e soletrar meu nome",C.LILT]].forEach((c,i)=>{
    const x=M+(i%2)*3.6, y=7.25+Math.floor(i/2)*1.3;
    box(pres,s,x,y,3.47,1.18,c[3]);
    dot(pres,s,x+0.15,y+0.3,0.58,C.WHITE); s.addImage({data:c[0],x:x+0.29,y:y+0.44,w:0.3,h:0.3,altText:c[1]});
    s.addText(c[1],{isTextBox:true,x:x+0.9,y:y+0.12,w:2.5,h:0.35,fontFace:HF,fontSize:18,bold:true,color:NAVY,margin:0});
    T(s,c[2],{x:x+0.9,y:y+0.5,w:2.45,h:0.6,base:{fontSize:11,color:GREY}});
  });
  [["Vocabulary","greetings · countries · jobs · alphabet"],["Grammar","verb to be (I / you)"],["Skills","dialogue · reading · listening · speaking · writing"]].forEach((r,i)=>{
    pill(pres,s,M,10.0+i*0.38,1.25,0.28,C.BLUET,r[0].toUpperCase(),NAVY,10);
    T(s,r[1],{x:2.0,y:10.0+i*0.38,w:5.6,h:0.28,base:{fontSize:12,color:GREY},valign:"middle"});
  });
  s.addNotes("Book 1 · Unit 1 (página de abertura). Receba o aluno com 'Hello! Welcome!'. Tempo total da unidade: cerca de 135 minutos (2 aulas). Foto de capa: coloque imgs/cover.jpg para substituir a ilustração.");

  // ===== PAGE 2: WARM-UP + DIALOGUE =====
  s = P();
  sect(s,0.45,1,"Warm-up","Say hello!");
  ex(s,M,1.5,"A","Match the greetings (1–4) with the pictures (a–d).");
  [["a","moon","moon","8:00 p.m.",C.LILT],["b","sun","sun","7:00 a.m.",C.YELT],["c","bed","bed","11:00 p.m.",C.MINTT],["d","cloud","cloud","3:00 p.m.",C.BLUET]].forEach((p,i)=>{
    const x=M+i*1.8, y=2.0;
    photo(s,"warmup-"+p[0],x,y,1.65,1.5,()=>{ box(pres,s,x,y,1.65,1.5,p[4]); s.addImage({data:ic[p[1]],x:x+0.52,y:y+0.28,w:0.6,h:0.6,altText:"Time of day "+p[0]}); });
    pill(pres,s,x+0.08,y+0.08,0.32,0.28,NAVY,p[0],YEL,12);
    s.addText(p[3],{isTextBox:true,x,y:y+1.05,w:1.65,h:0.35,align:"center",fontFace:BF,fontSize:13,bold:true,color:NAVY,margin:0});
  });
  ["Good morning","Good afternoon","Good evening","Good night"].forEach((g,i)=>{
    const x=M+(i%2)*3.6, y=3.75+Math.floor(i/2)*0.5;
    dot(pres,s,x,y,0.36,NAVY,i+1,YEL,12); T(s,g,{x:x+0.5,y,w:1.9,h:0.36,base:{fontSize:14,bold:true},valign:"middle"}); s.addText("→ ____",{isTextBox:true,x:x+2.4,y,w:0.9,h:0.36,fontFace:BF,fontSize:14,color:GREY,margin:0,valign:"middle"});
  });
  box(pres,s,M,4.85,CW,0.75,C.YELT,"F2D869"); pill(pres,s,M+0.15,4.71,0.9,0.28,YEL,"SPEAK",NAVY,10);
  T(s,"Say *Hello!* to your teacher. Then answer: *What's your name?*",{x:M+0.2,y:5.08,w:6.6,h:0.4,base:{fontSize:13}});
  sect(s,5.95,2,"Dialogue","Meeting for the first time");
  audio(pres,s,M,6.9,"1.1",ic.phones); T(s,"Listen and read.",{x:M+1.1,y:6.9,w:4,h:0.32,base:{fontSize:13,bold:true},valign:"middle"});
  [["tom","Tom","Hello! I'm Tom. What's your name?"],["ana","Ana","Hi, Tom! My name's Ana. Nice to meet you."],["tom","Tom","Nice to meet you, too. Are you Brazilian?"],["ana","Ana","Yes, I am. I'm from São Paulo. And you?"],["tom","Tom","I'm from Canada. I'm a teacher."],["ana","Ana","Great! I'm a student. See you later!"]].forEach((d,i)=>{
    const right=d[0]==="ana", y=7.4+i*0.62, bx=right?1.3:M+0.6;
    s.addImage({data:av[d[0]],x:right?W-M-0.52:M,y,w:0.52,h:0.52,altText:d[1]});
    box(pres,s,bx,y,5.75,0.52,right?C.YELT:C.PANEL,right?"F2D869":C.LINE,"Bubble");
    T(s,"*"+d[1]+":*  "+d[2],{x:bx+0.15,y,w:5.45,h:0.52,base:{fontSize:12.5},valign:"middle",hl:GREY});
  });
  s.addNotes("Warm-up. Gabarito A: 1 b · 2 d · 3 a · 4 c. Dialogue: toque o áudio 1.1 duas vezes (1ª só ouvir, 2ª repetir). Depois o aluno lê como Ana e você como Tom; troquem os papéis.");

  // ===== PAGE 3: COMPREHENSION + READING =====
  s = P();
  sect(s,0.45,2,"Dialogue","Check your understanding");
  ex(s,M,1.5,"A","Read the dialogue again. True (T) or false (F)?");
  ["Tom is Brazilian.","Ana is from São Paulo.","Tom is a teacher.","Ana is a teacher."].forEach((q,i)=>{
    const y=2.0+i*0.5; num(s,M,y,i+1); T(s,q,{x:M+0.5,y,w:4.0,h:0.36,base:{fontSize:14},valign:"middle"});
    ["T","F"].forEach((l,j)=>{ s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:5.9+j*0.55,y:y+0.01,w:0.45,h:0.34,rectRadius:0.06,fill:{color:C.WHITE},line:{color:"9AA7BD",width:1.25},objectName:"Check box"}); s.addText(l,{isTextBox:true,x:5.9+j*0.55,y:y+0.01,w:0.45,h:0.34,align:"center",valign:"middle",fontFace:BF,fontSize:12,bold:true,color:GREY,margin:0}); });
  });
  ex(s,M,4.2,"B","Answer the questions.");
  ["What's Tom's job?","Where is Ana from?","Is Tom from Brazil?"].forEach((q,i)=>{
    const y=4.7+i*0.7; num(s,M,y,i+1); T(s,q,{x:M+0.5,y,w:3.2,h:0.36,base:{fontSize:14},valign:"middle"}); line(pres,s,M+3.6,y+0.32,3.4);
  });
  box(pres,s,M,6.85,CW,0.5,C.YELT,"F2D869"); T(s,"Correct the false sentences: *Tom is Canadian.*",{x:M+0.2,y:6.85,w:6.6,h:0.5,base:{fontSize:13},valign:"middle",hl:NAVY});
  sect(s,7.65,2,"Reading","Meet the students");
  audio(pres,s,M,8.6,"1.2",ic.phones); T(s,"Listen and read the profiles.",{x:M+1.1,y:8.6,w:5,h:0.32,base:{fontSize:13,bold:true},valign:"middle"});
  [["ana","Brazil","Ana","Hi! I'm Ana. I'm from Brazil. I'm Brazilian. I'm a student.",C.YELT],["tom","Canada","Tom","Hello! I'm Tom. I'm from Canada. I'm Canadian. I'm a teacher.",C.BLUET],["yuki","Japan","Yuki","Hi! My name's Yuki. I'm from Japan. I'm Japanese. I'm a doctor.",C.MINTT]].forEach((p,i)=>{
    const x=M+i*2.4;
    box(pres,s,x,9.05,2.27,2.0,p[4]);
    photo(s,"person-"+p[2].toLowerCase(),x+0.1,9.15,0.8,0.8,()=>s.addImage({data:av[p[0]],x:x+0.1,y:9.15,w:0.8,h:0.8,altText:p[2]}));
    s.addImage({data:fl[p[1]],x:x+1.1,y:9.2,w:0.7,h:0.47,altText:p[1]+" flag"});
    s.addText(p[2],{isTextBox:true,x:x+1.1,y:9.68,w:1.1,h:0.3,fontFace:HF,fontSize:18,bold:true,color:NAVY,margin:0,valign:"middle"});
    T(s,p[3],{x:x+0.12,y:10.05,w:2.05,h:0.95,base:{fontSize:11.5}});
  });
  s.addNotes("Gabarito A: 1 F · 2 T · 3 T · 4 F. B: 1 A teacher. · 2 São Paulo (Brazil). · 3 No, he isn't (he's Canadian). Perfis: o aluno 'é' um dos personagens e lê na 1ª pessoa.");

  // ===== PAGE 4: READING TASK + VOCAB GREETINGS + COUNTRIES =====
  s = P();
  sect(s,0.45,2,"Reading","Read and write the names",22);
  [["Who is from Canada?"],["Who is a doctor?"],["Who is Brazilian?"]].forEach((q,i)=>{ const x=M+i*2.4; T(s,q[0],{x,y:1.45,w:2.3,h:0.3,base:{fontSize:13}}); line(pres,s,x,2.05,2.1); });
  sect(s,2.45,3,"Vocabulary","Greetings & goodbyes");
  audio(pres,s,M,3.4,"1.3",ic.phones); T(s,"Listen and repeat.",{x:M+1.1,y:3.4,w:5,h:0.32,base:{fontSize:13,bold:true},valign:"middle"});
  [[ic.hand,"Hello / Hi","Olá / Oi","Hi, Tom!",C.YELT],[ic.sun,"Good morning","Bom dia","Good morning, Ana.",C.BLUET],[ic.cloud,"Good afternoon","Boa tarde","Good afternoon!",C.MINTT],[ic.moon,"Good evening","Boa noite (chegada)","Good evening, all.",C.LILT],
   [ic.walk,"Goodbye / Bye","Tchau","Bye, see you!",C.YELT],[ic.clock,"See you later","Até mais","See you later!",C.BLUET],[ic.shake,"Nice to meet you","Prazer em conhecer","Nice to meet you.",C.MINTT],[ic.smile,"Thank you","Obrigado(a)","Thank you, Tom.",C.LILT]].forEach((v,i)=>{
    const x=M+(i%4)*1.78, y=3.85+Math.floor(i/4)*1.6;
    box(pres,s,x,y,1.68,1.48,v[4]);
    dot(pres,s,x+0.1,y+0.1,0.46,C.WHITE); s.addImage({data:v[0],x:x+0.22,y:y+0.22,w:0.22,h:0.22,altText:v[1]});
    s.addText(v[1],{isTextBox:true,x:x+0.1,y:y+0.65,w:1.5,h:0.28,fontFace:BF,fontSize:12.5,bold:true,color:NAVY,margin:0});
    T(s,v[2],{x:x+0.1,y:y+0.92,w:1.5,h:0.22,base:{fontSize:10,color:GREY}});
    T(s,"“"+v[3]+"”",{x:x+0.1,y:y+1.15,w:1.5,h:0.22,base:{fontSize:10,italic:true}});
  });
  sect(s,7.2,3,"Vocabulary","Countries & nationalities");
  audio(pres,s,M,8.15,"1.4",ic.phones); T(s,"Listen and repeat.",{x:M+1.1,y:8.15,w:5,h:0.32,base:{fontSize:13,bold:true},valign:"middle"});
  [["Brazil","Brazil","Brazilian"],["USA","the USA","American"],["Canada","Canada","Canadian"],["England","England","English"],["Portugal","Portugal","Portuguese"],["Japan","Japan","Japanese"]].forEach((c,i)=>{
    const x=M+(i%3)*2.4, y=8.6+Math.floor(i/3)*1.2;
    box(pres,s,x,y,2.27,1.08,C.PANEL);
    s.addImage({data:fl[c[0]],x:x+0.12,y:y+0.27,w:0.9,h:0.6,altText:c[1]+" flag"});
    T(s,c[1],{x:x+1.1,y:y+0.22,w:1.15,h:0.25,base:{fontSize:11,color:GREY}});
    s.addText(c[2],{isTextBox:true,x:x+1.05,y:y+0.5,w:1.2,h:0.35,fontFace:HF,fontSize:13.5,bold:true,color:NAVY,margin:0,valign:"middle"});
  });
  s.addNotes("Gabarito da leitura: Tom · Yuki · Ana. Vocabulário: drill coral (repetir) e depois cobrir a coluna em português. 'Good evening' ao chegar; 'Good night' só ao se despedir. Nacionalidades levam letra maiúscula.");

  // ===== PAGE 5: JOBS + ALPHABET =====
  s = P();
  sect(s,0.45,3,"Vocabulary","Jobs");
  audio(pres,s,M,1.4,"1.5",ic.phones); T(s,"Listen and repeat.",{x:M+1.1,y:1.4,w:5,h:0.32,base:{fontSize:13,bold:true},valign:"middle"});
  [["teacher","professor(a)",ic.teacher,C.YELT],["student","estudante",ic.student,C.BLUET],["doctor","médico(a)",ic.doctor,C.MINTT],["engineer","engenheiro(a)",ic.eng,C.LILT],["manager","gerente",ic.mgr,C.YELT]].forEach((j,i)=>{
    const x=M+i*1.43;
    box(pres,s,x,1.9,1.35,1.5,j[3]);
    dot(pres,s,x+0.4,2.02,0.55,C.WHITE); s.addImage({data:j[2],x:x+0.53,y:2.15,w:0.29,h:0.29,altText:j[0]});
    s.addText(j[0],{isTextBox:true,x,y:2.7,w:1.35,h:0.3,align:"center",fontFace:BF,fontSize:13,bold:true,color:NAVY,margin:0});
    s.addText(j[1],{isTextBox:true,x,y:3.0,w:1.35,h:0.25,align:"center",fontFace:BF,fontSize:10,color:GREY,margin:0});
  });
  ex(s,M,3.7,"A","Look at the pictures. Write the jobs.");
  [[ic.doctor,C.MINTT],[ic.teacher,C.YELT],[ic.eng,C.LILT],[ic.student,C.BLUET]].forEach((p,i)=>{
    const x=M+(i%2)*3.6, y=4.2+Math.floor(i/2)*0.8;
    dot(pres,s,x,y,0.55,p[1]); s.addImage({data:p[0],x:x+0.13,y:y+0.13,w:0.29,h:0.29,altText:"Job picture "+(i+1)});
    T(s,"*"+(i+1)+"*",{x:x+0.65,y,w:0.3,h:0.55,base:{fontSize:14},valign:"middle",hl:NAVY}); line(pres,s,x+1.0,y+0.45,2.3);
  });
  box(pres,s,M,5.85,CW,0.45,C.YELT,"F2D869"); T(s,"*Tip:* nationalities start with a capital letter: *Brazilian*.",{x:M+0.2,y:5.85,w:6.6,h:0.45,base:{fontSize:12.5},valign:"middle",hl:NAVY});
  sect(s,6.65,3,"Vocabulary","The alphabet");
  audio(pres,s,M,7.6,"1.6",ic.phones); T(s,"Listen and repeat. Vowels (*A E I O U*) are in yellow.",{x:M+1.1,y:7.6,w:6,h:0.32,base:{fontSize:13,bold:true},valign:"middle",hl:NAVY});
  const al=[["A","êi"],["B","bi"],["C","si"],["D","di"],["E","i"],["F","éf"],["G","djí"],["H","êitch"],["I","ai"],["J","djêi"],["K","kêi"],["L","él"],["M","ém"],["N","én"],["O","ôu"],["P","pi"],["Q","kiú"],["R","ar"],["S","és"],["T","ti"],["U","iú"],["V","vi"],["W","dâbliu"],["X","éks"],["Y","uái"],["Z","zi"]];
  al.forEach((a,i)=>{
    const x=M+(i%9)*0.79, y=8.05+Math.floor(i/9)*0.86, vow="AEIOU".includes(a[0]);
    box(pres,s,x,y,0.73,0.78,vow?C.YELT:C.PANEL,vow?"F2D869":C.LINE,"Letter");
    s.addText(a[0],{isTextBox:true,x,y:y+0.04,w:0.73,h:0.46,align:"center",fontFace:HF,fontSize:24,bold:true,color:NAVY,margin:0,valign:"middle"});
    s.addText(a[1],{isTextBox:true,x,y:y+0.52,w:0.73,h:0.24,align:"center",fontFace:BF,fontSize:10,color:GREY,margin:0});
  });
  box(pres,s,M+8*0.79,8.05+1.72,0.73,0.78,NAVY,NAVY,"Your turn"); s.addText("Your name?",{isTextBox:true,x:M+8*0.79,y:9.77,w:0.73,h:0.78,align:"center",valign:"middle",fontFace:BF,fontSize:10,bold:true,color:YEL,margin:0});
  box(pres,s,M,10.65,CW,0.45,C.BLUET,C.LINE);
  T(s,"*How do you spell your name?*  →  *T-O-M* · *A-N-A* · *Y-U-K-I*",{x:M+0.2,y:10.65,w:6.6,h:0.45,base:{fontSize:13},valign:"middle",hl:"1D4ED8"});
  s.addNotes("Gabarito Jobs A: 1 doctor · 2 teacher · 3 engineer · 4 student. A pronúncia ao lado do alfabeto é aproximada; use o áudio 1.6. O aluno soletra nome, sobrenome e e-mail ('at' = @, 'dot' = .).");

  // ===== PAGE 6: GRAMMAR =====
  s = P();
  sect(s,0.45,4,"Grammar","Verb to be: I am, you are");
  T(s,"O verbo *to be* significa *ser* ou *estar*.",{x:M,y:1.45,w:CW,h:0.3,base:{fontSize:13,color:GREY},hl:NAVY});
  box(pres,s,M,2.05,CW,2.25,C.BLUET,"B7D9F5","Grammar box"); pill(pres,s,M+0.15,1.91,1.2,0.28,YEL,"GRAMMAR BOX",NAVY,10);
  [["Subject","Verb","Short form","Example"],["I","am","I'm","I'm Ana."],["you","are","you're","You're Tom."]].forEach((r,i)=>{
    const y=2.25+i*0.5, hdr=i===0, xs=[0.9,2.4,3.9,5.5];
    r.forEach((c,j)=> s.addText(c,{isTextBox:true,x:xs[j],y,w:1.5,h:0.42,fontFace:BF,fontSize:hdr?11:j===3?14:17,bold:!hdr&&j<3,italic:j===3&&!hdr,color:hdr?GREY:NAVY,margin:0,valign:"middle"}));
  });
  T(s,"Em inglês, a frase sempre precisa de *sujeito*:  “Sou professor” → *I'm a teacher.*",{x:M+0.3,y:3.8,w:6.4,h:0.4,base:{fontSize:12.5},hl:"B45309"});
  photo(s,"ana-intro",M,4.5,1.2,1.2,()=>s.addImage({data:av.ana,x:M,y:4.5,w:1.2,h:1.2,altText:"Ana"})); pill(pres,s,M+1.3,4.75,1.9,0.55,YEL,"I'm Ana.",NAVY,18);
  pill(pres,s,M+3.7,4.75,2.0,0.55,C.WHITE,"You're Tom.",NAVY,18);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:M+3.7,y:4.75,w:2.0,h:0.55,rectRadius:0.27,fill:{color:C.WHITE},line:{color:C.LINE,width:1.25}});
  s.addText("You're Tom.",{isTextBox:true,x:M+3.7,y:4.75,w:2.0,h:0.55,align:"center",valign:"middle",fontFace:BF,fontSize:18,bold:true,color:NAVY,margin:0});
  photo(s,"tom-intro",W-M-1.2,4.5,1.2,1.2,()=>s.addImage({data:av.tom,x:W-M-1.2,y:4.5,w:1.2,h:1.2,altText:"Tom"}));
  note(pres,s,M,6.1,CW,0.8,"WATCH OUT","",C.YELT);
  T(s,"*I'm* = I am     *You're* = you are      Na fala, usamos quase sempre a forma curta.",{x:M+0.2,y:6.32,w:6.6,h:0.45,base:{fontSize:13},hl:NAVY});
  sect(s,7.2,4,"Grammar","Negatives, questions & short answers",24);
  [["+","Affirmative",C.MINTT,"I'm from Brazil.\n\nYou're a student."],["–","Negative",C.YELT,"I'm *not* from Japan.\n\nYou *aren't* a doctor."],["?","Question",C.BLUET,"*Are* you a student?\n\n*Are* you from Canada?"]].forEach((g,i)=>{
    const x=M+i*2.4;
    box(pres,s,x,8.15,2.27,1.9,g[2]);
    dot(pres,s,x+0.12,8.27,0.42,NAVY,g[0],YEL,17);
    s.addText(g[1],{isTextBox:true,x:x+0.65,y:8.27,w:1.5,h:0.42,fontFace:HF,fontSize:17,bold:true,color:NAVY,margin:0,valign:"middle"});
    T(s,g[3],{x:x+0.15,y:8.85,w:2.05,h:1.1,base:{fontSize:13},hl:"B45309"});
  });
  box(pres,s,M,10.2,CW,0.8,C.PANEL); pill(pres,s,M+0.15,10.06,1.5,0.28,YEL,"SHORT ANSWERS",NAVY,10);
  T(s,"*Are you a student?*",{x:M+0.2,y:10.45,w:2.2,h:0.35,base:{fontSize:13},valign:"middle"});
  [["Yes, I *am*.",C.MINT],["No, I'*m not*.",C.RED]].forEach((a,i)=>{
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:3.1+i*2.2,y:10.45,w:2.0,h:0.36,rectRadius:0.18,fill:{color:C.WHITE},line:{color:a[1],width:2},objectName:"Answer"});
    T(s,a[0],{x:3.1+i*2.2,y:10.45,w:2.0,h:0.36,base:{fontSize:13},align:"center",valign:"middle",hl:NAVY});
  });
  s.addNotes("Contraste com o português: o sujeito é obrigatório (I, you). 'I amn't' não existe: use 'I'm not'. Com 'you': aren't ou 're not. Drill: 'Are you a teacher?' — o aluno responde só 'Yes, I am.' / 'No, I'm not.'");

  // ===== PAGE 7: DICA BRASIL + EX A =====
  s = P();
  sect(s,0.45,4,"Dica Brasil","Watch out for these mistakes");
  [["Am Ana.","I'm Ana.","O sujeito é obrigatório."],["Yes, I'm.","Yes, I am.","Na resposta curta, não use a forma contraída."],["Where you are from?","Where are you from?","Na pergunta, o verbo vem antes do sujeito."]].forEach((e,i)=>{
    const y=1.5+i*0.95;
    box(pres,s,M,y,CW,0.82,C.PANEL);
    dot(pres,s,M+0.15,y+0.17,0.48,"FBE0DD","✗",C.RED,15);
    s.addText(e[0],{isTextBox:true,x:M+0.8,y,w:1.9,h:0.82,fontFace:BF,fontSize:14,color:GREY,strike:"sngStrike",margin:0,valign:"middle"});
    dot(pres,s,M+2.75,y+0.17,0.48,C.MINTT,"✓","1B7F5C",15);
    s.addText(e[1],{isTextBox:true,x:M+3.4,y,w:1.9,h:0.82,fontFace:BF,fontSize:14,bold:true,color:NAVY,margin:0,valign:"middle"});
    T(s,e[2],{x:M+5.3,y,w:1.7,h:0.82,base:{fontSize:10.5,color:GREY},valign:"middle"});
  });
  box(pres,s,M,4.55,CW,0.8,C.MINTT,"BFE9D6"); pill(pres,s,M+0.15,4.41,1.3,0.28,C.MINT,"CULTURE CORNER",NAVY,10);
  T(s,"“How are you?” é uma saudação, não uma pergunta sobre saúde. A resposta comum é *Fine, thanks. And you?*",{x:M+0.2,y:4.72,w:6.6,h:0.55,base:{fontSize:12.5},valign:"middle",hl:"1B7F5C"});
  sect(s,5.8,5,"Exercises","Practice");
  ex(s,M,6.8,"A","Complete the sentences with the words in the box.");
  box(pres,s,M,7.3,CW,0.5,C.YELT,"F2D869","Word box");
  ["am","are","Are","'m not","aren't"].forEach((w,i)=>T(s,w,{x:M+0.4+i*1.35,y:7.3,w:1.2,h:0.5,base:{fontSize:15,bold:true},valign:"middle"}));
  ["Hello! I _____ Tom.","You _____ a teacher.","_____ you Brazilian?","Yes, I _____.","I _____ from Japan. (negative)","You _____ American. (negative)"].forEach((q,i)=>{
    const x=M+(i%2)*3.6, y=8.05+Math.floor(i/2)*0.7;
    num(s,x,y,i+1,0.38); T(s,q,{x:x+0.5,y,w:3.0,h:0.38,base:{fontSize:14},valign:"middle"});
  });
  s.addNotes("Gabarito A: 1 am · 2 are · 3 Are · 4 am · 5 'm not · 6 aren't.");

  // ===== PAGE 8: EX B, C, D =====
  s = P();
  sect(s,0.45,5,"Exercises","Practice");
  ex(s,M,1.5,"B","Put the words in order.");
  ["name / is / My / Ana","you / Are / Brazilian / ?","from / I'm / Canada","to / meet / Nice / you"].forEach((q,i)=>{
    const y=2.0+i*0.7; num(s,M,y,i+1); T(s,q,{x:M+0.5,y,w:3.0,h:0.36,base:{fontSize:13.5,bold:true},valign:"middle"}); line(pres,s,M+3.5,y+0.33,3.5);
  });
  ex(s,M,4.95,"C","Rewrite the sentences.");
  [["You are a student.","question"],["I'm a doctor.","negative"],["You're from Japan.","question"],["You are Tom.","negative"]].forEach((q,i)=>{
    const y=5.45+i*0.7; num(s,M,y,i+1); T(s,q[0],{x:M+0.5,y,w:2.5,h:0.36,base:{fontSize:13.5,bold:true},valign:"middle"});
    pill(pres,s,M+3.0,y+0.03,0.9,0.3,q[1]==="question"?C.BLUE:C.YEL,q[1],NAVY,10); line(pres,s,M+4.0,y+0.33,3.0);
  });
  ex(s,M+1.1,8.4,"D","Listen and write the names you hear."); audio(pres,s,M,8.4,"1.7",ic.phones);
  [["carlos","1"],["emma","2"],["yuki","3"]].forEach((p,i)=>{
    const x=M+i*2.4;
    box(pres,s,x,8.95,2.27,1.5,C.PANEL);
    photo(s,"speaker-"+p[1],x+0.1,9.05,0.7,0.7,()=>s.addImage({data:av[p[0]],x:x+0.1,y:9.05,w:0.7,h:0.7,altText:"Speaker "+p[1]}));
    dot(pres,s,x+1.85,9.07,0.32,NAVY,p[1],YEL,11);
    T(s,"Name:",{x:x+0.12,y:9.82,w:0.7,h:0.25,base:{fontSize:11,color:GREY}}); line(pres,s,x+0.8,10.04,1.35);
    T(s,"Country:",{x:x+0.12,y:10.14,w:0.7,h:0.25,base:{fontSize:11,color:GREY}}); line(pres,s,x+0.8,10.36,1.35);
  });
  box(pres,s,M,10.6,CW,0.5,C.YELT,"F2D869"); T(s,"Listen again. Circle: 1 *Good morning / Good evening*   2 *Hello / Hi*   3 *Goodbye / See you later*",{x:M+0.15,y:10.6,w:6.8,h:0.5,base:{fontSize:11.5},valign:"middle",hl:NAVY});
  s.addNotes("Gabarito B: My name is Ana. / Are you Brazilian? / I'm from Canada. / Nice to meet you. C: Are you a student? / I'm not a doctor. / Are you from Japan? / You aren't (You're not) Tom. D: 1 Carlos, Brazil · 2 Emma, England · 3 Yuki, Japan. Circle: Good evening · Hi · See you later.");

  // ===== PAGE 9: EX E + SPEAKING =====
  s = P();
  sect(s,0.45,5,"Exercises","Practice");
  ex(s,M,1.5,"E","Circle the correct answer: a, b or c.");
  [["_____ you from Japan?",["Am","Are","Is"]],["I _____ a teacher.",["are","am","is"]],["Yes, I _____.",["am","I'm","are"]],["Where _____ you from?",["you are","am","are"]],["You _____ Canadian. (negative)",["isn't","aren't","amn't"]]].forEach((q,i)=>{
    const y=2.0+i*0.62; num(s,M,y,i+1,0.38); T(s,q[0],{x:M+0.5,y,w:3.0,h:0.38,base:{fontSize:13.5},valign:"middle"});
    q[1].forEach((o,j)=>{ const ox=M+3.5+j*1.2; s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:ox,y:y+0.02,w:1.1,h:0.34,rectRadius:0.17,fill:{color:C.WHITE},line:{color:"9AA7BD",width:1.25},objectName:"Option"}); T(s,"abc"[j]+"  "+o,{x:ox,y:y+0.02,w:1.1,h:0.34,base:{fontSize:12},align:"center",valign:"middle"}); });
  });
  sect(s,5.4,6,"Speaking","Role-play: meet a new classmate",24);
  T(s,"Work in pairs. Student A is *Carlos*. Student B is *Emma*.",{x:M,y:6.35,w:CW,h:0.3,base:{fontSize:13,bold:true},hl:"B45309"});
  [["carlos","Student A","Carlos","Brazil · Brazilian · student",C.MINTT],["emma","Student B","Emma","England · English · teacher",C.LILT]].forEach((p,i)=>{
    const y=6.85+i*1.7;
    box(pres,s,M,y,3.2,1.55,p[4]);
    photo(s,"role-"+p[0],M+0.12,y+0.2,1.0,1.0,()=>s.addImage({data:av[p[0]],x:M+0.12,y:y+0.2,w:1.0,h:1.0,altText:p[2]}));
    pill(pres,s,M+1.3,y+0.2,1.1,0.28,NAVY,p[1].toUpperCase(),YEL,10);
    s.addText(p[2],{isTextBox:true,x:M+1.3,y:y+0.52,w:1.8,h:0.4,fontFace:HF,fontSize:20,bold:true,color:NAVY,margin:0});
    T(s,p[3],{x:M+1.3,y:y+0.95,w:1.8,h:0.5,base:{fontSize:10.5,color:GREY}});
  });
  box(pres,s,3.95,6.85,3.72,3.25,C.PANEL);
  [["1","Greet","Hello! / Good morning!"],["2","Ask the name","What's your name?"],["3","Spell it","How do you spell it?"],["4","Ask about origin","Are you …? Where are you from?"],["5","Say goodbye","Nice to meet you. See you later!"]].forEach((r,i)=>{
    const y=7.0+i*0.6;
    dot(pres,s,4.1,y,0.38,YEL,r[0],NAVY,13); T(s,"*"+r[1]+":*  "+r[2],{x:4.6,y,w:3.0,h:0.5,base:{fontSize:11.5},valign:"middle",hl:NAVY});
  });
  T(s,"Now change roles. Then use your own information!",{x:M,y:10.4,w:CW,h:0.3,base:{fontSize:12,italic:true,color:GREY}});
  s.addNotes("Gabarito E: 1 b · 2 b · 3 a · 4 c · 5 b. Role-play: duas rodadas (frases à vista; depois sem olhar). Se o aluno estiver sozinho, o professor faz o outro papel.");

  // ===== PAGE 10: WRITING + WRAP-UP =====
  s = P();
  sect(s,0.45,6,"Writing","My introduction card");
  T(s,"Complete the card about you (30–40 words).",{x:M,y:1.4,w:CW,h:0.3,base:{fontSize:13,bold:true}});
  box(pres,s,M,1.85,CW,3.5,C.WHITE,NAVY,"Card");
  box(pres,s,M+0.3,2.15,1.7,2.0,C.PANEL); s.addImage({data:ic.user,x:M+0.85,y:2.8,w:0.6,h:0.6,altText:"Photo"}); T(s,"your photo",{x:M+0.3,y:3.6,w:1.7,h:0.3,base:{fontSize:11,color:GREY},align:"center"});
  ["Hello! My name is","I'm from              . I'm              .","I'm a              .","Nice to meet you!"].forEach((l,i)=>{
    const y=2.15+i*0.7; T(s,l,{x:M+2.3,y,w:4.4,h:0.45,base:{fontSize:15,bold:i===3},valign:"middle"}); line(pres,s,i===0?M+4.5:M+2.3,y+0.5,i===0?2.2:4.4);
  });
  T(s,"Self-check:  ☐ I used *I'm*   ☐ I wrote my country with a capital letter   ☐ I used a full stop (.)",{x:M+0.3,y:4.8,w:6.5,h:0.35,base:{fontSize:11,color:GREY},hl:NAVY});
  sect(s,5.7,"✓","Wrap-up","Can you do it?");
  box(pres,s,M,6.7,4.3,3.6,C.PANEL);
  ["Greet people","Say and ask names","Say where I'm from\nand what I do","Spell my name"].forEach((c,i)=>{
    const y=6.85+i*0.85; T(s,c,{x:M+0.2,y,w:2.0,h:0.6,base:{fontSize:13},valign:"middle"});
    [["✓",C.MINT],["~",YEL],["✗","F4A29B"]].forEach((m,j)=>pill(pres,s,M+2.3+j*0.65,y+0.12,0.55,0.36,m[1],m[0],NAVY,13));
  });
  box(pres,s,5.1,6.7,2.57,2.0,C.BLUET,"B7D9F5"); pill(pres,s,5.25,6.56,1.5,0.28,YEL,"WORDS I LEARNED",NAVY,10);
  T(s,"Write your 3 favourite words:",{x:5.25,y:6.95,w:2.3,h:0.3,base:{fontSize:11.5}});
  [0,1,2].forEach(i=>{ T(s,String(i+1),{x:5.25,y:7.4+i*0.4,w:0.3,h:0.3,base:{fontSize:12,bold:true}}); line(pres,s,5.55,7.65+i*0.4,1.95); });
  box(pres,s,5.1,8.9,2.57,1.4,YEL,YEL,"Next unit"); T(s,"NEXT: UNIT 2",{x:5.3,y:9.05,w:2.2,h:0.3,base:{fontSize:11,bold:true}});
  s.addText("Where are you from?",{isTextBox:true,x:5.3,y:9.4,w:2.2,h:0.8,fontFace:HF,fontSize:20,bold:true,color:NAVY,margin:0,valign:"top"});
  s.addNotes("Peça ao aluno que marque ✓ / ~ / ✗ e revise a seção dos itens com ~ ou ✗. Tarefa: gravar um áudio de 30 segundos se apresentando.");

  // ===== PAGE 11: ANSWER KEY + AUDIO SCRIPT =====
  s = P();
  sect(s,0.45,"★","Appendix","Answer key");
  [["Warm-up A","1 b · 2 d · 3 a · 4 c"],["Dialogue A","1 F · 2 T · 3 T · 4 F"],["Dialogue B","A teacher · São Paulo (Brazil) · No (he's Canadian)"],["Reading","Tom · Yuki · Ana"],["Jobs A","1 doctor · 2 teacher · 3 engineer · 4 student"],["A · Gaps","1 am · 2 are · 3 Are · 4 am · 5 'm not · 6 aren't"],["B · Order","My name is Ana. / Are you Brazilian? / I'm from Canada. / Nice to meet you."],["C · Rewrite","Are you a student? / I'm not a doctor. / Are you from Japan? / You aren't (You're not) Tom."],["D · Listening","1 Carlos, Brazil · 2 Emma, England · 3 Yuki, Japan"],["E · Circle","1 b · 2 b · 3 a · 4 c · 5 b"]].forEach((k,i)=>{
    const y=1.45+i*0.5;
    box(pres,s,M,y,CW,0.44,i%2?C.WHITE:C.PANEL,C.LINE);
    T(s,k[0],{x:M+0.15,y,w:1.4,h:0.44,base:{fontSize:11.5,bold:true},valign:"middle"}); T(s,k[1],{x:M+1.6,y,w:5.4,h:0.44,base:{fontSize:11},valign:"middle"});
  });
  sect(s,6.7,"★","Appendix","Audio script");
  box(pres,s,M,7.7,CW,2.2,C.PANEL); pill(pres,s,M+0.15,7.56,1.2,0.28,YEL,"1.7 LISTENING",NAVY,10);
  T(s,"*1* Good evening! I'm Carlos. I'm from Brazil. C-A-R-L-O-S.\n*2* Hi! I'm Emma, E-M-M-A. I'm from England.\n*3* Hello! My name's Yuki, Y-U-K-I. I'm from Japan. See you later!",{x:M+0.2,y:8.0,w:6.6,h:1.8,base:{fontSize:12.5},hl:NAVY});
  T(s,"Áudios 1.1 a 1.6: o diálogo, os perfis, o vocabulário e o alfabeto desta unidade. Grave a sua voz lendo cada bloco duas vezes: devagar e em velocidade natural.",{x:M,y:10.1,w:CW,h:0.7,base:{fontSize:11.5,color:GREY}});
  s.addNotes("Script para o professor gravar ou ler em voz alta.");

  await pres.writeFile({ fileName: "Book1_Unit01_A4.pptx" });
  console.log("done");
})();
