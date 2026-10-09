const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const NAVY="001737", YEL="FFCD04", CARD="243853", CARD2="3A4E6B", BLUE="7CC4FF", MINT="7EE0B8", LILAC="C4B5FD", MUTE="A9B6C9", WHITE="FFFFFF";
const HF="Arial Narrow", BF="Calibri";

async function icon(Comp, color="#001737") {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, {color, size: 256}));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
function newPres() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Raul Pivoto"; pres.company = "The English Skyrocket";
  pres.defineSlideMaster({ title: "COVER", background: { color: NAVY } });
  pres.defineSlideMaster({ title: "CONTENT", background: { color: NAVY },
    objects: [{ text: { text: "ENGLISH SKYROCKET", options: { x: 6.5, y: 5.25, w: 3, h: 0.25, fontSize: 9, bold: true, color: YEL, align: "right", charSpacing: 3, fontFace: HF, margin: 0 } } }],
    slideNumber: { x: 0.5, y: 5.25, w: 0.6, h: 0.25, color: MUTE, fontSize: 9, fontFace: BF } });
  return pres;
}
// "*word*" -> highlighted run
function runs(str, base, hlColor=YEL) {
  return str.split("*").map((t,i)=>({ text:t, options: Object.assign({}, base, i%2 ? {bold:true,color:hlColor} : {}) })).filter(r=>r.text!=="");
}
function T(s, str, o) { // text box with *highlight*
  const base = Object.assign({fontFace:BF,fontSize:14,color:WHITE,margin:0,valign:"top"}, o.base||{});
  const opts = Object.assign({isTextBox:true,margin:0}, o); delete opts.base;
  s.addText(runs(str, base, o.hl||YEL), opts);
}
function header(s, kicker, title) {
  s.addText(kicker, { isTextBox:true, x:0.5,y:0.28,w:9,h:0.25, fontFace:BF,fontSize:11,bold:true,color:YEL,charSpacing:3,margin:0, objectName:"Kicker" });
  s.addText(title, { isTextBox:true, x:0.5,y:0.55,w:9,h:0.65, fontFace:HF,fontSize:30,bold:true,color:WHITE,margin:0,valign:"middle", objectName:"Title" });
}
function card(pres, s, x,y,w,h, fill=CARD, name="Card") {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x,y,w,h, rectRadius:0.1, fill:{color:fill}, line:{color:fill,width:0}, objectName:name });
}
function circle(pres, s, x,y,d, fill, txt, txtColor=NAVY, fs=16) {
  s.addShape(pres.shapes.OVAL, { x,y,w:d,h:d, fill:{color:fill}, line:{color:fill,width:0}, objectName:"Badge" });
  if (txt!==undefined) s.addText(String(txt), { isTextBox:true, x,y,w:d,h:d, align:"center", valign:"middle", fontFace:BF, fontSize:fs, bold:true, color:txtColor, margin:0 });
}
function pill(pres, s, x,y,w,h, fill, txt, txtColor=NAVY, fs=11) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x,y,w,h, rectRadius:h/2, fill:{color:fill}, line:{color:fill,width:0}, objectName:"Pill" });
  s.addText(txt, { isTextBox:true, x,y,w,h, align:"center", valign:"middle", fontFace:BF, fontSize:fs, bold:true, color:txtColor, margin:0 });
}
module.exports = { pptxgen, newPres, icon, runs, T, header, card, circle, pill, NAVY, YEL, CARD, CARD2, BLUE, MINT, LILAC, MUTE, WHITE, HF, BF };
