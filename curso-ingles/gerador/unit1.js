const L = require("./lib.js");
const { newPres, icon, svg2png, avatar, PEOPLE, flag, T, head, box, dot, pill, exHead, audio, line, note, C, HF, BF } = L;

(async () => {
  const pres = newPres();
  const av = {}; for (const k of Object.keys(PEOPLE)) av[k] = await svg2png(avatar(PEOPLE[k]), 400);
  const fl = {}; for (const k of ["Brazil","USA","Canada","England","Portugal","Japan"]) fl[k] = await svg2png(flag(k), 500);
  const ic = {}; for (const [k,n,col] of [["sun","FaSun"],["cloud","FaCloudSun"],["moon","FaMoon"],["bed","FaBed"],["chat","FaCommentDots"],["user","FaUserAlt"],["globe","FaGlobeAmericas"],["font","FaFont"],
    ["hand","FaHandPaper"],["walk","FaWalking"],["clock","FaClock"],["shake","FaHandshake"],["smile","FaSmile"],["teacher","FaChalkboardTeacher"],["student","FaUserGraduate"],["doctor","FaUserMd"],["eng","FaHardHat"],["mgr","FaBriefcase"],["phones","FaHeadphones","#FFCD04"],["mic","FaMicrophone"],["pen","FaPen"]]) ic[k] = await icon(n, col||"#001737");
  const YEL=C.YEL, NAVY=C.NAVY, GREY=C.GREY;
  let s;

  // 1 COVER ------------------------------------------------------------
  s = pres.addSlide({ masterName: "COVER" });
  s.addText("THE ENGLISH SKYROCKET  ·  BOOK 1  ·  LEVEL A1",{isTextBox:true,x:0.6,y:0.4,w:6,h:0.3,fontFace:BF,fontSize:11,bold:true,color:GREY,charSpacing:3,margin:0});
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.6,y:1.35,w:1.3,h:1.3,rectRadius:0.15,fill:{color:YEL},line:{color:YEL,width:0},objectName:"Unit number tile"});
  s.addText("1",{isTextBox:true,x:0.6,y:1.35,w:1.3,h:1.3,align:"center",valign:"middle",fontFace:HF,fontSize:80,bold:true,color:NAVY,margin:0});
  s.addText("UNIT",{isTextBox:true,x:2.1,y:1.3,w:3,h:0.3,fontFace:BF,fontSize:13,bold:true,color:GREY,charSpacing:4,margin:0});
  s.addText("Hello! Nice to meet you",{isTextBox:true,x:2.1,y:1.6,w:4.3,h:1.2,fontFace:HF,fontSize:36,bold:true,color:NAVY,margin:0,valign:"top"});
  T(s,"Cumprimentar e se apresentar",{x:0.6,y:3.1,w:5.6,h:0.35,base:{fontSize:18,bold:true}});
  [["Vocabulary","greetings · countries · jobs · alphabet"],["Grammar","verb to be (I / you)"],["Skills","dialogue · reading · listening · speaking · writing"]].forEach((r,i)=>{
    pill(pres,s,0.6,3.65+i*0.42,1.25,0.3,C.BLUET,r[0].toUpperCase(),NAVY,10);
    T(s,r[1],{x:2.0,y:3.65+i*0.42,w:4.4,h:0.3,base:{fontSize:14,color:GREY},valign:"middle"});
  });
  s.addText("BY RAUL PIVOTO",{isTextBox:true,x:0.6,y:5.0,w:3,h:0.25,fontFace:BF,fontSize:10,bold:true,color:GREY,charSpacing:2,margin:0});
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:6.6,y:0.4,w:2.9,h:4.85,rectRadius:0.2,fill:{color:C.PANEL},line:{color:C.LINE,width:1},objectName:"Illustration panel"});
  s.addImage({data:av.tom,x:6.9,y:0.7,w:1.3,h:1.3,altText:"Tom"});
  pill(pres,s,8.1,0.85,1.2,0.5,C.WHITE,"Hello!",NAVY,16);
  s.addImage({data:av.ana,x:8.0,y:2.55,w:1.3,h:1.3,altText:"Ana"});
  pill(pres,s,6.8,2.8,1.15,0.5,YEL,"Hi, Tom!",NAVY,16);
  s.addImage({data:av.yuki,x:6.9,y:4.0,w:1.0,h:1.0,altText:"Yuki"});
  pill(pres,s,8.0,4.2,1.3,0.5,C.WHITE,"I'm Yuki.",NAVY,16);
  s.addNotes("Book 1 · Unit 1. Receba o aluno com um sorriso: 'Hello! Welcome!'. Mostre os personagens (Tom, Ana e Yuki), que aparecem ao longo da unidade. Tempo total: cerca de 135 minutos (pode ser dividido em 2 aulas).");

  // 2 CAN-DO ------------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,"i","Objectives","In this unit, I can…");
  [[ic.chat,"Greet people","dizer *Hello*, *Good morning* e *Goodbye* na hora certa",C.YELT],[ic.user,"Introduce myself","dizer meu nome e perguntar o nome de alguém",C.BLUET],[ic.globe,"Say where I'm from","dizer meu país, minha nacionalidade e minha profissão",C.MINTT],[ic.font,"Spell words","falar o alfabeto e soletrar meu nome",C.LILT]].forEach((c,i)=>{
    const x=0.5+(i%2)*4.6, y=1.4+Math.floor(i/2)*1.6;
    box(pres,s,x,y,4.4,1.4,c[3]);
    dot(pres,s,x+0.25,y+0.35,0.7,C.WHITE); s.addImage({data:c[0],x:x+0.42,y:y+0.52,w:0.36,h:0.36,altText:c[1]});
    s.addText(c[1],{isTextBox:true,x:x+1.15,y:y+0.2,w:3.1,h:0.4,fontFace:HF,fontSize:21,bold:true,color:NAVY,margin:0});
    T(s,c[2],{x:x+1.15,y:y+0.65,w:3.1,h:0.65,base:{fontSize:14,color:GREY}});
  });
  box(pres,s,0.5,4.65,9,0.5,C.WHITE);
  T(s,"*1* Warm-up   *2* Dialogue   *3* Vocabulary   *4* Grammar   *5* Exercises   *6* Speaking & Writing   ·   cerca de 135 min",{x:0.7,y:4.65,w:8.6,h:0.5,base:{fontSize:13,color:GREY},valign:"middle",hl:NAVY});
  s.addNotes("Leia os objetivos com o aluno em português. No fim da unidade ele volta a esta página e marca o que já consegue fazer. Todas as unidades seguem a mesma ordem de seções.");

  // 3 WARM-UP -----------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,1,"Warm-up","Say hello!");
  exHead(pres,s,0.5,1.35,"A","Match the greetings (1–4) with the pictures (a–d).");
  const pics=[["a",ic.moon,"8:00 p.m.",C.LILT],["b",ic.sun,"7:00 a.m.",C.YELT],["c",ic.bed,"11:00 p.m.",C.MINTT],["d",ic.cloud,"3:00 p.m.",C.BLUET]];
  pics.forEach((p,i)=>{
    const x=0.5+(i%2)*2.35, y=1.9+Math.floor(i/2)*1.6;
    box(pres,s,x,y,2.2,1.45,p[3]);
    pill(pres,s,x+0.1,y+0.1,0.34,0.3,NAVY,p[0],YEL,13);
    s.addImage({data:p[1],x:x+0.8,y:y+0.22,w:0.6,h:0.6,altText:"Time of day "+p[0]});
    s.addText(p[2],{isTextBox:true,x,y:y+0.95,w:2.2,h:0.35,align:"center",fontFace:BF,fontSize:15,bold:true,color:NAVY,margin:0});
  });
  ["Good morning","Good afternoon","Good evening","Good night"].forEach((g,i)=>{
    const y=1.95+i*0.5;
    dot(pres,s,5.45,y,0.36,NAVY,i+1,YEL,13);
    T(s,g,{x:5.95,y,w:2.2,h:0.36,base:{fontSize:17,bold:true},valign:"middle"});
    s.addText("→ ___",{isTextBox:true,x:8.1,y,w:1.0,h:0.36,fontFace:BF,fontSize:16,color:GREY,margin:0,valign:"middle"});
  });
  box(pres,s,5.4,4.1,4.1,1.05,C.YELT,"F2D869");
  pill(pres,s,5.55,3.96,0.9,0.28,YEL,"SPEAK",NAVY,10);
  T(s,"Say *Hello!* to your teacher. Then answer: *What's your name?*",{x:5.6,y:4.3,w:3.7,h:0.8,base:{fontSize:14}});
  s.addNotes("Gabarito: 1 → b · 2 → d · 3 → a · 4 → c. Peça que o aluno leia cada cumprimento em voz alta. 'Good night' é usado só ao se despedir, antes de dormir.");

  // 4 DIALOGUE ------------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,2,"Dialogue","Meeting for the first time");
  audio(pres,s,0.5,1.32,"1.1",ic.phones);
  T(s,"Listen and read.",{x:1.6,y:1.32,w:4,h:0.32,base:{fontSize:15,bold:true},valign:"middle"});
  [["tom","Tom","Hello! I'm Tom. What's your name?"],["ana","Ana","Hi, Tom! My name's Ana. Nice to meet you."],["tom","Tom","Nice to meet you, too. Are you Brazilian?"],["ana","Ana","Yes, I am. I'm from São Paulo. And you?"],["tom","Tom","I'm from Canada. I'm a teacher."],["ana","Ana","Great! I'm a student. See you later!"]].forEach((d,i)=>{
    const right=d[0]==="ana", y=1.8+i*0.57;
    s.addImage({data:av[d[0]],x:right?8.95:0.5,y,w:0.5,h:0.5,altText:d[1]});
    box(pres,s,right?2.5:1.1,y,6.35,0.5,right?C.YELT:C.PANEL,right?"F2D869":C.LINE,"Bubble");
    T(s,"*"+d[1]+":*  "+d[2],{x:(right?2.5:1.1)+0.18,y,w:6.0,h:0.5,base:{fontSize:15},valign:"middle",hl:GREY});
  });
  s.addNotes("Toque o áudio 1.1 (ou leia em voz alta) duas vezes. 1ª vez: só ouvir. 2ª vez: repetir cada fala. Depois o aluno lê como Ana e você como Tom, e trocam os papéis. Script completo no fim da apostila.");

  // 5 COMPREHENSION -------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,2,"Dialogue","Check your understanding");
  exHead(pres,s,0.5,1.35,"A","Read the dialogue again. True (T) or false (F)?");
  ["Tom is Brazilian.","Ana is from São Paulo.","Tom is a teacher.","Ana is a teacher."].forEach((q,i)=>{
    const y=1.9+i*0.62;
    dot(pres,s,0.5,y,0.38,C.BLUET,i+1,NAVY,13);
    T(s,q,{x:1.05,y,w:3.2,h:0.38,base:{fontSize:16},valign:"middle"});
    ["T","F"].forEach((l,j)=>{ s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:4.3+j*0.5,y:y+0.02,w:0.4,h:0.34,rectRadius:0.06,fill:{color:C.WHITE},line:{color:"9AA7BD",width:1.25},objectName:"Check box"}); s.addText(l,{isTextBox:true,x:4.3+j*0.5,y:y+0.02,w:0.4,h:0.34,align:"center",valign:"middle",fontFace:BF,fontSize:13,bold:true,color:GREY,margin:0}); });
  });
  exHead(pres,s,5.4,1.35,"B","Answer the questions.");
  ["What's Tom's job?","Where is Ana from?","Is Tom from Brazil?"].forEach((q,i)=>{
    const y=1.9+i*0.85;
    dot(pres,s,5.4,y,0.38,C.BLUET,i+1,NAVY,13);
    T(s,q,{x:5.95,y,w:3.5,h:0.38,base:{fontSize:16},valign:"middle"});
    line(pres,s,5.95,y+0.7,3.5);
  });
  box(pres,s,0.5,4.55,4.6,0.6,C.YELT,"F2D869");
  T(s,"Correct the false sentences: *Tom is Canadian.*",{x:0.7,y:4.55,w:4.3,h:0.6,base:{fontSize:14},valign:"middle",hl:NAVY});
  s.addNotes("Gabarito: A) 1 F · 2 T · 3 T · 4 F. B) 1 He's a teacher. · 2 She's from São Paulo (Brazil). · 3 No, he isn't. He's from Canada. (O 'he/she' ainda não foi ensinado: aceite 'Teacher.' e 'São Paulo.' como resposta curta.)");

  // 6 READING -------------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,2,"Reading","Meet the students");
  audio(pres,s,0.5,1.32,"1.2",ic.phones);
  T(s,"Listen and read the profiles.",{x:1.6,y:1.32,w:5,h:0.32,base:{fontSize:15,bold:true},valign:"middle"});
  [["ana","Brazil","Ana","Hi! I'm Ana. I'm from Brazil. I'm Brazilian. I'm a student.",C.YELT],["tom","Canada","Tom","Hello! I'm Tom. I'm from Canada. I'm Canadian. I'm a teacher.",C.BLUET],["yuki","Japan","Yuki","Hi! My name's Yuki. I'm from Japan. I'm Japanese. I'm a doctor.",C.MINTT]].forEach((p,i)=>{
    const x=0.5+i*3.05;
    box(pres,s,x,1.8,2.9,2.1,p[4]);
    s.addImage({data:av[p[0]],x:x+0.15,y:1.95,w:0.85,h:0.85,altText:p[2]});
    s.addImage({data:fl[p[1]],x:x+1.2,y:2.05,w:0.75,h:0.5,altText:p[1]+" flag"});
    s.addText(p[2],{isTextBox:true,x:x+1.2,y:2.5,w:1.6,h:0.35,fontFace:HF,fontSize:20,bold:true,color:NAVY,margin:0,valign:"middle"});
    T(s,p[3],{x:x+0.15,y:2.95,w:2.6,h:0.9,base:{fontSize:14}});
  });
  exHead(pres,s,0.5,4.1,"A","Read and write the names.");
  [["Who is from Canada?","Tom"],["Who is a doctor?",""],["Who is Brazilian?",""]].forEach((q,i)=>{
    const x=0.5+i*3.05;
    T(s,q[0],{x,y:4.55,w:2.9,h:0.3,base:{fontSize:14}});
    line(pres,s,x,5.08,2.6);
  });
  s.addNotes("Gabarito: Tom · Yuki · Ana. Depois peça ao aluno que 'seja' um dos personagens e leia o texto na 1ª pessoa (I'm…).");

  // 7 VOCAB greetings -----------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,3,"Vocabulary","Greetings & goodbyes");
  audio(pres,s,0.5,1.32,"1.3",ic.phones);
  T(s,"Listen and repeat.",{x:1.6,y:1.32,w:5,h:0.32,base:{fontSize:15,bold:true},valign:"middle"});
  [[ic.hand,"Hello / Hi","Olá / Oi","Hi, Tom!",C.YELT],[ic.sun,"Good morning","Bom dia","Good morning, Ana.",C.BLUET],[ic.cloud,"Good afternoon","Boa tarde","Good afternoon!",C.MINTT],[ic.moon,"Good evening","Boa noite (chegada)","Good evening, all.",C.LILT],
   [ic.walk,"Goodbye / Bye","Tchau","Bye, see you!",C.YELT],[ic.clock,"See you later","Até mais","See you later!",C.BLUET],[ic.shake,"Nice to meet you","Prazer em conhecer","Nice to meet you.",C.MINTT],[ic.smile,"Thank you","Obrigado(a)","Thank you, Tom.",C.LILT]].forEach((v,i)=>{
    const x=0.5+(i%4)*2.3, y=1.8+Math.floor(i/4)*1.65;
    box(pres,s,x,y,2.15,1.5,v[4]);
    dot(pres,s,x+0.12,y+0.12,0.5,C.WHITE); s.addImage({data:v[0],x:x+0.25,y:y+0.25,w:0.24,h:0.24,altText:v[1]});
    s.addText(v[1],{isTextBox:true,x:x+0.12,y:y+0.7,w:1.95,h:0.3,fontFace:BF,fontSize:15,bold:true,color:NAVY,margin:0});
    T(s,v[2],{x:x+0.12,y:y+0.98,w:1.95,h:0.22,base:{fontSize:12,color:GREY}});
    T(s,"“"+v[3]+"”",{x:x+0.12,y:y+1.2,w:1.95,h:0.22,base:{fontSize:12,italic:true}});
  });
  s.addNotes("Drill: leia cada expressão e o aluno repete. Depois cubra a coluna em português e peça a tradução. 'Good evening' é para cumprimentar ao chegar à noite; 'Good night' só ao se despedir.");

  // 8 VOCAB countries -----------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,3,"Vocabulary","Countries & nationalities");
  audio(pres,s,0.5,1.32,"1.4",ic.phones);
  T(s,"Listen and repeat.",{x:1.6,y:1.32,w:5,h:0.32,base:{fontSize:15,bold:true},valign:"middle"});
  [["Brazil","Brazil","Brazilian"],["USA","the USA","American"],["Canada","Canada","Canadian"],["England","England","English"],["Portugal","Portugal","Portuguese"],["Japan","Japan","Japanese"]].forEach((c,i)=>{
    const x=0.5+(i%3)*3.05, y=1.8+Math.floor(i/3)*1.5;
    box(pres,s,x,y,2.9,1.35,C.PANEL);
    s.addImage({data:fl[c[0]],x:x+0.15,y:y+0.3,w:1.05,h:0.7,altText:c[1]+" flag"});
    T(s,c[1],{x:x+1.3,y:y+0.28,w:1.55,h:0.3,base:{fontSize:15,color:GREY}});
    s.addText(c[2],{isTextBox:true,x:x+1.3,y:y+0.62,w:1.58,h:0.4,fontFace:HF,fontSize:19,bold:true,color:NAVY,margin:0});
  });
  box(pres,s,0.5,4.72,9,0.45,C.YELT,"F2D869");
  T(s,"*Tip:* nationalities start with a capital letter: *Brazilian*, not ~~brazilian~~.".replace("~~brazilian~~","brazilian"),{x:0.7,y:4.72,w:8.6,h:0.45,base:{fontSize:14},valign:"middle",hl:NAVY});
  s.addNotes("Atenção: em inglês, países e nacionalidades levam letra maiúscula (Brazil, Brazilian). Peça que o aluno diga o próprio país e nacionalidade: 'I'm from Brazil. I'm Brazilian.'");


  // 9 VOCAB jobs ---------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,3,"Vocabulary","Jobs");
  audio(pres,s,0.5,1.32,"1.5",ic.phones);
  T(s,"Listen and repeat.",{x:1.6,y:1.32,w:5,h:0.32,base:{fontSize:15,bold:true},valign:"middle"});
  const jobs=[["teacher","professor(a)",ic.teacher,C.YELT],["student","estudante",ic.student,C.BLUET],["doctor","médico(a)",ic.doctor,C.MINTT],["engineer","engenheiro(a)",ic.eng,C.LILT],["manager","gerente",ic.mgr,C.YELT]];
  jobs.forEach((j,i)=>{
    const x=0.5+i*1.82;
    box(pres,s,x,1.8,1.7,1.5,j[3]);
    dot(pres,s,x+0.55,1.92,0.6,C.WHITE); s.addImage({data:j[2],x:x+0.69,y:2.06,w:0.32,h:0.32,altText:j[0]});
    s.addText(j[0],{isTextBox:true,x,y:2.6,w:1.7,h:0.3,align:"center",fontFace:BF,fontSize:16,bold:true,color:NAVY,margin:0});
    s.addText(j[1],{isTextBox:true,x,y:2.9,w:1.7,h:0.25,align:"center",fontFace:BF,fontSize:12,color:GREY,margin:0});
  });
  exHead(pres,s,0.5,3.55,"A","Look at the pictures. Write the jobs.");
  [[ic.doctor,C.MINTT],[ic.teacher,C.YELT],[ic.eng,C.LILT],[ic.student,C.BLUET]].forEach((p,i)=>{
    const x=0.5+i*2.3;
    dot(pres,s,x,4.05,0.55,p[1]); s.addImage({data:p[0],x:x+0.13,y:4.18,w:0.29,h:0.29,altText:"Job picture "+(i+1)});
    T(s,"*"+(i+1)+"*",{x:x+0.65,y:4.05,w:0.3,h:0.55,base:{fontSize:16},valign:"middle",hl:NAVY});
    line(pres,s,x+0.55,4.75,1.55);
  });
  s.addNotes("Gabarito: 1 doctor · 2 teacher · 3 engineer · 4 student. Depois o aluno diz a própria profissão: 'I'm a ...'. Se não souber, ensine a palavra e anote no Live Language Doc.");

  // 10 ALPHABET -----------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,3,"Vocabulary","The alphabet");
  audio(pres,s,0.5,1.32,"1.6",ic.phones);
  T(s,"Listen and repeat. Vowels (*A E I O U*) are in yellow.",{x:1.6,y:1.32,w:7,h:0.32,base:{fontSize:15,bold:true},valign:"middle",hl:NAVY});
  const al=[["A","êi"],["B","bi"],["C","si"],["D","di"],["E","i"],["F","éf"],["G","djí"],["H","êitch"],["I","ai"],["J","djêi"],["K","kêi"],["L","él"],["M","ém"],["N","én"],["O","ôu"],["P","pi"],["Q","kiú"],["R","ar"],["S","és"],["T","ti"],["U","iú"],["V","vi"],["W","dâbliu"],["X","éks"],["Y","uái"],["Z","zi"]];
  al.forEach((a,i)=>{
    const x=0.5+(i%9)*1.0, y=1.8+Math.floor(i/9)*0.92, vow="AEIOU".includes(a[0]);
    box(pres,s,x,y,0.92,0.82,vow?C.YELT:C.PANEL,vow?"F2D869":C.LINE,"Letter");
    s.addText(a[0],{isTextBox:true,x,y:y+0.04,w:0.92,h:0.46,align:"center",fontFace:HF,fontSize:26,bold:true,color:NAVY,margin:0,valign:"middle"});
    s.addText(a[1],{isTextBox:true,x,y:y+0.52,w:0.92,h:0.24,align:"center",fontFace:BF,fontSize:11,color:GREY,margin:0});
  });
  box(pres,s,8.5,3.64,1.0,0.82,C.NAVY,C.NAVY,"Your turn"); s.addText("Your name?",{isTextBox:true,x:8.5,y:3.64,w:1.0,h:0.82,align:"center",valign:"middle",fontFace:BF,fontSize:12,bold:true,color:YEL,margin:0});
  box(pres,s,0.5,4.62,9,0.55,C.BLUET,C.LINE);
  T(s,"*How do you spell your name?*   →   *T-O-M*   ·   *A-N-A*   ·   *Y-U-K-I*",{x:0.7,y:4.62,w:8.6,h:0.55,base:{fontSize:16},valign:"middle",hl:"1D4ED8"});
  s.addNotes("A pronúncia ao lado é uma aproximação em português; use o áudio 1.6. Em inglês, 'A' soa 'êi' e 'E' soa 'i'. Atividade: o aluno soletra o nome, o sobrenome e o e-mail ('at' = @, 'dot' = .).");

  // 11 GRAMMAR 1 ----------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,4,"Grammar","Verb to be: I am, you are");
  T(s,"O verbo *to be* significa *ser* ou *estar*.",{x:0.5,y:1.35,w:6,h:0.3,base:{fontSize:15,color:GREY},hl:NAVY});
  box(pres,s,0.5,1.8,5.6,2.3,C.BLUET,"B7D9F5","Grammar box");
  pill(pres,s,0.65,1.66,1.2,0.28,YEL,"GRAMMAR BOX",NAVY,10);
  [["Subject","Verb","Short form","Example"]].concat([["I","am","I'm","I'm Ana."],["you","are","you're","You're Tom."]]).forEach((r,i)=>{
    const y=2.0+i*0.45, hdr=i===0, xs=[0.75,2.0,3.2,4.5];
    r.forEach((c,j)=> s.addText(c,{isTextBox:true,x:xs[j],y,w:[1.2,1.2,1.3,1.5][j],h:0.45,fontFace:BF,fontSize:hdr?12:j===3?14:17,bold:!hdr&&j<3,italic:j===3&&!hdr,color:hdr?GREY:NAVY,margin:0,valign:"middle"}));
  });
  T(s,"Em inglês, a frase sempre precisa de *sujeito*:  “Sou professor” → *I'm a teacher.*",{x:0.75,y:3.45,w:5.1,h:0.55,base:{fontSize:13},hl:"B45309"});
  s.addImage({data:av.ana,x:6.5,y:1.7,w:1.1,h:1.1,altText:"Ana"}); pill(pres,s,7.6,1.85,1.9,0.5,YEL,"I'm Ana.",NAVY,17);
  s.addImage({data:av.tom,x:8.35,y:2.95,w:1.1,h:1.1,altText:"Tom"}); pill(pres,s,6.5,3.1,1.8,0.5,C.WHITE,"You're Tom.",NAVY,17);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:6.5,y:3.1,w:1.8,h:0.5,rectRadius:0.25,fill:{color:C.WHITE},line:{color:C.LINE,width:1.25}});
  s.addText("You're Tom.",{isTextBox:true,x:6.5,y:3.1,w:1.8,h:0.5,align:"center",valign:"middle",fontFace:BF,fontSize:17,bold:true,color:NAVY,margin:0});
  note(pres,s,0.5,4.3,9,0.85,"WATCH OUT","",C.YELT);
  T(s,"*I'm* = I am     *You're* = you are      Na fala, usamos quase sempre a forma curta.",{x:0.7,y:4.52,w:8.6,h:0.5,base:{fontSize:14},hl:NAVY});
  s.addNotes("Contraste com o português: 'Sou Ana' esconde o sujeito no verbo; em inglês, I e you são obrigatórios. Drill: diga 'I' e o aluno completa 'am…'; diga 'you' e ele completa 'are…'.");

  // 12 GRAMMAR 2 ----------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,4,"Grammar","Negatives, questions & short answers");
  [["+","Affirmative",C.MINTT,"I'm from Brazil.","You're a student."],["–","Negative",C.YELT,"I'm *not* from Japan.","You *aren't* a doctor.\n(or You're *not*)"],["?","Question",C.BLUET,"*Are* you a student?","*Are* you from Canada?"]].forEach((g,i)=>{
    const x=0.5+i*3.05;
    box(pres,s,x,1.4,2.9,2.45,g[2]);
    dot(pres,s,x+0.15,1.55,0.5,NAVY,g[0],YEL,20);
    s.addText(g[1],{isTextBox:true,x:x+0.8,y:1.55,w:2,h:0.5,fontFace:HF,fontSize:20,bold:true,color:NAVY,margin:0,valign:"middle"});
    T(s,g[3],{x:x+0.2,y:2.3,w:2.6,h:0.4,base:{fontSize:16},hl:"B45309"});
    T(s,g[4],{x:x+0.2,y:2.85,w:2.6,h:0.8,base:{fontSize:16},hl:"B45309"});
  });
  box(pres,s,0.5,4.05,9,1.1,C.PANEL);
  pill(pres,s,0.65,3.91,1.5,0.28,YEL,"SHORT ANSWERS",NAVY,10);
  T(s,"*Are you a student?*",{x:0.75,y:4.3,w:2.8,h:0.3,base:{fontSize:16}});
  [["Yes, I *am*.",C.MINT],["No, I'*m not*.",C.RED]].forEach((a,i)=>{
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:3.7+i*2.6,y:4.27,w:2.4,h:0.4,rectRadius:0.2,fill:{color:C.WHITE},line:{color:a[1],width:2},objectName:"Answer"});
    T(s,a[0],{x:3.7+i*2.6,y:4.27,w:2.4,h:0.4,base:{fontSize:16,align:"center"},align:"center",valign:"middle",hl:NAVY});
  });
  T(s,"Na resposta curta, repita só o verbo: *Yes, I am.* (não: ~~Yes, I'm.~~)".replace("~~Yes, I'm.~~","Yes, I'm."),{x:0.75,y:4.75,w:8.4,h:0.3,base:{fontSize:13,color:GREY},hl:"B45309"});
  s.addNotes("'I amn't' não existe: use sempre 'I'm not'. Com 'you', as duas formas são corretas: 'You aren't' ou 'You're not'. Drill de perguntas rápidas: 'Are you a teacher?' — o aluno responde só 'Yes, I am.' ou 'No, I'm not.'");

  // 13 DICA BRASIL --------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,4,"Dica Brasil","Watch out for these mistakes");
  [["Am Ana.","I'm Ana.","O sujeito é obrigatório."],["Yes, I'm.","Yes, I am.","Na resposta curta, não use a forma contraída."],["Where you are from?","Where are you from?","Na pergunta, o verbo vem antes do sujeito."]].forEach((e,i)=>{
    const y=1.4+i*0.95;
    box(pres,s,0.5,y,9,0.82,C.PANEL);
    dot(pres,s,0.7,y+0.17,0.48,"FBE0DD","✗",C.RED,16);
    s.addText(e[0],{isTextBox:true,x:1.35,y,w:2.5,h:0.82,fontFace:BF,fontSize:18,color:GREY,strike:"sngStrike",margin:0,valign:"middle"});
    dot(pres,s,4.0,y+0.17,0.48,C.MINTT,"✓","1B7F5C",16);
    s.addText(e[1],{isTextBox:true,x:4.65,y,w:2.4,h:0.82,fontFace:BF,fontSize:18,bold:true,color:NAVY,margin:0,valign:"middle"});
    T(s,e[2],{x:6.95,y,w:2.4,h:0.82,base:{fontSize:13,color:GREY},valign:"middle"});
  });
  box(pres,s,0.5,4.5,9,0.65,C.MINTT,"BFE9D6");
  pill(pres,s,0.65,4.36,1.3,0.28,C.MINT,"CULTURE CORNER",NAVY,10);
  T(s,"“How are you?” é uma saudação, não uma pergunta sobre saúde. A resposta comum é *Fine, thanks. And you?*",{x:0.75,y:4.65,w:8.5,h:0.45,base:{fontSize:14},valign:"middle",hl:"1B7F5C"});
  s.addNotes("Erros mais comuns de brasileiros nesta unidade. Peça que o aluno leia a versão errada e corrija em voz alta antes de revelar a certa.");

  // 14 EX A gaps ---------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,5,"Exercises","Practice");
  exHead(pres,s,0.5,1.35,"A","Complete the sentences with the words in the box.");
  box(pres,s,0.5,1.85,9,0.5,C.YELT,"F2D869","Word box");
  ["am","are","Are","'m not","aren't"].forEach((w,i)=>T(s,w,{x:0.9+i*1.7,y:1.85,w:1.5,h:0.5,base:{fontSize:17,bold:true},valign:"middle"}));
  ["Hello! I _____ Tom.","You _____ a teacher.","_____ you Brazilian?","Yes, I _____.","I _____ from Japan. (negative)","You _____ American. (negative)"].forEach((q,i)=>{
    const x=0.5+(i%2)*4.6, y=2.6+Math.floor(i/2)*0.82;
    dot(pres,s,x,y,0.4,C.BLUET,i+1,NAVY,14);
    T(s,q,{x:x+0.55,y,w:3.9,h:0.4,base:{fontSize:17},valign:"middle"});
  });
  s.addNotes("Gabarito: 1 am · 2 are · 3 Are · 4 am · 5 'm not · 6 aren't.");

  // 15 EX B order + C rewrite ---------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,5,"Exercises","Practice");
  exHead(pres,s,0.5,1.35,"B","Put the words in order.");
  ["name / is / My / Ana","you / Are / Brazilian / ?","from / I'm / Canada","to / meet / Nice / you"].forEach((q,i)=>{
    const y=1.9+i*0.72;
    dot(pres,s,0.5,y,0.4,C.BLUET,i+1,NAVY,14);
    T(s,q,{x:1.05,y,w:3.3,h:0.4,base:{fontSize:16,bold:true},valign:"middle"});
    line(pres,s,1.05,y+0.62,3.3);
  });
  exHead(pres,s,5.1,1.35,"C","Rewrite the sentences.");
  [["You are a student.","?"],["I'm a doctor.","–"],["You're from Japan.","?"],["You are Tom.","–"]].forEach((q,i)=>{
    const y=1.9+i*0.72;
    dot(pres,s,5.1,y,0.4,C.BLUET,i+1,NAVY,14);
    T(s,q[0],{x:5.65,y,w:2.7,h:0.4,base:{fontSize:16,bold:true},valign:"middle"});
    pill(pres,s,8.5,y+0.04,0.9,0.32,q[1]==="?"?C.BLUE:C.YEL,q[1]==="?"?"question":"negative",NAVY,10);
    line(pres,s,5.65,y+0.62,3.75);
  });
  s.addNotes("Gabarito: B) My name is Ana. / Are you Brazilian? / I'm from Canada. / Nice to meet you. C) Are you a student? / I'm not a doctor. / Are you from Japan? / You aren't (You're not) Tom.");

  // 16 LISTENING -----------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,5,"Exercises","Listening");
  audio(pres,s,0.5,1.32,"1.7",ic.phones);
  exHead(pres,s,1.6,1.32,"D","Listen and write the names you hear.");
  [["carlos","1"],["emma","2"],["yuki","3"]].forEach((p,i)=>{
    const x=0.5+i*3.05;
    box(pres,s,x,1.95,2.9,2.0,C.PANEL);
    s.addImage({data:av[p[0]],x:x+0.95,y:2.05,w:1.0,h:1.0,altText:"Speaker "+p[1]});
    dot(pres,s,x+0.12,2.1,0.36,NAVY,p[1],YEL,13);
    T(s,"Name:",{x:x+0.2,y:3.2,w:0.8,h:0.3,base:{fontSize:14,color:GREY}});
    line(pres,s,x+0.95,3.48,1.8);
    T(s,"Country:",{x:x+0.2,y:3.55,w:0.8,h:0.3,base:{fontSize:14,color:GREY}});
    line(pres,s,x+0.95,3.83,1.8);
  });
  box(pres,s,0.5,4.2,9,0.95,C.YELT,"F2D869");
  pill(pres,s,0.65,4.06,0.9,0.28,YEL,"LISTEN 2",NAVY,10);
  T(s,"Listen again. Circle the greeting you hear:   1 *Good morning / Good evening*   2 *Hello / Hi*   3 *Goodbye / See you later*",{x:0.8,y:4.4,w:8.4,h:0.6,base:{fontSize:14},hl:NAVY});
  s.addNotes("Áudio 1.7: veja o script no fim da apostila (Carlos, Emma e Yuki se apresentam e soletram o nome). Gabarito: 1 Carlos, Brazil · 2 Emma, England · 3 Yuki, Japan. Greetings: 1 Good evening · 2 Hi · 3 See you later.");

  // 17 EX E choose ---------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,5,"Exercises","Practice");
  exHead(pres,s,0.5,1.35,"E","Circle the correct answer: a, b or c.");
  [["_____ you from Japan?",["Am","Are","Is"]],["I _____ a teacher.",["are","am","is"]],["Yes, I _____.",["am","I'm","are"]],["Where _____ you from?",["you are","am","are"]],["You _____ Canadian. (negative)",["isn't","aren't","amn't"]]].forEach((q,i)=>{
    const y=1.9+i*0.64;
    dot(pres,s,0.5,y,0.4,C.BLUET,i+1,NAVY,14);
    T(s,q[0],{x:1.05,y,w:3.7,h:0.4,base:{fontSize:16},valign:"middle"});
    q[1].forEach((o,j)=>{ s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:4.9+j*1.55,y:y+0.02,w:1.4,h:0.36,rectRadius:0.18,fill:{color:C.WHITE},line:{color:"9AA7BD",width:1.25},objectName:"Option"}); T(s,"abc"[j]+"  "+o,{x:4.9+j*1.55,y:y+0.02,w:1.4,h:0.36,base:{fontSize:14,align:"center"},align:"center",valign:"middle"}); });
  });
  s.addNotes("Gabarito: 1 b · 2 b · 3 a · 4 c · 5 b.");

  // 18 SPEAKING ------------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,6,"Speaking","Role-play: meet a new classmate");
  T(s,"Work in pairs. Student A is *Carlos*. Student B is *Emma*. Use the information in the cards.",{x:0.5,y:1.3,w:9,h:0.3,base:{fontSize:15,bold:true},hl:"B45309"});
  [["carlos","Student A","Carlos","Brazil · Brazilian","student",C.MINTT],["emma","Student B","Emma","England · English","teacher",C.LILT]].forEach((p,i)=>{
    const y=1.8+i*1.65;
    box(pres,s,0.5,y,3.6,1.5,p[5]);
    s.addImage({data:av[p[0]],x:0.65,y:y+0.2,w:1.0,h:1.0,altText:p[2]});
    pill(pres,s,1.85,y+0.2,1.1,0.28,NAVY,p[1].toUpperCase(),YEL,10);
    s.addText(p[2],{isTextBox:true,x:1.85,y:y+0.52,w:2.2,h:0.4,fontFace:HF,fontSize:22,bold:true,color:NAVY,margin:0});
    T(s,p[3]+"\n"+p[4],{x:1.85,y:y+0.92,w:2.2,h:0.5,base:{fontSize:13,color:GREY}});
  });
  box(pres,s,4.3,1.8,5.2,3.15,C.PANEL);
  [["1","Greet","Hello! / Good morning!"],["2","Ask the name","What's your name?"],["3","Spell it","How do you spell it?"],["4","Ask about origin","Are you …? Where are you from?"],["5","Say goodbye","Nice to meet you. See you later!"]].forEach((r,i)=>{
    const y=1.95+i*0.52;
    dot(pres,s,4.5,y,0.4,YEL,r[0],NAVY,14);
    T(s,"*"+r[1]+":*  "+r[2],{x:5.05,y,w:4.3,h:0.4,base:{fontSize:14},valign:"middle",hl:NAVY});
  });
  T(s,"Now change roles. Then use your own information!",{x:4.5,y:4.55,w:4.9,h:0.3,base:{fontSize:13,italic:true,color:GREY}});
  s.addNotes("Deixe o aluno praticar 2 vezes: com as frases à vista e, depois, sem olhar. Corrija só os erros que atrapalham a comunicação. Se o aluno estiver sozinho, o professor faz o papel do colega. Self-check no próximo slide.");

  // 19 WRITING -------------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,6,"Writing","My introduction card");
  T(s,"Complete the card about you (30–40 words).",{x:0.5,y:1.3,w:9,h:0.3,base:{fontSize:15,bold:true}});
  box(pres,s,0.5,1.8,9,3.3,C.WHITE,C.NAVY,"Card");
  box(pres,s,0.8,2.1,1.7,1.9,C.PANEL); s.addImage({data:ic.user.replace(/^/,""),x:1.35,y:2.65,w:0.6,h:0.6,altText:"Photo"}); T(s,"your photo",{x:0.8,y:3.55,w:1.7,h:0.3,base:{fontSize:12,color:GREY,align:"center"},align:"center"});
  ["Hello! My name is","I'm from            . I'm            .","I'm a            .","Nice to meet you!"].forEach((l,i)=>{
    const y=2.1+i*0.62;
    T(s,l,{x:2.9,y,w:6.3,h:0.4,base:{fontSize:18,bold:i===3},valign:"middle"});
    line(pres,s,i===0?5.7:2.9,y+0.5,i===0?3.5:6.3);
  });
  T(s,"Self-check:   ☐ I used *I'm*     ☐ I wrote my country with a capital letter     ☐ I used a full stop (.)",{x:0.8,y:4.55,w:8.5,h:0.35,base:{fontSize:13,color:GREY},hl:NAVY});
  s.addNotes("O aluno escreve à mão ou digita e depois lê o cartão em voz alta. Incentive-o a acrescentar mais uma informação (cidade, idade).");

  // 20 WRAP-UP -------------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,"✓","Wrap-up","Can you do it?");
  box(pres,s,0.5,1.4,5.6,3.7,C.PANEL);
  ["Greet people (Hello, Good morning)","Say and ask names","Say where I'm from and what I do","Spell my name"].forEach((c,i)=>{
    const y=1.6+i*0.85;
    T(s,c,{x:0.75,y,w:3.3,h:0.6,base:{fontSize:15},valign:"middle"});
    [["✓",C.MINT],["~",YEL],["✗","F4A29B"]].forEach((m,j)=>pill(pres,s,4.15+j*0.62,y+0.12,0.52,0.36,m[1],m[0],NAVY,14));
  });
  box(pres,s,6.3,1.4,3.2,2.05,C.BLUET,"B7D9F5");
  pill(pres,s,6.45,1.26,1.5,0.28,YEL,"WORDS I LEARNED",NAVY,10);
  T(s,"Write your 3 favourite words:",{x:6.5,y:1.65,w:2.8,h:0.3,base:{fontSize:14}});
  [0,1,2].forEach(i=>{ T(s,String(i+1),{x:6.5,y:2.05+i*0.45,w:0.3,h:0.3,base:{fontSize:14,bold:true}}); line(pres,s,6.8,2.33+i*0.45,2.5); });
  box(pres,s,6.3,3.65,3.2,1.45,YEL,YEL,"Next unit");
  T(s,"NEXT: UNIT 2",{x:6.5,y:3.8,w:2.8,h:0.3,base:{fontSize:12,bold:true,color:NAVY}});
  s.addText("Where are you from?",{isTextBox:true,x:6.5,y:4.15,w:2.8,h:0.8,fontFace:HF,fontSize:22,bold:true,color:NAVY,margin:0,valign:"top"});
  s.addNotes("Peça que o aluno marque ✓ (consigo), ~ (mais ou menos) ou ✗ (ainda não). Para os itens com ~ ou ✗, sugira rever a seção correspondente. Tarefa: gravar um áudio de 30 segundos se apresentando.");

  // 21 ANSWER KEY ----------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,"★","Appendix","Answer key");
  [["Warm-up A","1 b · 2 d · 3 a · 4 c"],["Dialogue A / B","1 F · 2 T · 3 T · 4 F  /  A teacher · São Paulo (Brazil) · No (he's Canadian)"],["Reading A","Tom · Yuki · Ana"],["Jobs A","1 doctor · 2 teacher · 3 engineer · 4 student"],["A · Gaps","1 am · 2 are · 3 Are · 4 am · 5 'm not · 6 aren't"],["B · Order","My name is Ana. / Are you Brazilian? / I'm from Canada. / Nice to meet you."],["C · Rewrite","Are you a student? / I'm not a doctor. / Are you from Japan? / You aren't (You're not) Tom."],["D · Listening","1 Carlos, Brazil · 2 Emma, England · 3 Yuki, Japan"],["E · Circle","1 b · 2 b · 3 a · 4 c · 5 b"]].forEach((k,i)=>{
    const y=1.35+i*0.42;
    box(pres,s,0.5,y,9,0.36,i%2?C.WHITE:C.PANEL,C.LINE);
    T(s,k[0],{x:0.65,y,w:1.9,h:0.36,base:{fontSize:13,bold:true},valign:"middle"});
    T(s,k[1],{x:2.6,y,w:6.8,h:0.36,base:{fontSize:13},valign:"middle"});
  });
  s.addNotes("Gabarito completo da unidade.");

  // 22 AUDIO SCRIPT --------------------------------------------------------
  s = pres.addSlide({ masterName: "PAGE" });
  head(pres,s,"★","Appendix","Audio script");
  box(pres,s,0.5,1.45,4.4,2.6,C.PANEL);
  pill(pres,s,0.65,1.31,1.2,0.28,YEL,"1.7 LISTENING",NAVY,10);
  T(s,"*1* Good evening! I'm Carlos. I'm from Brazil. C-A-R-L-O-S.\n\n*2* Hi! I'm Emma, E-M-M-A. I'm from England.\n\n*3* Hello! My name's Yuki, Y-U-K-I. I'm from Japan. See you later!",{x:0.7,y:1.8,w:4.0,h:2.2,base:{fontSize:14},hl:NAVY});
  box(pres,s,5.1,1.45,4.4,2.6,C.PANEL);
  pill(pres,s,5.25,1.31,1.2,0.28,YEL,"1.1 DIALOGUE",NAVY,10);
  T(s,"Os áudios 1.1 a 1.6 reproduzem o diálogo, as leituras, o vocabulário e o alfabeto desta unidade.\n\nSugestão: grave a sua voz (ou use um app de texto para fala) lendo cada bloco duas vezes: devagar e em velocidade natural.",{x:5.3,y:1.8,w:4.0,h:2.2,base:{fontSize:14,color:GREY}});
  s.addNotes("Script para o professor gravar ou ler em voz alta.");

  await pres.writeFile({ fileName: "Book1_Unit01.pptx" });
  console.log("done");
})();
