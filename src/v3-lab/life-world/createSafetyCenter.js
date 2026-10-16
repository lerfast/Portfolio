import * as THREE from 'three';

/**
 * DELIVERY C — an interactive, illustrative occupational safety training space.
 * It is not a live Oshlix product feature or an actual risk assessment.
 * All positions are LOCAL to the existing Oshlix building (24 x 19 units).
 */
const COLORS = {
  blue: 0x073752, navy: 0x10283c, teal: 0x0ba2b4, light: 0xf6faf7,
  warm: 0xffc05a, orange: 0xf48b55, green: 0x32cc94,
  concrete: 0xb5d9d4, yellow: 0xffc85e, steel: 0x8da7b3,
};
const mat = (color, metalness=.08, roughness=.65) => new THREE.MeshStandardMaterial({color,metalness,roughness});
const dark=mat(COLORS.navy,.34,.38), metal=mat(COLORS.steel,.62,.32);
const pale=mat(COLORS.light,.04,.8), amber=mat(COLORS.warm,.16,.54),
 teal=mat(COLORS.teal,.26,.46), orange=mat(COLORS.orange,.12,.5),
 green=mat(COLORS.green,.14,.49), concrete=mat(COLORS.concrete,.04,.85);

function box(parent,x,y,z,w,h,d,m,cast=true){
 const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=cast;o.receiveShadow=true;parent.add(o);return o;
}
function cyl(parent,x,y,z,r,h,m,n=12){
 const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,n),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;
}
function sphere(parent,x,y,z,r,m){
 const o=new THREE.Mesh(new THREE.SphereGeometry(r,12,10),m);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o;
}
function line(parent,a,b,r,m){
 const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),d=vb.clone().sub(va);
 const body=cyl(parent,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,r,d.length(),m,8);
 body.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return body;
}
function sign(parent, x,y,z,w,h, getText,lang='en', bg=COLORS.blue){
 const root=new THREE.Group();root.position.set(x,y,z);parent.add(root);
 box(root,0,0,-.045,w,h,.09,mat(bg,.22,.45));
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;
 const ctx=canvas.getContext('2d');const tex=new THREE.CanvasTexture(canvas);
 tex.colorSpace=THREE.SRGBColorSpace;
 const face=new THREE.Mesh(new THREE.PlaneGeometry(w-.08,h-.10),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.FrontSide,depthWrite:false}));
 face.position.z=.012;root.add(face);
 const render=l=>{
  ctx.clearRect(0,0,1024,256);ctx.fillStyle='#eefcff';ctx.textAlign='center';ctx.textBaseline='middle';
  const value=String(getText(l));let fontsize=94;ctx.font=`800 ${fontsize}px system-ui,Arial`;
  while(ctx.measureText(value).width>940 && fontsize>33){fontsize-=4;ctx.font=`800 ${fontsize}px system-ui,Arial`;}
  ctx.fillText(value,512,131,940);tex.needsUpdate=true;
 };
 render(lang);return {updateLanguage:render};
}
function floorStroke(parent,x,z,w,d,color){return box(parent,x,.052,z,w,.025,d,color,false);}
function warningRim(parent,x,z,w,d){
 for(const side of [-1,1]){
  floorStroke(parent,x, z+side*d/2,w,.09,orange);
  floorStroke(parent,x+side*w/2,z,.09,d,orange);
 }
}

export default function createSafetyCenter(osh,language='en'){
 const center=new THREE.Group();center.position.y=.40;osh.add(center);
 const state={done:new Set(),time:0,language};
 const statusLabels=[];
 const beam=new THREE.MeshStandardMaterial({color:0x1de3e7,emissive:0x00b0ce,emissiveIntensity:.28,metalness:.34,roughness:.36});

 // Clean, walkable industrial floor, work cells to the left and right, clear center aisle.
 box(center,0,.08,-.3,21,.10,15.7,mat(0xe9f3ed,.02,.89),false);
 for(let i=-9;i<=9;i+=1.8)floorStroke(center,i,-.2,.022,14.4,concrete);
 for(let j=-7;j<=7;j+=1.8)floorStroke(center,0,j,20,.025,concrete);
 // Visitor route: clearly readable and not a barrier.
 for(let i=0;i<6;i++)floorStroke(center,0,6.7-i*2.0,.35,1.18,teal);
 for(const side of [-1,1])floorStroke(center,side*2.05,0,.09,13.8,mat(0x57b9af));

 // The safety lab has a recognizable identity; no claim that it is an Oshlix feature.
 statusLabels.push(sign(center,0,5.65,-8.65,13.3,1.05,
  l=>l==='es'?'LABORATORIO DE PREVENCIÓN · DEMO 3D':'SAFETY PREVENTION LAB · 3D DEMO',language));
 // Industrial trusses with overhead illumination.
 for(const z of [-5.8,0,4.7]){
  for(const x of [-9.7,9.7])box(center,x,3.62,z,.19,6.8,.19,metal);
  box(center,0,6.9,z,19.6,.24,.24,metal);
  for(let x=-7.5;x<8;x+=5)box(center,x,6.71,z,.16,.06,1.23,beam,false);
 }

 // 01 — Lifting operations. A palletized load is moving above a walkable exclusion area.
 const liftRoot=new THREE.Group();liftRoot.position.set(-5,0,-2.0);center.add(liftRoot);
 warningRim(liftRoot,0,0,7.2,7.2);
 for(const x of [-2.65,2.65])box(liftRoot,x,2.45,-2,.20,4.8,.20,metal);
 box(liftRoot,0,4.9,-2,5.5,.31,.42,dark);
 box(liftRoot,0,4.64,-2,.32,.26,.44,amber);
 const cable=cyl(liftRoot,0,3.75,-2,.036,1.48,metal);
 const hook=cyl(liftRoot,0,2.94,-2,.11,.30,orange);
 const cargo=new THREE.Group();liftRoot.add(cargo);
 box(cargo,0,.15,0,2.10,.22,1.55,mat(0x7d5a38));
 box(cargo,0,.72,0,1.83,.92,1.32,mat(0xd29a52));
 for(const x of [-.68,0,.68])box(cargo,x,1.18,0,.10,.09,1.30,amber);
 cargo.position.set(0,1.46,-2);
 const exclusion=new THREE.Group();liftRoot.add(exclusion);
 for(const x of [-3.4,3.4])for(const z of [-3.4,3.4]){
  cyl(exclusion,x,.62,z,.13,1.14,orange);
  cyl(exclusion,x,1.20,z,.18,.18,amber);
 }
 for(const z of [-3.4,3.4])box(exclusion,0,1.23,z,6.85,.10,.10,amber);
 for(const x of [-3.4,3.4])box(exclusion,x,1.23,0,.10,.10,6.85,amber);
 const loadBeacon=sphere(liftRoot,0,4.96,-1.96,.17,amber);
 statusLabels.push(sign(liftRoot,0,2.58,3.71,5.4,.75,
  l=>l==='es'?'01 · CARGA SUSPENDIDA':'01 · SUSPENDED LOAD',language));

 // 02 — Forklift zone, with a clearly separable pedestrian lane.
 const trafficRoot=new THREE.Group();trafficRoot.position.set(5,0,-2.0);center.add(trafficRoot);
 warningRim(trafficRoot,0,0,7.45,7.2);
 const lane=mat(0x8bd2ce,.04,.75);floorStroke(trafficRoot,-2.64,0,1.25,6.6,lane);
 for(let z=-2.8;z<=3;z+=1.45)floorStroke(trafficRoot,-2.62,z,.76,.10,pale);
 const forklift=new THREE.Group();trafficRoot.add(forklift);
 const forkliftCar=new THREE.Group();forklift.add(forkliftCar);
 box(forkliftCar,0,.78,0,2.18,.9,1.55,amber);
 box(forkliftCar,-.58,1.56,0,.87,.84,1.34,dark);
 box(forkliftCar,-.58,2.12,-.52,1.08,.13,.13,metal);
 for(const x of [-.94,.94])for(const z of [-.71,.71]){
  const wheel=cyl(forkliftCar,x,.37,z,.34,.22,dark);wheel.rotation.x=Math.PI/2;
 }
 box(forkliftCar,1.40,.91,-.46,.15,1.86,.14,metal);
 box(forkliftCar,1.40,.91,.46,.15,1.86,.14,metal);
 box(forkliftCar,1.99,.26,0,1.06,.12,1.18,metal);
 forklift.position.set(0,.05,.55);
 const guardrail=new THREE.Group();trafficRoot.add(guardrail);
 for(let z=-3.05;z<=3.1;z+=1.02){cyl(guardrail,-1.72,.59,z,.085,1.10,teal);}
 box(guardrail,-1.72,1.08,0,.10,.10,6.9,teal);
 box(guardrail,-1.72,.66,0,.09,.09,6.9,teal);
 const crossing=new THREE.Group();trafficRoot.add(crossing);
 for(let i=0;i<5;i++)box(crossing,-2.67,.085,-2.4+i*1.11,.75,.025,.43,pale,false);
 const trafficBeacon=sphere(trafficRoot,0,3.7,3.2,.16,amber);
 statusLabels.push(sign(trafficRoot,0,2.58,3.72,5.7,.75,
  l=>l==='es'?'02 · VEHÍCULO / PEATÓN':'02 · VEHICLE / PEDESTRIAN',language));

 // 03 — Emergency evacuation at the front of the hall, distinct from the work cells.
 // This is a secondary emergency doorway, NOT the public entrance at x=0,+Z.
 const exitRoot=new THREE.Group();exitRoot.position.set(-6.1,0,5.9);center.add(exitRoot);
 box(exitRoot,0,1.66,-.75,2.8,3.28,.21,dark);
 box(exitRoot,0,1.66,-.57,2.31,2.95,.04,mat(0x4f737e,.12,.59),false);
 statusLabels.push(sign(exitRoot,0,3.68,-.47,3.54,.66,
  l=>l==='es'?'SALIDA DE EMERGENCIA':'EMERGENCY EXIT',language,0x15684b));
 const crates=new THREE.Group();exitRoot.add(crates);
 for(const [x,y,z,w] of [[-.7,.55,1.05,1.05],[.52,.54,.95,.9],[.20,1.49,1.04,.84]])box(crates,x,y,z,w,y>1?0.76:1.05,.97,mat(0xb68b5f));
 const escapeRoute=new THREE.Group();exitRoot.add(escapeRoute);
 for(let i=0;i<4;i++)floorStroke(escapeRoute,0,2.7-i*.88,.8,.31,green);
 const exitGlow=sphere(exitRoot,1.55,3.63,-.42,.16,green);
 const storage=new THREE.Group();exitRoot.add(storage);
 storage.position.set(4.3,0,-.2);
 for(let i=0;i<3;i++)box(storage,-.55+i*.53,.48,0,.47,.87,.73,mat(0xcba579));
 storage.visible=false;

 // Central digital display with three status lamps. Station work is observable.
 const dashboard=new THREE.Group();dashboard.position.set(0,0,-8.04);center.add(dashboard);
 box(dashboard,0,3.20,.15,11.0,2.05,.20,dark);
 const header=sign(dashboard,0,3.78,.28,10.1,.51,l=>l==='es'?'OSHLIX · SIMULACIÓN CONCEPTUAL':'OSHLIX · CONCEPT SIMULATION',language);
 statusLabels.push(header);
 const statusLamps=[];
 [-3.35,0,3.35].forEach((x,i)=>{
  const lamp=sphere(dashboard,x,2.98,.33,.19,orange);
  const label=sign(dashboard,x,2.59,.28,2.85,.44,l=>{
   const es=l==='es';return [es?'IZAJE':'LIFTING',es?'TRÁNSITO':'TRAFFIC',es?'EVACUACIÓN':'EVACUATION'][i];
  },language);
  statusLamps.push(lamp);statusLabels.push(label);
 });

 function setControls(ids){
  state.done=new Set(ids);
  const safeLift=state.done.has('lift'),safeTraffic=state.done.has('traffic'),safeExit=state.done.has('exit');
  exclusion.visible=safeLift;
  guardrail.visible=safeTraffic;crossing.visible=safeTraffic;
  crates.visible=!safeExit;storage.visible=safeExit;escapeRoute.visible=safeExit;
  const flags=[safeLift,safeTraffic,safeExit];
  statusLamps.forEach((lamp,i)=>lamp.material=flags[i]?green:orange);
  loadBeacon.material=safeLift?green:amber;
  trafficBeacon.material=safeTraffic?green:amber;
  exitGlow.material=safeExit?green:orange;
 }
 setControls([]);

 function update(dt,time,reduced){
  state.time=time;
  const liftSafe=state.done.has('lift');
  // Before: elevated suspended load. After: load lowered onto a support, exclusion active.
  const cargoY=liftSafe?.22:1.46+(reduced?0:Math.sin(time*1.5)*.07);
  cargo.position.y+=(cargoY-cargo.position.y)*Math.min(1,dt*2.3);
  cable.scale.y=Math.max(.20,(4.61-(cargo.position.y+1.45))/1.48);
  cable.position.y=4.61-(4.61-(cargo.position.y+1.45))/2;
  hook.position.y=cargo.position.y+1.5;
  // Forklift motion is an illustrative warning only; control parks it behind the guardrail.
  const forkliftTarget=state.done.has('traffic')?1.7:.55+(reduced?0:Math.sin(time*.73)*.69);
  forklift.position.z+=(forkliftTarget-forklift.position.z)*Math.min(1,dt*1.5);
  forkliftCar.rotation.y=state.done.has('traffic')?.18:0;
  if(!reduced){
   loadBeacon.scale.setScalar(1+Math.sin(time*3)*.08);
   trafficBeacon.scale.setScalar(1+Math.sin(time*2.6)*.07);
  }
 }
 return {setControls,update,updateLanguage(l){state.language=l;statusLabels.forEach(s=>s.updateLanguage(l));}};
}
