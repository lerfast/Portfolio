import * as THREE from 'three';
import {PLACES, RISKS, CAMPUS_PATHS, placeEntrance, labelFor} from './LifeWorldContent';
import createInteractiveExhibits from './createInteractiveExhibits';
import createSafetyCenter from './createSafetyCenter';

/* ITERACIÓN 2 / ENTREGA B
   The scenery is a synthetic Three.js campus, NOT a Gaussian Splatting capture.
   A single geometric source defines its layout, entrances, signs and interactions. */
const C={foundation:0xe8e6d9,pavement:0xf3eee0,walk:0xc5e0dc,edging:0x4da5b5,ink:0x0b354e,
  glass:0x86cdd4,ice:0x27b8d3,wood:0xd0a174,gold:0xf2b85a,white:0xfffcf4,
  foliage:0x2c9279,grass:0x79c3a1,planter:0x266c6e,asphalt:0x2b6d81,steel:0x91adbb,
  warn:0xe28a4c,slate:0x25556c};
const M={};
function material(hex,metal=.06,rough=.76){const key=`${hex}/${metal}/${rough}`;if(!M[key]) M[key]=new THREE.MeshStandardMaterial({color:hex,metalness:metal,roughness:rough});return M[key];}
const glassMat=new THREE.MeshPhysicalMaterial({color:C.glass,metalness:.14,roughness:.17,transparent:true,opacity:.31,depthWrite:false,side:THREE.DoubleSide});
const screenMat=new THREE.MeshStandardMaterial({color:0x11546e,metalness:.18,roughness:.30,emissive:0x1586ab,emissiveIntensity:.46});
function cube(parent,pos,size,mat,shadows=true){const m=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);m.position.set(...pos);m.castShadow=shadows;m.receiveShadow=true;parent.add(m);return m;}
function cyl(parent,pos,r,h,mat,n=20){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),mat);m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function sphere(parent,pos,r,mat,n=12){const m=new THREE.Mesh(new THREE.SphereGeometry(r,n,10),mat);m.position.set(...pos);m.castShadow=true;parent.add(m);return m;}
function line(parent,one,two,r,mat){const a=new THREE.Vector3(...one),b=new THREE.Vector3(...two),delta=b.clone().sub(a);const body=cyl(parent,a.add(b).multiplyScalar(.5).toArray(),r,delta.length(),mat,7);body.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return body;}
function ring(parent,pos,r,t,m){const obj=new THREE.Mesh(new THREE.TorusGeometry(r,t,8,52),m);obj.position.set(...pos);parent.add(obj);return obj;}
function textTexture(text,size=64){const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d');
 ctx.clearRect(0,0,1024,256);ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ffffff';
 const parts=text.split(' ');let rows=[text];ctx.font=`800 ${size}px system-ui,Arial`;
 if(ctx.measureText(text).width>905&&parts.length>1){let left=[],right=[],score=Infinity;for(let i=1;i<parts.length;i++){
  const a=parts.slice(0,i).join(' '),b=parts.slice(i).join(' '),diff=Math.abs(ctx.measureText(a).width-ctx.measureText(b).width);
  if(diff<score){score=diff;left=[a];right=[b];}
 }rows=[...left,...right];}
 if(rows.length>1){ctx.font=`800 ${Math.min(size,49)}px system-ui,Arial`;ctx.fillText(rows[0],512,95,900);ctx.fillText(rows[1],512,164,900);}else ctx.fillText(text,512,132,915);
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;return tex;
}
function textSign(parent,pos,text,w=9,face=0){const back=cube(parent,[pos[0]-Math.sin(face)*.08,pos[1],pos[2]-Math.cos(face)*.08],[w,2.15,.22],material(C.ink,.32,.32));back.rotation.y=face;
 const board=new THREE.Mesh(new THREE.PlaneGeometry(w-.20,1.96),new THREE.MeshBasicMaterial({map:textTexture(text),transparent:true,side:THREE.FrontSide,depthWrite:false}));
 board.position.set(pos[0]+Math.sin(face)*.055,pos[1],pos[2]+Math.cos(face)*.055);board.rotation.y=face;parent.add(board);
 // Only the FRONT of the lettering is rendered. Never show mirrored text through the building.
 return {board,update(value){const old=board.material.map;board.material.map=textTexture(value);board.material.needsUpdate=true;old.dispose();}};
}
function ellipseWalk(parent,a,b,width=4.2){const aa=new THREE.Vector3(a[0],0,a[1]),bb=new THREE.Vector3(b[0],0,b[1]);const d=aa.distanceTo(bb),mid=aa.add(bb).multiplyScalar(.5);if(d<.2)return;
 const tile=cube(parent,[mid.x,.085,mid.z],[width,.17,d],material(C.pavement),false);
 tile.rotation.y=Math.atan2(b[0]-a[0],b[1]-a[1]);
 const borderMaterial=material(C.edging,.12,.52);
 for(const s of [-1,1]){const edge=cube(parent,[mid.x,.17,mid.z],[.11,.10,d],borderMaterial,false);edge.rotation.y=tile.rotation.y;
  edge.position.x+=Math.cos(tile.rotation.y)*s*width*.49;edge.position.z-=Math.sin(tile.rotation.y)*s*width*.49;}
}
function plantTree(parent,x,z,scale=1){const group=new THREE.Group();group.position.set(x,0,z);group.scale.setScalar(scale);parent.add(group);
 cyl(group,[0,1.30,0],.19,2.6,material(0x846247));
 for(const [ox,oy,oz,r] of [[0,3.2,0,1.2],[-.6,2.9,.1,.83],[.7,2.92,.24,.88],[0,3.9,-.12,.83]]){
 const c=sphere(group,[ox,oy,oz],r,material(C.foliage),14);c.scale.y=.80;}
 return group;}
function planter(scene,x,z,length=5,rotation=0){const g=new THREE.Group();scene.add(g);g.position.set(x,0,z);g.rotation.y=rotation;
 cube(g,[0,.38,0],[length,.76,1.55],material(C.planter,.1,.72));cube(g,[0,.81,0],[length-.2,.12,1.40],material(0x3d8c82));
 for(let i=0;i<5;i++){const px=-length*.37+i*length*.185;const s=sphere(g,[px,1.25,.02],.48,material(i%2?0x39aa8e:0x8edab4));s.scale.y=.74;}
}
function streetlight(scene,x,z){const m=material(C.ink,.4,.48);cyl(scene,[x,2.6,z],.105,5.2,m,8);cube(scene,[x+.48,5.11,z],[1.10,.12,.22],m);
 const lens=cube(scene,[x+.92,4.99,z],[.36,.035,.26],new THREE.MeshBasicMaterial({color:0xffdfb4}));lens.castShadow=false;
}
function scenicDrone(g){const drone=new THREE.Group();g.add(drone);const rotors=[];
 cube(drone,[0,0,0],[1.3,.26,.7],material(C.white,.47,.3));cube(drone,[0,-.20,.25],[.58,.2,.25],material(C.ink,.54,.25));
 for(const x of [-1,1])for(const z of [-1,1]){line(drone,[x*.31,.04,z*.17],[x*1.04,.05,z*.87],.08,material(C.steel,.6,.32));cyl(drone,[x*1.04,.12,z*.87],.18,.16,material(C.ink,.7,.3));
 const rotor=new THREE.Group();rotor.position.set(x*1.04,.22,z*.87);drone.add(rotor);cube(rotor,[0,0,0],[.93,.025,.07],material(C.ink),false);cube(rotor,[0,0,0],[.07,.025,.93],material(C.ink),false);rotors.push(rotor);}
 return {group:drone,rotors};}
function globalPoint(place,x,z){const a=place.yaw||0;return {x:place.x+x*Math.cos(a)+z*Math.sin(a),z:place.z-x*Math.sin(a)+z*Math.cos(a)};}
export default function createCampusArchitecture(scene,language='en'){
 const colliders=[],roofs=[],doors=[],labels=[],markers=[],targets=[];
 const built={},accent=material(C.ice,.15,.36),light=material(C.white,.16,.52),dark=material(C.ink,.3,.46);
 const base=material(C.foundation),glass=glassMat;
 const wall=(place,x,z,w,d)=>{const corners=[[x-w/2,z-d/2],[x+w/2,z-d/2],[x-w/2,z+d/2],[x+w/2,z+d/2]].map(([xx,zz])=>globalPoint(place,xx,zz));
  colliders.push({minX:Math.min(...corners.map(p=>p.x)),maxX:Math.max(...corners.map(p=>p.x)),minZ:Math.min(...corners.map(p=>p.z)),maxZ:Math.max(...corners.map(p=>p.z))});};
 const ground=cube(scene,[0,-.65,1],[182,1.12,206],material(0x6bba9c,.02,.91),false);ground.castShadow=false;
 // Small lawn and paved districts: broad circulation so buildings no longer touch each other.
 cube(scene,[0,-.05,0],[167,.12,173],material(0x8fd1ac),false);
 const grid=new THREE.GridHelper(162,54,0xa5dfd6,0x85bfb6);grid.position.y=.025;grid.material.transparent=true;grid.material.opacity=.26;scene.add(grid);
 for(const [x,z,w,d] of [[0,-56,39,32],[0,-22,25,21],[34,-26,27,23],[-34,-26,27,23],[43,15,28,28],[31,50,27,26],[-31,50,27,26],[0,66,26,22]]){
   const slab=cube(scene,[x,.05,z],[w,.12,d],material(C.pavement),false);slab.castShadow=false;
 }
 // Network is physically continuous; bypassing the Capabilities building to reach Oshlix.
 const links=CAMPUS_PATHS;
 links.forEach(([a,b],i)=>ellipseWalk(scene,a,b,i<4?4.9:4.0));
 // Pedestrian plaza: warm stone paving, concentric rings, shallow water and planters.
 const plaza=cyl(scene,[0,.27,0],9.1,.36,material(C.pavement),64);plaza.castShadow=false;
 const plazaRing=ring(scene,[0,.47,0],7.7,.10,material(C.ice,.25,.44));plazaRing.rotation.x=-Math.PI/2;
 cyl(scene,[0,.44,0],3.25,.20,material(0x147e9c,.19,.29),48);
 const water=cyl(scene,[0,.56,0],2.77,.06,new THREE.MeshStandardMaterial({color:0x42d0d8,metalness:.32,roughness:.16,transparent:true,opacity:.76}),48);water.castShadow=false;
 const sculpture=new THREE.Group();scene.add(sculpture);
 for(const [x,z,h] of [[-.64,0,3],[.64,0,3.6],[0,.55,2.6]]){
 const beam=cube(sculpture,[x,.80+h/2,z],[.30,h,.34],material(C.ink,.52,.32));beam.rotation.z=x*.27;}
 const tip=sphere(sculpture,[0,4.9,.33],.34,material(C.gold,.62,.23),20);
 for(let i=0;i<12;i++){const a=i*Math.PI/6;const r=8.5;const p=cube(scene,[Math.sin(a)*r,.5,Math.cos(a)*r],[.30,.04,1.08],material(C.white),false);p.rotation.y=a;}
 // Cinematic arrival through the gateway; the camera animation remains unchanged.
 const portal=new THREE.Group();portal.position.set(0,0,11.0);scene.add(portal);
 for(const x of [-4.25,4.25])cube(portal,[x,3.05,0],[.38,6.1,.66],dark);
 cube(portal,[0,6.02,0],[9,.4,.8],dark);cube(portal,[0,5.72,.35],[8.6,.09,.10],accent);
 const archSign=textSign(portal,[0,7.25,.20],language==='es'?'UNIVERSO DE LUIS EMILIO ROJAS':'LUIS EMILIO ROJAS · UNIVERSE',9.2);
 // Type-specific massing; entrance always on local +Z, pointed toward the principal pedestrian path.
 function build(place){
  const g=new THREE.Group();g.position.set(place.x,0,place.z);g.rotation.y=place.yaw||0;scene.add(g);built[place.id]=g;
  const w=place.width,d=place.depth,primary=place.kind==='primary';const height=primary?8.4:5.8;
  cube(g,[0,.24,0],[w,.38,d],material(0xf4eee0));
  cube(g,[0,height/2,-d/2],[w,height,.4],material(primary?0x11658b:C.ink,.15,.67));wall(place,0,-d/2,w,.48);
  for(const s of [-1,1]){
   cube(g,[s*w/2,height/2,0],[.42,height,d],material(primary?0x7eb5c6:0xc6e0e0,.26,.48));wall(place,s*w/2,0,.48,d);
   const span=(w-4.7)/2,x=s*(w+4.7)/4;
   cube(g,[x,height/2,d/2],[span,height,.36],material(C.foundation,.14,.66));wall(place,x,d/2,span,.40);
   cube(g,[x,height/2,d/2+.23],[Math.max(1,span-.6),height-1,.045],glass,false);
  }
  // Roof has an independent material: fade only when the avatar is INSIDE this building.
  const roof=cube(g,[0,height+.10,0],[w+.8,.28,d+.7],material(primary?0x1b6382:0x559aae,.42,.4).clone());
  roofs.push({roof,place,original:roof.material});
  cube(g,[0,height-.55,d/2+.20],[w,.18,.28],material(C.wood,.3,.36));
  cube(g,[0,.45,d/2+.92],[4.35,.12,2.8],material(C.pavement),false);
  for(const x of [-w/2+1.1,w/2-1.1]){cube(g,[x,1.55,d/2+.38],[.24,2.9,.32],material(C.ink,.2,.45));
   cyl(g,[x,3.0,d/2+.38],.24,.20,material(C.gold,.4,.4));}
  const plaque=textSign(g,[0,height+.79,d/2+.32],place.label[language],Math.min(13,w-1));labels.push({id:place.id,plaque});
  const door=new THREE.Group();door.position.set(0,0,d/2+.11);g.add(door);
  const panels=[];for(const s of [-1,1]){const leaf=cube(door,[s*.89,1.55,0],[1.75,3.1,.10],glassMat.clone());
   cube(leaf,[0,0,.07],[.06,1.5,.045],material(C.steel,.5,.26));panels.push(leaf);}
  doors.push({place,door,panels});
  // Frames visibly distinguish entrance from transparent façade.
  cube(g,[0,3.23,d/2+.21],[4.50,.23,.28],dark);
  for(const s of [-1,1])cube(g,[s*2.22,1.63,d/2+.19],[.20,3.25,.21],dark);
  // Landscape-readable icon / distinct silhouette of each building.
  const emblems={capabilities:'◆',osh:'✚',projects:'{ }',credentials:'◈',studio:'▶',heritage:'◉',contact:'@'};
  const iconText=emblems[place.id]||'◆';
  const icon=textSign(g,[-w/2+1.65,height-1.10,d/2+.33],iconText,2.35);labels.push({id:place.id,plaque:icon,isIcon:true,staticText:iconText});
  for(let i=0;i<Math.min(5,Math.round(w/3));i++){
   const x=-w/2+2.2+i*(w-4.4)/(Math.min(5,Math.round(w/3))-1);
   cube(g,[x,height*.55,-d/2+.28],[1.42,height*.41,.05],glass,false);
  }
  return g;
 }
 PLACES.filter(p=>p.kind!=='outdoor').forEach(build);
 // Architectural identity: Oshlix visibly dominates, software and credentials are clearly different wings.
 const osh=built.osh;
 for(const x of [-8,8]){cube(osh,[x,8.90,0],[2,1.35,17],material(C.foundation,.08,.62));
  for(let i=0;i<7;i++)cube(osh,[x,8.94,-7+i*2.25],[1.25,.30,.04],material(C.ice,.16,.4),false);}
 cube(osh,[0,8.55,-2],[7.0,1.12,6.2],material(C.ice,.32,.36));
 for(const x of [-8.7,8.7])for(const z of [-5,4])cube(osh,[x,7.70,z],[.55,1.2,.7],material(C.gold,.25,.44));
 // Delivery D: real interactive exhibitions replace the blank gallery screens.
 // Their textures are conceptual illustrations. Content links remain verified.
 const exhibits=createInteractiveExhibits({scene,built,lang:language});
 const heritage=built.heritage;
 const ringDisplay=ring(heritage,[0,3.35,1.3],1.30,.15,material(C.gold,.44,.42));ringDisplay.rotation.y=Math.PI/2;
 const contact=built.contact;
 cube(contact,[0,1.45,-2],[8,2.85,.34],dark);
 const contactSign=textSign(contact,[0,2.8,-1.75],language==='es'?'CONECTEMOS':"LET'S CONNECT",7);
 // OUTDOOR DRONE FIELD: open sky, landing clearance, dedicated exclusion ring. No roof.
 const dronePlace=PLACES.find(p=>p.id==='drones');
 const droneField=new THREE.Group();droneField.position.set(dronePlace.x,0,dronePlace.z);scene.add(droneField);built.drones=droneField;
 cyl(droneField,[0,.24,0],7.45,.36,material(0x1f7897,.14,.49),64);
 const padRing=ring(droneField,[0,.46,0],6.06,.20,material(C.white,.05,.75));padRing.rotation.x=-Math.PI/2;
 const padRing2=ring(droneField,[0,.47,0],4.2,.045,material(C.gold,.2,.44));padRing2.rotation.x=-Math.PI/2;
 cube(droneField,[0,.47,0],[4.45,.06,.65],material(C.white),false);
 cube(droneField,[0,.47,0],[.65,.06,4.45],material(C.white),false);
 const drone=scenicDrone(droneField);drone.group.position.set(0,1.24,0);
 // Aerial Operations: recover a strong area identity without blocking the helipad.
 // The public arrives from local +Z, so the center and the front edge remain clear.
 // A large title sits BEHIND the pad, while the supporting topics orbit the perimeter.
 const uasSigns=[];
 function addAerialPod(cfg){
  const pod=new THREE.Group();
  pod.position.set(cfg.x,0,cfg.z);
  droneField.add(pod);
  pod.rotation.y=cfg.face||0;
  cube(pod,[0,.52,0],[1.72,1.05,1.10],material(C.ink,.24,.44));
  cube(pod,[0,1.06,.06],[1.92,.12,1.24],material(C.steel,.24,.36));
  cube(pod,[0,.95,.60],[1.46,.58,.05],screenMat,false);
  const sign=textSign(pod,[0,2.08,.06],cfg.label,3.15,0);
  cube(pod,[-.58,1.24,.02],[.12,1.92,.12],dark);
  cube(pod,[.58,1.24,.02],[.12,1.92,.12],dark);
  const lamp=sphere(pod,[0,1.52,.24],.10,new THREE.MeshStandardMaterial({color:cfg.glow||0x8ff5ef,emissive:cfg.glow||0x54d9ef,emissiveIntensity:.62}),10);
  uasSigns.push({update:v=>sign.update(v),lamp});
 }
 // Main landmark sign.
 cube(droneField,[-4.35,2.95,-10.8],[.30,5.9,.30],dark);
 cube(droneField,[4.35,2.95,-10.8],[.30,5.9,.30],dark);
 cube(droneField,[0,5.86,-10.8],[9.15,.26,.34],accent,false);
 const aerialHeader=textSign(droneField,[0,6.28,-10.72],dronePlace.label[language],9.35,0);
 // Three supporting micro-stations around the helipad, never on the central approach.
 const aerialTopics={
  es:['UAS · AEROCIVIL','FOTOGRAMETRÍA','360° · 3DGS'],
  en:['UAS · AEROCIVIL','PHOTOGRAMMETRY','360° · 3DGS']
 };
 addAerialPod({x:-9.25,z:-1.8,face:Math.PI/2,label:aerialTopics[language][0],glow:0x84fbcd});
 addAerialPod({x:0,z:-11.8,face:0,label:aerialTopics[language][1],glow:0xf2b85a});
 addAerialPod({x:9.25,z:-1.8,face:-Math.PI/2,label:aerialTopics[language][2],glow:0x8acfff});
 // Side console for the main interaction summary.
 const terminal=new THREE.Group();
 terminal.position.set(11.2,0,3.2);
 droneField.add(terminal);
 terminal.rotation.y=-Math.PI/2;
 cube(terminal,[0,.59,0],[2.30,1.16,1.22],material(C.ink,.25,.43));
 cube(terminal,[0,1.22,.10],[2.60,.14,1.42],material(C.steel,.27,.35));
 cube(terminal,[0,1.03,.665],[2.14,.57,.055],screenMat,false);
 const instrumentCanvas=document.createElement('canvas');
 instrumentCanvas.width=512;instrumentCanvas.height=160;
 const ic=instrumentCanvas.getContext('2d');
 ic.clearRect(0,0,512,160);
 ic.fillStyle='#f4fdff';ic.font='900 104px system-ui, Arial';
 ic.textBaseline='middle';ic.fillText(language==='es'?'UAS':'UAS',18,84);
 ic.strokeStyle='#7be5ea';ic.lineWidth=9;ic.lineCap='round';
 ic.beginPath();ic.moveTo(320,88);ic.lineTo(352,62);ic.lineTo(382,92);ic.lineTo(416,52);ic.lineTo(474,76);ic.stroke();
 const instrumentTexture=new THREE.CanvasTexture(instrumentCanvas);
 instrumentTexture.colorSpace=THREE.SRGBColorSpace;
 const consoleFace=new THREE.Mesh(new THREE.PlaneGeometry(1.98,.53),new THREE.MeshBasicMaterial({map:instrumentTexture,transparent:true,side:THREE.FrontSide,depthWrite:false}));
 consoleFace.position.set(0,1.04,.70);
 terminal.add(consoleFace);
 sphere(terminal,[1.04,1.35,.26],.13,new THREE.MeshStandardMaterial({color:0x84fbcd,emissive:0x3ac797,emissiveIntensity:.65}),12);
 const terminalBounds=[[-1.33,-.73],[1.33,-.73],[-1.33,.73],[1.33,.73]].map(([x,z])=>globalPoint(dronePlace,terminal.position.x+x*Math.cos(terminal.rotation.y)+z*Math.sin(terminal.rotation.y),terminal.position.z-x*Math.sin(terminal.rotation.y)+z*Math.cos(terminal.rotation.y)));
 colliders.push({minX:Math.min(...terminalBounds.map(p=>p.x)),maxX:Math.max(...terminalBounds.map(p=>p.x)),minZ:Math.min(...terminalBounds.map(p=>p.z)),maxZ:Math.max(...terminalBounds.map(p=>p.z))});
 // Public approach title plate kept low and readable.
 cube(droneField,[0,.154,9.10],[7.55,.065,1.36],material(C.ink,.12,.48),false);
 const runwayName=new THREE.Mesh(new THREE.PlaneGeometry(7.30,1.24),new THREE.MeshBasicMaterial({map:textTexture(dronePlace.label[language],65),transparent:true,depthWrite:false,side:THREE.FrontSide}));
 runwayName.rotation.x=-Math.PI/2;
 runwayName.position.set(0,.203,9.10);
 droneField.add(runwayName);
 // Perimeter beacons and flight-line lights guide visitors without obstructing the landing pad.
 const flightLamps=[];
 for(let i=0;i<8;i++){
   const a=i*Math.PI/4;
   if(Math.abs(Math.sin(a))<.24&&Math.cos(a)>.7)continue;
   const lightBody=cyl(droneField,[Math.sin(a)*9.5,.44,Math.cos(a)*9.5],.12,.85,material(C.ink,.25,.4));
   const lamp=sphere(droneField,[Math.sin(a)*9.5,.92,Math.cos(a)*9.5],.15,new THREE.MeshStandardMaterial({color:0x8ff5ef,emissive:0x54d9ef,emissiveIntensity:.50}),10);
   flightLamps.push(lamp);
 }
 for(let i=0;i<10;i++){const a=i*Math.PI/5;const rr=8.8;
  if(Math.abs(Math.sin(a))<.24&&Math.cos(a)>.7)continue;
  cyl(droneField,[Math.sin(a)*rr,.45,Math.cos(a)*rr],.13,.9,material(C.warn,.05,.72));}
 // DELIVERY C: fully authored safety laboratory, with three visible before/after scenes.
 // The digital simulation is separate from the real commercial Oshlix product.
 const safetyCenter=createSafetyCenter(osh,language);
 const pathwayLight=[];
 for(const [x,z] of [[-16,-11],[17,-12],[-18,-36],[18,-30],[-18,12],[19,12],[-18,30],[18,30],[10,44],[-10,44],[0,48],[0,-38]])streetlight(scene,x,z);
 const trees=[[-19,0],[-28,-4],[26,-5],[-43,-8],[48,-8],[-48,13],[55,32],[-13,45],[13,45],[-46,62],[-22,70],[22,72],[51,57],[-50,44],[-10,-76],[10,-76],[30,-55],[-30,-56]];
 trees.forEach(([x,z],i)=>plantTree(scene,x,z,i%3===0?1.22:.88));
 [[-13,4,6,0],[14,4,6,0],[-13,-3,6,0],[13,-3,6,0],[-10,59,5,Math.PI/2],[10,59,5,Math.PI/2]].forEach(a=>planter(scene,...a));
 // Positions of both 3D markers and map are shared; entrance points rotate with building façades.
 const stations=[...PLACES.map(p=>{const entry=placeEntrance(p,2.5);return{id:p.id,x:entry.x,z:entry.z,type:'place'};}),
  ...RISKS.map(r=>({...r,type:'risk'})), ...exhibits.stations];
 targets.push(...exhibits.targets);
 for(const station of stations){const g=new THREE.Group();g.position.set(station.x,0,station.z);scene.add(g);
  const risk=station.type==='risk',exhibit=station.type==='exhibit',tone=material(risk?C.warn:C.ice,.32,.35);
  cyl(g,[0,exhibit?.24:.34,0],exhibit?.22:.34,exhibit?.39:.56,dark);
  const baseY=exhibit?.92:1.35;
  const target=new THREE.Mesh(new THREE.OctahedronGeometry(risk?.34:(exhibit?.25:.39)),tone);target.position.y=baseY;
  target.userData.interactionId=station.id;g.add(target);targets.push(target);
  const halo=ring(g,[0,.07,0],exhibit?.42:.69,.046,material(risk?C.warn:C.gold,.14,.58));halo.rotation.x=-Math.PI/2;
  markers.push({group:g,selector:target,border:halo,baseY});
 }
 return {colliders,roofs,doors,labels,built,markers,targets,stations,archSign,contactSign,ringDisplay,water,sculpture,drone,
  safetyCenter,
  setExhibit(zone,index){exhibits.setSelected(zone,index);},
  updateLanguage(lang){labels.forEach(x=>x.plaque.update(x.isIcon?x.staticText:labelFor(x.id,lang)));
    const oldName=runwayName.material.map;runwayName.material.map=textTexture(dronePlace.label[lang],65);runwayName.material.needsUpdate=true;oldName.dispose();
    aerialHeader.update(dronePlace.label[lang]);
    const topicSet=lang==='es'?
      ['UAS · AEROCIVIL','FOTOGRAMETRÍA','360° · 3DGS']:
      ['UAS · AEROCIVIL','PHOTOGRAMMETRY','360° · 3DGS'];
    uasSigns.forEach((entry,index)=>entry.update(topicSet[index]));
    archSign.update(lang==='es'?'UNIVERSO DE LUIS EMILIO ROJAS':'LUIS EMILIO ROJAS · UNIVERSE');
    contactSign.update(lang==='es'?'CONECTEMOS':"LET'S CONNECT");
    exhibits.setLanguage(lang);
    safetyCenter.updateLanguage(lang);},
  update(dt,time,reduced){if(!reduced){sculpture.rotation.y+=dt*.08;ringDisplay.rotation.z+=dt*.11;
   water.material.opacity=.69+Math.sin(time*.85)*.06;
   flightLamps.forEach((lamp,i)=>{lamp.material.emissiveIntensity=.32+Math.sin(time*1.9+i*.55)*.20;});
   markers.forEach((m,i)=>{m.selector.rotation.y+=dt*.38;m.selector.position.y=m.baseY+Math.sin(time*1.4+i)*.12;});}
   safetyCenter.update(dt,time,reduced);exhibits.update(dt,time,reduced);},
  getLocal(place,pos){const a=place.yaw||0,dx=pos.x-place.x,dz=pos.z-place.z;return {x:dx*Math.cos(a)-dz*Math.sin(a),z:dx*Math.sin(a)+dz*Math.cos(a)};}
 };
}
