import * as THREE from 'three';
import {PLACES} from './LifeWorldContent';
import {EXHIBITS} from './LifeWorldExhibitData';

/* DELIVERY D — physical exhibits inside the existing buildings.
 * Every target has an actual counterpart in the React popup. The tiny screen
 * illustrations are authored canvas graphics, NOT screenshots of the projects.
 */
const palette={ink:0x09263a,cyan:0x21b9d5,cream:0xf4faf6,amber:0xf9bb73,green:0x54dcb4,metal:0x7daabc};
const m=(c,metalness=.15,roughness=.55)=>new THREE.MeshStandardMaterial({color:c,metalness,roughness});
function box(parent,x,y,z,w,h,d,material){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
function cyl(parent,x,y,z,r,h,material){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,20),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
function localWorld(place,x,z){const yaw=place.yaw||0;return {x:place.x+x*Math.cos(yaw)+z*Math.sin(yaw),z:place.z-x*Math.sin(yaw)+z*Math.cos(yaw)};}
function displayTexture(zone,entry,index,lang){
 const canvas=document.createElement('canvas');canvas.width=768;canvas.height=480;
 const ctx=canvas.getContext('2d');const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
 const draw=(isActive=false,language=lang,override=null)=>{
  const title=((override||entry).name[language]||(override||entry).name.en);
  ctx.clearRect(0,0,768,480);
  const gradient=ctx.createLinearGradient(0,0,768,480);gradient.addColorStop(0,isActive?'#135d78':'#0b2b42');gradient.addColorStop(1,'#041726');
  ctx.fillStyle=gradient;ctx.fillRect(0,0,768,480);
  ctx.fillStyle='#4ee3ee';ctx.fillRect(36,38,112,7);ctx.fillStyle='#d5f6fa';ctx.font='700 22px monospace';ctx.fillText(`LER / ${zone.toUpperCase()}`,36,86);
  ctx.fillStyle='#e8fafc';ctx.font='800 37px system-ui, Arial';
  let text=title;
  while(ctx.measureText(text).width>690 && text.length>9){text=text.slice(0,-2);}
  ctx.fillText(text,36,154);
  if(zone==='projects'||zone==='capabilities'){
   ctx.fillStyle='#17495c';ctx.fillRect(36,190,438,226);
   ctx.fillStyle='#0b3248';ctx.fillRect(50,210,408,28);ctx.fillStyle='#55cfdf';ctx.fillRect(66,221,118,6);
   for(let i=0;i<4;i++){ctx.fillStyle=i===index%4?'#66e1dd':'#2f7a91';ctx.fillRect(60+i*97,263,82,70);}
   for(let i=0;i<3;i++){ctx.fillStyle='#78adba';ctx.fillRect(62,357+i*16,340-i*75,5);}
   ctx.strokeStyle='#82dce8';ctx.lineWidth=4;ctx.strokeRect(502,190,214,226);
   ctx.fillStyle='#ffa85e';ctx.fillRect(518,342,178,7);
   ctx.fillStyle='#84eced';for(let i=0;i<4;i++)ctx.fillRect(521+i*43,320-(i%2)*34,26,20+(i%3)*16);
  }else if(zone==='studio'){
   ctx.fillStyle='#0b3347';ctx.fillRect(36,196,680,126);
   for(let i=0;i<4;i++){ctx.fillStyle=['#31a7bf','#f8b46e','#5fcf9d','#287aaf'][i];ctx.fillRect(53+i*165,218,145,86);}
   ctx.fillStyle='#173b52';ctx.fillRect(36,337,680,75);
   for(let i=0;i<19;i++){ctx.fillStyle=i===index+6?'#f5bd72':'#528b9a';ctx.fillRect(47+i*35,351+(i%3)*8,26,32);}
  }else if(zone==='heritage'){
   ctx.strokeStyle='#3ed0d5';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(90,285);ctx.bezierCurveTo(210,190,300,365,395,245);ctx.bezierCurveTo(460,184,520,300,640,226);ctx.stroke();
   for(let i=0;i<6;i++){let x=90+i*104,y=275+Math.sin(i*2)*35;ctx.beginPath();ctx.fillStyle=i===index?'#ffc778':'#71d9e3';ctx.arc(x,y,12,0,Math.PI*2);ctx.fill();}
   ctx.fillStyle='#93dbe4';ctx.font='700 18px monospace';ctx.fillText('VIDEO / CULTURE / TRAVEL',60,406);
  }else{
   for(let i=0;i<4;i++){ctx.fillStyle=i===index?'#e8b17c':'#528fa2';ctx.fillRect(60+i*165,216,122,139);}
   ctx.fillStyle='#d5e9ed';ctx.font='700 22px monospace';ctx.fillText('CREDENTIALS / PROFESSIONAL',48,406);
  }
  ctx.fillStyle=isActive?'#ffcf90':'#6ce2eb';ctx.font='800 19px monospace';ctx.fillText(isActive?'● SELECTED':'◇ INTERACT',36,451);
  tex.needsUpdate=true;
 };
 draw(false,lang);return {texture:tex,draw};
}
export default function createInteractiveExhibits({scene,built,lang='en'}){
 const targets=[],stations=[],displays=[],animated=[],groups={};
 const main=m(palette.ink,.36,.37),frame=m(palette.metal,.51,.3),accent=m(palette.cyan,.25,.34),warm=m(palette.amber,.12,.4);
 const layouts={capabilities:[-4.25,0,4.25],projects:[-4.4,0,4.4],credentials:[-5.3,-1.75,1.75,5.3],studio:[-5.35,-1.78,1.78,5.35],heritage:[-5.1,-1.7,1.7,5.1]};
 const indexByZone={};
 for(const zone of Object.keys(layouts)){
  const root=built[zone];if(!root)continue;
  const place=PLACES.find(p=>p.id===zone),xs=layouts[zone],entries=EXHIBITS[zone]||[];
  const group=new THREE.Group();root.add(group);groups[zone]=group;indexByZone[zone]=0;
  xs.forEach((x,i)=>{
   const entry=entries[i];if(!entry)return;
   const w=zone==='credentials'?2.75:(zone==='heritage'?2.85:(zone==='studio'?3.0:3.45));
   const z=zone==='heritage'?-2.25:-2.95;
   // Recessed screens have real per-exhibit click targets and are placed INSIDE.
   box(group,x,2.02,z-.13,w+.30,2.60,.22,main);
   box(group,x,2.02,z,w+.12,2.42,.07,frame);
   const {texture,draw}=displayTexture(zone,entry,i,lang);
   const face=new THREE.Mesh(new THREE.PlaneGeometry(w,2.24),new THREE.MeshBasicMaterial({map:texture,side:THREE.FrontSide}));
   face.position.set(x,2.03,z+.048);face.userData.interactionId=`exhibit:${zone}:${i}`;
   group.add(face);targets.push(face);
   const led=box(group,x,.72,z+.65,w*.86,.10,1.02,m(palette.cream,.08,.53));led.castShadow=false;
   const border=box(group,x,3.39,z,w+.36,.035,.09,i===0?warm:accent);border.castShadow=false;
   const at=localWorld(place,x,z+1.80);
   stations.push({id:`exhibit:${zone}:${i}`,x:at.x,z:at.z,type:'exhibit'});
   displays.push({zone,i,draw});
  });
 }
 // Physical rotating visualization specimen in the Capabilities Plaza.
 const plaza=built.capabilities;
 if(plaza){const specimen=new THREE.Group();specimen.position.set(0,1.35,2.5);plaza.add(specimen);
  const shell=new THREE.Mesh(new THREE.IcosahedronGeometry(.61,1),new THREE.MeshStandardMaterial({color:0x44d4e6,metalness:.62,roughness:.26,wireframe:true}));specimen.add(shell);
  const core=new THREE.Mesh(new THREE.OctahedronGeometry(.27),new THREE.MeshStandardMaterial({color:0xfbbd76,emissive:0x9c5d20,emissiveIntensity:.5}));specimen.add(core);
  animated.push(specimen);cyl(plaza,0,.72,2.5,.9,.20,main);
 }
 // Contact is a kiosk with clear, recognizable on-campus entrances to REAL links.
 const contact=built.contact;
 if(contact){const info=new THREE.Group();contact.add(info);
  ['EMAIL','WHATSAPP','LINKEDIN'].forEach((label,i)=>{
   const x=(i-1)*3.2;
   box(info,x,1.55,0.8,2.90,2.12,.17,main);
   const t={name:{en:label,es:label}};
   const {texture}=displayTexture('credentials',t,i,lang);
   const plane=new THREE.Mesh(new THREE.PlaneGeometry(2.70,1.88),new THREE.MeshBasicMaterial({map:texture}));plane.position.set(x,1.57,.92);
   plane.userData.interactionId='contact';info.add(plane);targets.push(plane);
  });
 }
 function setSelected(zone,index){indexByZone[zone]=index;displays.forEach(d=>{if(d.zone!==zone)return;const featured=zone==='heritage'&&index>=layouts.heritage.length&&d.i===0;d.draw(d.i===index||featured,lang,featured?EXHIBITS.heritage[index]:null);});}
 for(const zone of Object.keys(layouts))setSelected(zone,0);
 return {targets,stations,setSelected,
  setLanguage(language){lang=language;for(const item of displays){const opts=EXHIBITS[item.zone]||[];item.draw(item.i===indexByZone[item.zone],language);}
   // Replacing canvases is not necessary; titles are refreshed when language changes through texture callback.
  },
  update(dt,time,reduced){if(!reduced)animated.forEach(g=>{g.rotation.y+=dt*.23;g.position.y=1.35+Math.sin(time*.8)*.09;});}
 };
}
