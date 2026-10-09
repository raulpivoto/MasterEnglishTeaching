const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const C = { NAVY:"001737", YEL:"FFCD04", YELT:"FFF4BF", BLUE:"7CC4FF", BLUET:"E6F3FF", MINT:"7EE0B8", MINTT:"E2F7EE", LILAC:"C4B5FD", LILT:"EFEAFE", RED:"E5574B", GREY:"5B6B82", LINE:"D5DCE8", PANEL:"F3F6FB", WHITE:"FFFFFF" };
const HF="Arial Narrow", BF="Calibri";

async function icon(name, color="#001737") {
  const svg = RDS.renderToStaticMarkup(React.createElement(fa[name], {color, size: 256}));
  return "image/png;base64," + (await sharp(Buffer.from(svg)).png().toBuffer()).toString("base64");
}
async function svg2png(svg, w=600) { return "image/png;base64," + (await sharp(Buffer.from(svg)).resize({width:w}).png().toBuffer()).toString("base64"); }

// ---- flat avatars ----
function avatar({skin, hair, shirt, bg="#E6F3FF", style="short", beard=false, glasses=false}) {
  const back = style==="long" ? `<ellipse cx="150" cy="135" rx="68" ry="78" fill="${hair}"/>` : style==="bob" ? `<path d="M80 150 Q78 60 150 58 Q222 60 220 150 L205 160 L95 160Z" fill="${hair}"/>` : "";
  const top = style==="bob" ? `<path d="M96 112 Q100 62 150 62 Q200 62 204 112 Q170 92 96 112Z" fill="${hair}"/>`
            : `<path d="M96 118 Q92 58 150 56 Q208 58 204 118 Q190 84 150 84 Q110 84 96 118Z" fill="${hair}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><circle cx="150" cy="150" r="150" fill="${bg}"/>
  <clipPath id="c"><circle cx="150" cy="150" r="150"/></clipPath><g clip-path="url(#c)">
  <path d="M40 320 Q45 215 150 205 Q255 215 260 320Z" fill="${shirt}"/>
  <rect x="132" y="170" width="36" height="45" rx="14" fill="${skin}"/>
  ${back}
  <ellipse cx="150" cy="122" rx="52" ry="58" fill="${skin}"/>
  ${beard?`<path d="M100 135 Q102 190 150 192 Q198 190 200 135 Q190 165 150 165 Q110 165 100 135Z" fill="${hair}"/>`:""}
  ${top}
  <circle cx="130" cy="125" r="5" fill="#1A2233"/><circle cx="170" cy="125" r="5" fill="#1A2233"/>
  ${glasses?`<circle cx="130" cy="125" r="14" fill="none" stroke="#1A2233" stroke-width="3"/><circle cx="170" cy="125" r="14" fill="none" stroke="#1A2233" stroke-width="3"/><line x1="144" y1="125" x2="156" y2="125" stroke="#1A2233" stroke-width="3"/>`:""}
  <path d="M130 150 Q150 168 170 150" fill="none" stroke="#1A2233" stroke-width="5" stroke-linecap="round"/>
  </g></svg>`;
}
const PEOPLE = {
  ana:  { skin:"#C98F6B", hair:"#2B1B14", shirt:"#FFCD04", style:"long", bg:"#FFF4BF" },
  tom:  { skin:"#F2C9A5", hair:"#6B4A2F", shirt:"#2B6CB0", style:"short", beard:true, bg:"#E6F3FF" },
  yuki: { skin:"#F3D2B3", hair:"#14141C", shirt:"#E5574B", style:"bob", bg:"#FDE8E5" },
  carlos:{ skin:"#A9714E", hair:"#1B120D", shirt:"#2F9E78", style:"short", glasses:true, bg:"#E2F7EE" },
  emma: { skin:"#F7D7BC", hair:"#B5651D", shirt:"#7C5CD6", style:"long", bg:"#EFEAFE" },
};
// ---- flags (3:2) ----
const FLAGS = {
  Brazil: `<rect width="300" height="200" fill="#009C3B"/><polygon points="150,22 276,100 150,178 24,100" fill="#FFDF00"/><circle cx="150" cy="100" r="46" fill="#002776"/><path d="M106 98 Q150 80 194 108" stroke="#fff" stroke-width="7" fill="none"/>`,
  USA: `<rect width="300" height="200" fill="#fff"/>${[0,2,4,6,8,10,12].map(i=>`<rect y="${i*200/13}" width="300" height="${200/13}" fill="#B22234"/>`).join("")}<rect width="130" height="108" fill="#3C3B6E"/>${[0,1,2,3,4].map(r=>[0,1,2,3,4,5].map(c=>`<circle cx="${14+c*21}" cy="${14+r*20}" r="4" fill="#fff"/>`).join("")).join("")}`,
  Canada: `<rect width="300" height="200" fill="#fff"/><rect width="75" height="200" fill="#D80621"/><rect x="225" width="75" height="200" fill="#D80621"/><path d="M150 40 L162 70 L190 62 L178 100 L198 108 L156 128 L156 160 L144 160 L144 128 L102 108 L122 100 L110 62 L138 70Z" fill="#D80621"/>`,
  England: `<rect width="300" height="200" fill="#012169"/><path d="M0 0L300 200M300 0L0 200" stroke="#fff" stroke-width="40"/><path d="M0 0L300 200M300 0L0 200" stroke="#C8102E" stroke-width="14"/><path d="M150 0V200M0 100H300" stroke="#fff" stroke-width="66"/><path d="M150 0V200M0 100H300" stroke="#C8102E" stroke-width="40"/>`,
  Portugal: `<rect width="300" height="200" fill="#FF0000"/><rect width="120" height="200" fill="#006600"/><circle cx="120" cy="100" r="38" fill="#FFD700"/><circle cx="120" cy="100" r="22" fill="#fff"/><circle cx="120" cy="100" r="13" fill="#C8102E"/>`,
  Japan: `<rect width="300" height="200" fill="#fff"/><circle cx="150" cy="100" r="58" fill="#BC002D"/>`,
};
function flag(n){ return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><clipPath id="r"><rect width="300" height="200" rx="14"/></clipPath><g clip-path="url(#r)">${FLAGS[n]}</g><rect x="1" y="1" width="298" height="198" rx="14" fill="none" stroke="#C9D2E0" stroke-width="3"/></svg>`; }

function newPres() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; pres.author = "Raul Pivoto"; pres.company = "The English Skyrocket";
  pres.defineSlideMaster({ title: "PAGE", background: { color: "FFFFFF" },
    objects: [{ text: { text: "THE ENGLISH SKYROCKET  ·  BOOK 1  ·  A1", options: { x: 0.5, y: 5.3, w: 5, h: 0.22, fontSize: 9, bold: true, color: C.GREY, charSpacing: 2, fontFace: BF, margin: 0 } } }],
    slideNumber: { x: 9.0, y: 5.3, w: 0.5, h: 0.22, color: C.GREY, fontSize: 10, bold: true, align: "right", fontFace: BF } });
  pres.defineSlideMaster({ title: "COVER", background: { color: "FFFFFF" } });
  return pres;
}
function runs(str, base, hl) { return str.split("*").map((t,i)=>({ text:t, options: Object.assign({}, base, i%2 ? {bold:true,color:hl} : {}) })).filter(r=>r.text!==""); }
function T(s, str, o={}) {
  const base = Object.assign({fontFace:BF,fontSize:14,color:C.NAVY,margin:0,valign:"top"}, o.base||{});
  const opts = Object.assign({isTextBox:true,margin:0,valign:"top"}, o); delete opts.base; delete opts.hl;
  s.addText(runs(str, base, o.hl||"B45309"), opts);
}
function tab(pres, s, num, label) { // section tab, e.g. "1  WARM-UP"
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.5,y:0.3,w:0.34,h:0.3,rectRadius:0.06,fill:{color:C.NAVY},line:{color:C.NAVY,width:0},objectName:"Section number"});
  s.addText(String(num),{isTextBox:true,x:0.5,y:0.3,w:0.34,h:0.3,align:"center",valign:"middle",fontFace:BF,fontSize:13,bold:true,color:C.YEL,margin:0});
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:0.88,y:0.3,w:2.3,h:0.3,rectRadius:0.06,fill:{color:C.YEL},line:{color:C.YEL,width:0},objectName:"Section tab"});
  s.addText(label.toUpperCase(),{isTextBox:true,x:0.88,y:0.3,w:2.3,h:0.3,align:"center",valign:"middle",fontFace:BF,fontSize:11,bold:true,color:C.NAVY,charSpacing:2,margin:0});
}
function title(s, str) { s.addText(str,{isTextBox:true,x:0.5,y:0.68,w:9,h:0.55,fontFace:HF,fontSize:30,bold:true,color:C.NAVY,margin:0,valign:"middle",objectName:"Title"}); }
function head(pres,s,num,label,ttl){ tab(pres,s,num,label); title(s,ttl); }
function box(pres,s,x,y,w,h,fill=C.PANEL,line=C.LINE,name="Box"){ s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h,rectRadius:0.1,fill:{color:fill},line:{color:line,width:1},objectName:name}); }
function dot(pres,s,x,y,d,fill,txt,tc=C.NAVY,fs=13){ s.addShape(pres.shapes.OVAL,{x,y,w:d,h:d,fill:{color:fill},line:{color:fill,width:0},objectName:"Badge"}); if(txt!==undefined) s.addText(String(txt),{isTextBox:true,x,y,w:d,h:d,align:"center",valign:"middle",fontFace:BF,fontSize:fs,bold:true,color:tc,margin:0}); }
function pill(pres,s,x,y,w,h,fill,txt,tc=C.NAVY,fs=11){ s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w,h,rectRadius:h/2,fill:{color:fill},line:{color:fill,width:0},objectName:"Pill"}); s.addText(txt,{isTextBox:true,x,y,w,h,align:"center",valign:"middle",fontFace:BF,fontSize:fs,bold:true,color:tc,margin:0}); }
function exHead(pres,s,x,y,letter,instr,w=8.5){ // exercise letter + instruction
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w:0.34,h:0.34,rectRadius:0.06,fill:{color:C.NAVY},line:{color:C.NAVY,width:0},objectName:"Exercise letter"});
  s.addText(letter,{isTextBox:true,x,y,w:0.34,h:0.34,align:"center",valign:"middle",fontFace:BF,fontSize:14,bold:true,color:C.YEL,margin:0});
  T(s,instr,{x:x+0.45,y:y-0.02,w,h:0.38,base:{fontSize:15,bold:true},valign:"middle"});
}
function audio(pres,s,x,y,n,iconData){ pill(pres,s,x,y,0.95,0.32,C.NAVY,"      "+n,C.YEL,12); s.addImage({data:iconData,x:x+0.14,y:y+0.07,w:0.18,h:0.18,altText:"Audio"}); }
function line(pres,s,x,y,w){ s.addShape(pres.shapes.LINE,{x,y,w,h:0,line:{color:"9AA7BD",width:1,dashType:"dash"}}); }
function note(pres,s,x,y,w,h,label,txt,fill=C.YELT){ box(pres,s,x,y,w,h,fill,fill==C.YELT?"F2D869":C.LINE,"Tip box"); pill(pres,s,x+0.15,y-0.14,1.0,0.28,C.YEL,label,C.NAVY,10); T(s,txt,{x:x+0.2,y:y+0.17,w:w-0.4,h:h-0.22,base:{fontSize:13}}); }
module.exports = { pptxgen, newPres, icon, svg2png, avatar, PEOPLE, flag, runs, T, head, tab, title, box, dot, pill, exHead, audio, line, note, C, HF, BF };
