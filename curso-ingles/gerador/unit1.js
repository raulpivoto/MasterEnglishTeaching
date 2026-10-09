const L = require("./lib.js");
const { newPres, icon, T, header, card, circle, pill, NAVY, YEL, CARD, CARD2, BLUE, MINT, LILAC, MUTE, WHITE, HF, BF } = L;
const fa = require("react-icons/fa");

(async () => {
  const pres = newPres();
  const K = "UNIT 1 · ";
  const ic = {
    sun: await icon(fa.FaSun), cloud: await icon(fa.FaCloudSun), moon: await icon(fa.FaMoon), bed: await icon(fa.FaBed),
    chat: await icon(fa.FaCommentDots), user: await icon(fa.FaUserAlt), globe: await icon(fa.FaGlobeAmericas), font: await icon(fa.FaFont),
  };

  // 1. COVER
  let s = pres.addSlide({ masterName: "COVER" });
  s.addShape(pres.shapes.U_TURN_ARROW, { x: 0.3, y: 0.4, w: 3.4, h: 5.2, fill: { color: CARD }, line: { color: CARD, width: 0 }, objectName: "Skyrocket arrow" });
  s.addText("THE ENGLISH SKYROCKET\nBOOK 1 · LEVEL A1", { isTextBox:true, x:5.5,y:0.35,w:4,h:0.6, align:"right", fontFace:BF,fontSize:12,bold:true,color:WHITE,charSpacing:3,margin:0 });
  s.addText("UNIT 1", { isTextBox:true, x:1.2,y:1.35,w:7,h:0.4, fontFace:BF,fontSize:16,bold:true,color:WHITE,charSpacing:4,margin:0 });
  s.addText("HELLO! NICE TO MEET YOU", { isTextBox:true, x:1.2,y:1.8,w:7,h:1.5, fontFace:HF,fontSize:44,bold:true,color:YEL,margin:0,valign:"top" });
  s.addText("Cumprimentar e se apresentar · verbo to be (I / you) · alfabeto", { isTextBox:true, x:1.2,y:3.55,w:7.4,h:0.4, fontFace:BF,fontSize:15,bold:true,color:WHITE,margin:0 });
  s.addText("BY RAUL PIVOTO", { isTextBox:true, x:6,y:4.85,w:3.5,h:0.3, align:"right", fontFace:BF,fontSize:11,bold:true,color:WHITE,charSpacing:2,margin:0 });
  s.addNotes("Book 1 · Unit 1. Receba o aluno com um sorriso e diga: 'Hello! Welcome!'. Explique que, ao final, ele vai conseguir se apresentar em inglês. Tempo total: cerca de 135 minutos (pode ser dividido em 2 aulas).");

  // 2. CAN-DO
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"OBJETIVOS", "NESTA UNIDADE, EU CONSIGO…");
  const cando = [
    [ic.chat, "Cumprimentar", "dizer *Hello*, *Good morning* e *Goodbye* na hora certa"],
    [ic.user, "Me apresentar", "dizer meu nome e perguntar o nome de alguém"],
    [ic.globe, "Falar de onde sou", "dizer meu país, minha nacionalidade e minha profissão"],
    [ic.font, "Soletrar", "falar o alfabeto e soletrar meu nome"],
  ];
  cando.forEach((c,i)=>{
    const x = 0.5 + (i%2)*4.6, y = 1.5 + Math.floor(i/2)*1.75;
    card(pres,s,x,y,4.4,1.55);
    s.addShape(pres.shapes.OVAL,{x:x+0.25,y:y+0.3,w:0.8,h:0.8,fill:{color:YEL},line:{color:YEL,width:0},objectName:"Icon circle"});
    s.addImage({data:c[0],x:x+0.45,y:y+0.5,w:0.4,h:0.4,altText:c[1]});
    s.addText(c[1].toUpperCase(),{isTextBox:true,x:x+1.2,y:y+0.25,w:3,h:0.35,fontFace:HF,fontSize:20,bold:true,color:WHITE,margin:0});
    T(s,c[2],{x:x+1.2,y:y+0.65,w:3,h:0.75,base:{fontSize:14,color:MUTE}});
  });
  s.addNotes("Leia os objetivos com o aluno em português. No fim da unidade ele volta a esta página e marca o que já consegue fazer.");

  // 3. ROADMAP
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, "PLANO DA UNIDADE", "TODAY'S ROADMAP");
  const road = [["Warm-up","10 min"],["Dialogue","20 min"],["Vocabulary","20 min"],["Grammar","25 min"],["Exercises","30 min"],["Speaking","25 min"],["Wrap-up","5 min"]];
  s.addShape(pres.shapes.LINE,{x:1.0,y:2.55,w:8.0,h:0,line:{color:CARD2,width:2}});
  road.forEach((r,i)=>{
    const cx = 1.0 + i*(8.0/6);
    circle(pres,s,cx-0.3,2.25,0.6,i%2?BLUE:YEL,i+1,NAVY,18);
    s.addText(r[0],{isTextBox:true,x:cx-0.6,y:2.95,w:1.2,h:0.3,align:"center",fontFace:BF,fontSize:14,bold:true,color:WHITE,margin:0});
    s.addText(r[1],{isTextBox:true,x:cx-0.6,y:3.27,w:1.2,h:0.25,align:"center",fontFace:BF,fontSize:12,color:MUTE,margin:0});
  });
  s.addText("Total: cerca de 135 minutos",{isTextBox:true,x:0.5,y:4.3,w:9,h:0.3,align:"center",fontFace:BF,fontSize:14,italic:true,color:MUTE,margin:0});
  s.addNotes("Mostre a ordem da aula. Todas as unidades do Book 1 seguem exatamente esta sequência: o aluno sempre sabe o que vem a seguir.");

  // 4. WARM-UP
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"1 · WARM-UP", "SAY HELLO!");
  T(s,"Que cumprimento você usa em cada horário? Leia em voz alta.",{x:0.5,y:1.3,w:9,h:0.3,base:{fontSize:15,color:MUTE}});
  const gr = [[ic.sun,"Good morning","6:00 – 11:59",YEL],[ic.cloud,"Good afternoon","12:00 – 17:59",BLUE],[ic.moon,"Good evening","18:00 – 21:59",LILAC],[ic.bed,"Good night","antes de dormir",MINT]];
  gr.forEach((g,i)=>{
    const x = 0.5 + i*2.3;
    card(pres,s,x,1.8,2.1,2.15);
    s.addShape(pres.shapes.OVAL,{x:x+0.65,y:2.0,w:0.8,h:0.8,fill:{color:g[3]},line:{color:g[3],width:0},objectName:"Icon circle"});
    s.addImage({data:g[0],x:x+0.85,y:2.2,w:0.4,h:0.4,altText:g[1]});
    s.addText(g[1],{isTextBox:true,x:x+0.1,y:2.95,w:1.9,h:0.35,align:"center",fontFace:BF,fontSize:16,bold:true,color:WHITE,margin:0});
    s.addText(g[2],{isTextBox:true,x:x+0.1,y:3.35,w:1.9,h:0.3,align:"center",fontFace:BF,fontSize:13,color:MUTE,margin:0});
  });
  card(pres,s,0.5,4.2,9,0.8);
  T(s,"Agora é com você: diga *Hello!* para o professor e responda *My name is …*",{x:0.75,y:4.2,w:8.5,h:0.8,base:{fontSize:15,valign:"middle"},valign:"middle"});
  s.addNotes("Peça ao aluno que diga em voz alta cada cumprimento. Pergunte: 'What time is it now?' e deixe-o escolher o cumprimento certo. Obs.: 'Good night' é usado ao se despedir à noite, não ao chegar.");

  // 5. DIALOGUE
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"2 · DIALOGUE", "MEETING FOR THE FIRST TIME");
  const dl = [["T","Tom","Hello! I'm Tom. What's your name?"],["A","Ana","Hi, Tom! My name's Ana. Nice to meet you."],["T","Tom","Nice to meet you, too. Are you Brazilian?"],["A","Ana","Yes, I am. I'm from São Paulo. And you?"],["T","Tom","I'm from Canada. I'm a teacher."],["A","Ana","Great! I'm a student. See you later!"]];
  dl.forEach((d,i)=>{
    const right = d[0]==="A"; const y = 1.35 + i*0.6;
    const bx = right ? 2.9 : 1.1;
    circle(pres,s,right?9.0-0.0-0.0:0.5,y,0.46,right?BLUE:YEL,d[0],NAVY,16);
    card(pres,s,bx,y,6.0,0.5,right?CARD2:CARD,"Bubble");
    T(s,d[2],{x:bx+0.2,y,w:5.6,h:0.5,base:{fontSize:15},valign:"middle"});
  });
  s.addNotes("Toque o áudio (ou leia em voz alta) duas vezes. 1ª vez: só ouvir. 2ª vez: repetir cada fala. Depois, o aluno lê como Ana e você como Tom — e troquem os papéis. Dica de pronúncia: 'I'm' soa como 'áim'.");

  // 6. COMPREHENSION
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"2 · DIALOGUE", "TRUE OR FALSE?");
  T(s,"Leia o diálogo de novo. Escreva *T* (true) ou *F* (false).",{x:0.5,y:1.3,w:9,h:0.3,base:{fontSize:15,color:MUTE}});
  ["Tom is Brazilian.","Ana is from São Paulo.","Tom is a teacher.","Ana is a teacher."].forEach((q,i)=>{
    const y = 1.85 + i*0.72;
    card(pres,s,0.5,y,9,0.6,CARD);
    circle(pres,s,0.65,y+0.1,0.4,YEL,i+1,NAVY,14);
    s.addText(q,{isTextBox:true,x:1.3,y,w:6,h:0.6,fontFace:BF,fontSize:17,bold:true,color:WHITE,margin:0,valign:"middle"});
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:8.0,y:y+0.1,w:1.3,h:0.4,rectRadius:0.1,fill:{color:NAVY},line:{color:MUTE,width:1,dashType:"dash"},objectName:"Answer box"});
  });
  s.addText("Corrija as frases falsas: *Tom is Canadian.*",{isTextBox:true,x:0.5,y:4.8,w:9,h:0.3,fontFace:BF,fontSize:14,color:MUTE,margin:0});
  s.addNotes("Gabarito: 1 F · 2 T · 3 T · 4 F. Peça que o aluno corrija as falsas: Tom is Canadian. / Ana is a student.");

  // 7. VOCAB 1
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"3 · VOCABULARY", "GREETINGS & GOODBYES");
  const v1 = [["Hello / Hi","Olá / Oi","Hi, Tom!"],["Good morning","Bom dia","Good morning, Ana."],["Good afternoon","Boa tarde","Good afternoon!"],["Good evening","Boa noite (chegada)","Good evening, everyone."],["Goodbye / Bye","Tchau","Bye, see you!"],["See you later","Até mais","See you later!"],["Nice to meet you","Prazer em conhecer","Nice to meet you."],["Please / Thank you","Por favor / Obrigado","Thank you, Tom."]];
  card(pres,s,0.5,1.35,9,3.75);
  v1.forEach((v,i)=>{
    const y = 1.45 + i*0.455;
    if (i%2===0) s.addShape(pres.shapes.RECTANGLE,{x:0.6,y,w:8.8,h:0.43,fill:{color:CARD2,transparency:55},line:{color:CARD2,width:0},objectName:"Row tint"});
    s.addText(v[0],{isTextBox:true,x:0.8,y,w:2.8,h:0.43,fontFace:BF,fontSize:15,bold:true,color:YEL,margin:0,valign:"middle"});
    s.addText(v[1],{isTextBox:true,x:3.7,y,w:2.5,h:0.43,fontFace:BF,fontSize:14,color:WHITE,margin:0,valign:"middle"});
    s.addText(v[2],{isTextBox:true,x:6.3,y,w:3.0,h:0.43,fontFace:BF,fontSize:14,italic:true,color:MUTE,margin:0,valign:"middle"});
  });
  s.addNotes("Leia cada palavra e peça ao aluno que repita (drill coral). Depois cubra a coluna do meio e peça a tradução. 'Good evening' é usado ao chegar à noite; 'Good night' só ao se despedir.");

  // 8. VOCAB 2
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"3 · VOCABULARY", "COUNTRIES & JOBS");
  card(pres,s,0.5,1.35,5.2,3.75); card(pres,s,5.9,1.35,3.6,3.75);
  pill(pres,s,0.75,1.5,1.7,0.3,YEL,"COUNTRY → NATIONALITY",NAVY,10);
  [["Brazil","Brazilian"],["the USA","American"],["Canada","Canadian"],["England","English"],["Portugal","Portuguese"],["Japan","Japanese"]].forEach((c,i)=>{
    const y = 1.95 + i*0.5;
    s.addText(c[0],{isTextBox:true,x:0.8,y,w:2.2,h:0.45,fontFace:BF,fontSize:16,color:WHITE,margin:0,valign:"middle"});
    s.addText("→",{isTextBox:true,x:2.8,y,w:0.4,h:0.45,fontFace:BF,fontSize:16,color:MUTE,margin:0,valign:"middle",align:"center"});
    s.addText(c[1],{isTextBox:true,x:3.3,y,w:2.3,h:0.45,fontFace:BF,fontSize:16,bold:true,color:YEL,margin:0,valign:"middle"});
  });
  pill(pres,s,6.15,1.5,0.9,0.3,BLUE,"JOBS",NAVY,10);
  [["teacher","professor(a)"],["student","estudante"],["doctor","médico(a)"],["engineer","engenheiro(a)"],["manager","gerente"]].forEach((c,i)=>{
    const y = 1.95 + i*0.6;
    s.addText(c[0],{isTextBox:true,x:6.15,y,w:1.5,h:0.5,fontFace:BF,fontSize:16,bold:true,color:WHITE,margin:0,valign:"middle"});
    s.addText(c[1],{isTextBox:true,x:7.65,y,w:1.7,h:0.5,fontFace:BF,fontSize:14,color:MUTE,margin:0,valign:"middle"});
  });
  s.addNotes("Atenção: em inglês, nacionalidades são escritas com letra maiúscula (Brazilian, Canadian). Peça ao aluno que diga seu país e sua profissão: 'I'm from Brazil. I'm a manager.'");

  // 9. ALPHABET
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"3 · VOCABULARY", "THE ALPHABET");
  const al = [["A","êi"],["B","bi"],["C","si"],["D","di"],["E","i"],["F","éf"],["G","djí"],["H","êitch"],["I","ai"],["J","djêi"],["K","kêi"],["L","él"],["M","ém"],["N","én"],["O","ôu"],["P","pi"],["Q","kiú"],["R","ar"],["S","és"],["T","ti"],["U","iú"],["V","vi"],["W","dâbliu"],["X","éks"],["Y","uái"],["Z","zi"]];
  al.forEach((a,i)=>{
    const x = 0.5 + (i%9)*1.0, y = 1.35 + Math.floor(i/9)*0.95;
    card(pres,s,x,y,0.92,0.85,[0,4,8,14,20].includes(i)?CARD2:CARD,"Letter");
    s.addText(a[0],{isTextBox:true,x,y:y+0.05,w:0.92,h:0.5,align:"center",fontFace:HF,fontSize:26,bold:true,color:YEL,margin:0,valign:"middle"});
    s.addText(a[1],{isTextBox:true,x,y:y+0.55,w:0.92,h:0.25,align:"center",fontFace:BF,fontSize:11,color:MUTE,margin:0});
  });
  card(pres,s,0.5+8.0,1.35+1.9,0.92,0.85,YEL,"Your turn");
  s.addText("Your name?",{isTextBox:true,x:8.5,y:3.25,w:0.92,h:0.85,align:"center",valign:"middle",fontFace:BF,fontSize:12,bold:true,color:NAVY,margin:0});
  T(s,"Soletrando: *How do you spell your name?* → *T-O-M*",{x:0.5,y:4.4,w:9,h:0.4,base:{fontSize:16}});
  s.addNotes("A pronúncia ao lado é uma aproximação em português; a prática com áudio é essencial. Letras de vogais em destaque (A, E, I, O, U). Atividade: o aluno soletra o próprio nome, depois o sobrenome e o e-mail ('at' = @, 'dot' = .).");

  // 10. GRAMMAR 1
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"4 · GRAMMAR", "TO BE: SER / ESTAR");
  T(s,"O verbo *to be* significa *ser* ou *estar*. Hoje usamos duas formas:",{x:0.5,y:1.3,w:9,h:0.3,base:{fontSize:15,color:MUTE}});
  [[0.5,BLUE,"I","am","I'm","I'm Ana. I'm a student."],[5.1,YEL,"YOU","are","you're","You're Tom. You're a teacher."]].forEach(g=>{
    card(pres,s,g[0],1.8,4.4,2.0);
    pill(pres,s,g[0]+0.25,2.0,0.9,0.32,g[1],g[2],NAVY,13);
    s.addText(g[3],{isTextBox:true,x:g[0]+1.4,y:1.95,w:1.2,h:0.45,fontFace:HF,fontSize:30,bold:true,color:WHITE,margin:0,valign:"middle"});
    s.addText("forma curta: "+g[4],{isTextBox:true,x:g[0]+2.6,y:1.95,w:1.7,h:0.45,fontFace:BF,fontSize:13,italic:true,color:MUTE,margin:0,valign:"middle"});
    T(s,g[5].replace(/'m|'re/,m=>"*"+m+"*"),{x:g[0]+0.25,y:2.7,w:3.9,h:0.8,base:{fontSize:17}});
  });
  card(pres,s,0.5,4.0,9,1.05);
  T(s,"Em inglês, a frase sempre precisa de *sujeito*. Não existe \"Sou professor\"; diga *I'm a teacher*.",{x:0.75,y:4.0,w:8.5,h:1.05,base:{fontSize:15},valign:"middle"});
  s.addNotes("Mostre o contraste com o português: 'Sou Ana' tem o sujeito escondido no verbo; em inglês o sujeito (I, you) é obrigatório. Faça um drill: diga 'I' e o aluno completa com 'am…'; diga 'you' e ele completa 'are…'.");

  // 11. GRAMMAR 2
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"4 · GRAMMAR", "NEGATIVES, QUESTIONS & ANSWERS");
  const g2 = [["1","NEGATIVE","Coloque *not* depois do verbo.",["I *am not* Tom. → I*'m not* Tom.","You *are not* a doctor. → You *aren't* a doctor."]],
              ["2","QUESTION","O verbo vai para o começo.",["You are Brazilian. → *Are* you Brazilian?"]],
              ["3","SHORT ANSWER","Responda com o verbo, sem repetir o resto.",["Are you a student?","Yes, I *am*.","No, I*'m not*."]]];
  g2.forEach((g,i)=>{
    const x = 0.5 + i*3.05;
    card(pres,s,x,1.4,2.9,3.65);
    circle(pres,s,x+0.2,1.55,0.5,YEL,g[0],NAVY,18);
    s.addText(g[1],{isTextBox:true,x:x+0.2,y:2.15,w:2.6,h:0.4,fontFace:HF,fontSize:20,bold:true,color:WHITE,margin:0});
    T(s,g[2],{x:x+0.2,y:2.58,w:2.55,h:0.6,base:{fontSize:13,color:MUTE}});
    g[3].forEach((e,j)=>T(s,e,{x:x+0.2,y:3.3+j*0.55,w:2.55,h:0.5,base:{fontSize:14}}));
  });
  s.addNotes("Atenção: 'I amn't' não existe. Use sempre 'I'm not'. Com 'you', as duas formas são corretas: 'You aren't' ou 'You're not'. Faça um drill de perguntas rápidas: 'Are you a teacher?' — o aluno responde só com 'Yes, I am.' ou 'No, I'm not.'");

  // 12. DICA BRASIL
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"4 · DICA BRASIL", "WATCH OUT FOR THESE MISTAKES");
  const er = [["Am Ana.","I'm Ana.","O sujeito é obrigatório."],["Yes, I'm.","Yes, I am.","Na resposta curta, não use a forma contraída."],["Where you are from?","Where are you from?","Nas perguntas, o verbo vem antes do sujeito."]];
  er.forEach((e,i)=>{
    const y = 1.4 + i*1.05;
    card(pres,s,0.5,y,9,0.92);
    s.addText(e[0],{isTextBox:true,x:0.75,y,w:3.0,h:0.92,fontFace:BF,fontSize:18,color:MUTE,strike:"sngStrike",margin:0,valign:"middle"});
    s.addText("→",{isTextBox:true,x:3.6,y,w:0.4,h:0.92,fontFace:BF,fontSize:18,color:MUTE,margin:0,valign:"middle"});
    s.addText(e[1],{isTextBox:true,x:4.0,y,w:2.5,h:0.92,fontFace:BF,fontSize:18,bold:true,color:YEL,margin:0,valign:"middle"});
    T(s,e[2],{x:6.4,y,w:2.95,h:0.92,base:{fontSize:13,color:MUTE},valign:"middle"});
  });
  card(pres,s,0.5,4.55,9,0.55,CARD2,"Culture corner");
  T(s,"🌎 *Culture Corner:* \"How are you?\" é só uma saudação. A resposta comum é *Fine, thanks. And you?*",{x:0.7,y:4.55,w:8.6,h:0.55,base:{fontSize:13},valign:"middle"});
  s.addNotes("Estes são os erros mais comuns de brasileiros nesta unidade. Peça ao aluno que leia a versão errada e corrija em voz alta antes de revelar a versão certa. Culture Corner: em inglês, 'How are you?' é um cumprimento; ninguém espera uma resposta longa.");

  // 13. EXERCISE A
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"5 · EXERCISES", "A · COMPLETE THE GAPS");
  ["am","are","Are","'m not","aren't"].forEach((w,i)=>pill(pres,s,0.5+i*1.25,1.3,1.1,0.32,i%2?BLUE:YEL,w,NAVY,13));
  ["Hello! I _____ Tom.","You _____ a teacher.","_____ you Brazilian?","Yes, I _____.","I _____ from Japan. (negative)","You _____ American. (negative)"].forEach((q,i)=>{
    const col = i%2, row = Math.floor(i/2);
    const x = 0.5 + col*4.6, y = 1.85 + row*1.05;
    card(pres,s,x,y,4.4,0.9);
    circle(pres,s,x+0.15,y+0.22,0.46,YEL,i+1,NAVY,14);
    s.addText(q,{isTextBox:true,x:x+0.8,y,w:3.5,h:0.9,fontFace:BF,fontSize:15,color:WHITE,margin:0,valign:"middle"});
  });
  s.addNotes("Escolha as palavras do quadro. Gabarito no fim do capítulo: 1 am · 2 are · 3 Are · 4 am · 5 'm not · 6 aren't.");

  // 14. EXERCISE B
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"5 · EXERCISES", "B · PUT THE WORDS IN ORDER");
  [["name / is / My / Ana","My name is Ana."],["you / Are / Brazilian / ?","Are you Brazilian?"],["from / I'm / Canada","I'm from Canada."],["to / meet / Nice / you","Nice to meet you."]].forEach((q,i)=>{
    const y = 1.45 + i*0.9;
    card(pres,s,0.5,y,9,0.78);
    circle(pres,s,0.65,y+0.16,0.46,YEL,i+1,NAVY,14);
    s.addText(q[0],{isTextBox:true,x:1.35,y,w:3.6,h:0.78,fontFace:BF,fontSize:16,bold:true,color:WHITE,margin:0,valign:"middle"});
    s.addText("→",{isTextBox:true,x:4.9,y,w:0.4,h:0.78,fontFace:BF,fontSize:16,color:MUTE,margin:0,valign:"middle"});
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:5.4,y:y+0.14,w:3.8,h:0.5,rectRadius:0.1,fill:{color:NAVY},line:{color:MUTE,width:1,dashType:"dash"},objectName:"Answer line"});
  });
  s.addNotes("Gabarito: My name is Ana. / Are you Brazilian? / I'm from Canada. / Nice to meet you. Lembre ao aluno de começar com letra maiúscula e terminar com ponto ou interrogação.");

  // 15. EXERCISE C
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"5 · EXERCISES", "C · REWRITE THE SENTENCES");
  [["You are a student.","question","Are you a student?"],["I'm a doctor.","negative","I'm not a doctor."],["You're from Japan.","question","Are you from Japan?"],["You are Tom.","negative","You aren't Tom."]].forEach((q,i)=>{
    const y = 1.45 + i*0.9;
    card(pres,s,0.5,y,9,0.78);
    circle(pres,s,0.65,y+0.16,0.46,YEL,i+1,NAVY,14);
    s.addText(q[0],{isTextBox:true,x:1.35,y,w:3.0,h:0.78,fontFace:BF,fontSize:16,bold:true,color:WHITE,margin:0,valign:"middle"});
    pill(pres,s,4.3,y+0.22,1.2,0.34,q[1]==="question"?BLUE:MINT,q[1].toUpperCase(),NAVY,11);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:5.7,y:y+0.14,w:3.5,h:0.5,rectRadius:0.1,fill:{color:NAVY},line:{color:MUTE,width:1,dashType:"dash"},objectName:"Answer line"});
  });
  s.addNotes("Gabarito: 1 Are you a student? · 2 I'm not a doctor. · 3 Are you from Japan? · 4 You aren't Tom. (ou You're not Tom.)");

  // 16. SPEAKING
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"6 · SPEAKING", "MEET A NEW CLASSMATE");
  T(s,"Em duplas, faça um diálogo de 1 minuto. Use as frases ao lado.",{x:0.5,y:1.3,w:9,h:0.3,base:{fontSize:15,color:MUTE}});
  [["Greet","Hello! / Good morning!"],["Ask the name","What's your name?"],["Spell it","How do you spell your name?"],["Ask about origin","Are you from …? / Where are you from?"],["Say goodbye","Nice to meet you. See you later!"]].forEach((r,i)=>{
    const y = 1.75 + i*0.68;
    card(pres,s,0.5,y,6.0,0.58);
    circle(pres,s,0.62,y+0.07,0.44,YEL,i+1,NAVY,14);
    s.addText(r[0].toUpperCase(),{isTextBox:true,x:1.25,y,w:1.9,h:0.58,fontFace:HF,fontSize:15,bold:true,color:WHITE,margin:0,valign:"middle"});
    s.addText(r[1],{isTextBox:true,x:3.1,y,w:3.3,h:0.58,fontFace:BF,fontSize:14,italic:true,color:MUTE,margin:0,valign:"middle"});
  });
  card(pres,s,6.7,1.75,2.8,3.3);
  s.addText("SELF-CHECK",{isTextBox:true,x:6.9,y:1.9,w:2.4,h:0.3,fontFace:BF,fontSize:11,bold:true,color:YEL,charSpacing:3,margin:0});
  ["Usei I'm / You're","Fiz uma pergunta","Soletrei meu nome","Falei devagar e claro"].forEach((c,i)=>{
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:6.9,y:2.4+i*0.62,w:0.3,h:0.3,rectRadius:0.06,fill:{color:NAVY},line:{color:YEL,width:1.5},objectName:"Checkbox"});
    s.addText(c,{isTextBox:true,x:7.35,y:2.35+i*0.62,w:2.05,h:0.4,fontFace:BF,fontSize:14,color:WHITE,margin:0,valign:"middle"});
  });
  s.addNotes("Deixe o aluno praticar 2 vezes. Na 1ª, com as frases à vista; na 2ª, sem olhar. Corrija só os erros que atrapalham a comunicação e use o checklist de autoavaliação. Se o aluno estiver sozinho, o professor faz o papel do colega.");

  // 17. WRITING
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"6 · WRITING", "MY INTRODUCTION CARD");
  T(s,"Complete o cartão com seus dados (30 a 40 palavras).",{x:0.5,y:1.3,w:9,h:0.3,base:{fontSize:15,color:MUTE}});
  card(pres,s,0.5,1.8,9,3.2);
  ["Hello! My name is _____________.","I'm from ______________. I'm ______________. (nationality)","I'm a ______________.","Nice to meet you!"].forEach((l,i)=>{
    s.addText(l,{isTextBox:true,x:0.9,y:2.0+i*0.7,w:8.2,h:0.55,fontFace:BF,fontSize:18,color:WHITE,margin:0,valign:"middle",bold:i===3,fill:undefined});
  });
  s.addNotes("Peça que o aluno escreva à mão ou digite. Depois ele lê o cartão em voz alta. Dica: o texto de cima serve como modelo; incentive-o a acrescentar mais uma informação (idade, cidade).");

  // 18. WRAP-UP
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, K+"WRAP-UP", "CAN YOU DO IT?");
  card(pres,s,0.5,1.4,5.6,3.65);
  ["Cumprimentar (Hello, Good morning)","Dizer e perguntar o nome","Dizer de onde sou e o que faço","Soletrar meu nome"].forEach((c,i)=>{
    const y = 1.6 + i*0.8;
    s.addText(c,{isTextBox:true,x:0.75,y,w:3.3,h:0.6,fontFace:BF,fontSize:14,color:WHITE,margin:0,valign:"middle"});
    ["✓","~","✗"].forEach((m,j)=>pill(pres,s,4.2+j*0.6,y+0.12,0.5,0.36,[MINT,YEL,"F08A80"][j],m,NAVY,14));
  });
  card(pres,s,6.3,1.4,3.2,2.1);
  s.addText("WORDS I LEARNED",{isTextBox:true,x:6.5,y:1.55,w:2.8,h:0.3,fontFace:BF,fontSize:11,bold:true,color:YEL,charSpacing:3,margin:0});
  s.addText("Escreva as 3 palavras que você mais gostou:\n1. __________\n2. __________\n3. __________",{isTextBox:true,x:6.5,y:1.95,w:2.8,h:1.4,fontFace:BF,fontSize:14,color:WHITE,margin:0,valign:"top"});
  card(pres,s,6.3,3.7,3.2,1.35,YEL,"Next");
  s.addText("NEXT: UNIT 2\nWhere are you from?",{isTextBox:true,x:6.5,y:3.7,w:2.8,h:1.35,fontFace:HF,fontSize:18,bold:true,color:NAVY,margin:0,valign:"middle"});
  s.addNotes("Peça ao aluno para marcar ✓ (consigo), ~ (mais ou menos) ou ✗ (ainda não). Para os itens com ~ ou ✗, sugira rever a seção correspondente em casa. Tarefa: gravar um áudio de 30 segundos se apresentando.");

  // 19. ANSWER KEY
  s = pres.addSlide({ masterName: "CONTENT" });
  header(s, "APPENDIX", "ANSWER KEY");
  const key = [["True or False","1 F · 2 T · 3 T · 4 F"],["A · Gaps","1 am · 2 are · 3 Are · 4 am · 5 'm not · 6 aren't"],["B · Order","My name is Ana. / Are you Brazilian? / I'm from Canada. / Nice to meet you."],["C · Rewrite","Are you a student? / I'm not a doctor. / Are you from Japan? / You aren't (You're not) Tom."]];
  key.forEach((k,i)=>{
    const y = 1.4 + i*0.9;
    card(pres,s,0.5,y,9,0.78);
    s.addText(k[0].toUpperCase(),{isTextBox:true,x:0.75,y,w:1.9,h:0.78,fontFace:HF,fontSize:16,bold:true,color:YEL,margin:0,valign:"middle"});
    s.addText(k[1],{isTextBox:true,x:2.7,y,w:6.6,h:0.78,fontFace:BF,fontSize:14,color:WHITE,margin:0,valign:"middle"});
  });
  s.addNotes("Gabarito completo da unidade.");

  await pres.writeFile({ fileName: "Book1_Unit01.pptx" });
  console.log("done");
})();
