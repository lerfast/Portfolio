import * as THREE from 'three';
import { PLACES, RISKS, placeEntrance } from './LifeWorldContent';
import createCampusArchitecture from './createCampusArchitecture';
import createWorldAtmosphere from './createWorldAtmosphere';

/* LIFE WORLD / ITERATION 2, DELIVERY B — synthetic Three.js architectural campus; NOT a Gaussian Splat or Oshlix product feature.
 * WebGL is imported dynamically only when the visitor elects to enter the world.
 */
const COLOR = { sky:0x87cde8 };
const origin=new THREE.Vector3(0,0,-4);
const clamp=THREE.MathUtils.clamp;
function mat(color,metalness=.1,roughness=.76,emissive=0,intensity=0){return new THREE.MeshStandardMaterial({color,metalness,roughness,emissive,emissiveIntensity:intensity});}
function box(parent,xyz,size,m){const v=new THREE.Mesh(new THREE.BoxGeometry(...size),m);v.position.set(...xyz);v.castShadow=true;v.receiveShadow=true;parent.add(v);return v;}
function cylinder(parent,xyz,r,height,m,segments=18){const v=new THREE.Mesh(new THREE.CylinderGeometry(r,r,height,segments),m);v.position.set(...xyz);v.castShadow=true;v.receiveShadow=true;parent.add(v);return v;}
function ball(parent,xyz,r,m){const v=new THREE.Mesh(new THREE.SphereGeometry(r,14,12),m);v.position.set(...xyz);v.castShadow=true;parent.add(v);return v;}
function makeAvatar(scene){
 // The avatar is a stylized visitor wearing actual recognizable PPE rather than
 // the previous unmoving cylinder figure. All animation is generated locally.
 const root=new THREE.Group();scene.add(root);
 const body=new THREE.Group();root.add(body);
 const cloth=mat(0x193e55,.10,.83),pants=mat(0x244151,.06,.91),skin=mat(0xba8b72,.03,.88);
 const helmet=mat(0xfff1d1,.16,.37),vest=mat(0xf1b947,.04,.78),reflect=mat(0xeafff6,.10,.37,0x8bdded,.20);
 const boot=mat(0x142b38,.18,.85),dark=mat(0x0b2434,.24,.55),badge=mat(0x0cacc6,.14,.48);
 const torso=cylinder(body,[0,1.31,0],.38,.78,cloth,12);torso.scale.z=.84;
 // Vest and reflective bands are visible from both front and back.
 box(body,[0,1.35,.274],[.79,.67,.07],vest);
 box(body,[0,1.35,-.274],[.79,.67,.07],vest);
 for(const z of [-.316,.316]){
  box(body,[0,1.45,z],[.82,.065,.034],reflect);
  box(body,[0,1.15,z],[.82,.055,.034],reflect);
 }
 for(const x of [-.25,.25]) box(body,[x,1.45,.321],[.058,.64,.035],reflect);
 box(body,[0,1.31,.357],[.23,.17,.025],badge);
 cylinder(body,[0,1.78,0],.14,.23,skin,12);
 const head=new THREE.Group();head.position.y=1.98;body.add(head);
 ball(head,[0,0,0],.285,skin);
 // A compact hard hat: dome, brim, front badge and retention strap.
 const dome=new THREE.Mesh(new THREE.SphereGeometry(.335,20,12,0,Math.PI*2,0,Math.PI*.54),helmet);
 dome.position.y=.14;dome.castShadow=true;head.add(dome);
 const brim=cylinder(head,[0,.14,.045],.363,.065,helmet,22);brim.scale.z=1.12;
 box(head,[0,.17,.345],[.22,.16,.035],badge);
 const strap=box(head,[0,-.145,.238],[.45,.033,.035],dark);strap.castShadow=false;
 // Small eye protection, not a large visor that hides the face.
 const eye=box(head,[0,.006,.269],[.34,.073,.040],mat(0x24546a,.49,.22));eye.castShadow=false;
 const arms=[],legs=[];
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.position.set(side*.43,1.61,0);body.add(arm);
  cylinder(arm,[side*.014,-.31,0],.13,.62,cloth,10);
  ball(arm,[side*.018,-.67,0],.105,skin);arms.push(arm);
  const leg=new THREE.Group();leg.position.set(side*.18,.92,0);body.add(leg);
  cylinder(leg,[0,-.33,0],.145,.66,pants,10);
  box(leg,[0,-.74,.115],[.30,.22,.46],boot);legs.push(leg);
 }
 const groundHalo=new THREE.Mesh(new THREE.CircleGeometry(.79,24),
   new THREE.MeshBasicMaterial({color:0x062c42,transparent:true,opacity:.16,depthWrite:false}));
 groundHalo.rotation.x=-Math.PI/2;groundHalo.position.y=.085;groundHalo.renderOrder=1;root.add(groundHalo);
 root.position.copy(origin);
 return {root,body,head,arms,legs};
}
export default function createLifeWorld({canvas,language='en',onNear,onPick,onStep,onFail}){
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});}catch(e){if(onFail)onFail(e);return null;}
 const lowSpec=window.innerWidth<740 || (window.navigator.deviceMemory && window.navigator.deviceMemory<=4);
 // Dynamic resolution reduces pixel cost only when frame-time remains consistently high.
 const baseRatio=Math.min(window.devicePixelRatio||1,lowSpec?1.25:1.65);
 let dynamicRatio=baseRatio,quality='auto', slowSeconds=0, smoothFrameMs=16.7;
 renderer.setPixelRatio(dynamicRatio);renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.28;
 const scene=new THREE.Scene();scene.background=new THREE.Color(COLOR.sky);scene.fog=new THREE.Fog(COLOR.sky,92,202);
 const camera=new THREE.PerspectiveCamera(54,1,.13,210);camera.position.set(26,25,37);camera.lookAt(0,0,0);
 scene.add(new THREE.HemisphereLight(0xf5feff,0x64978f,2.38));
 const sun=new THREE.DirectionalLight(0xffe6b5,2.25);sun.position.set(-32,64,28);scene.add(sun);
 const ambientFill=new THREE.DirectionalLight(0x9ceaf6,.35);ambientFill.position.set(55,20,-65);scene.add(ambientFill);
 if(!lowSpec){sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-94;sun.shadow.camera.right=94;sun.shadow.camera.top=94;sun.shadow.camera.bottom=-94;sun.shadow.normalBias=.034;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;}
 // One authored campus supplies architecture, oriented entrances, signage, paths,
 // 3D action positions and colliders. Preserve pre-existing risk and drone interactions.
 const campus=createCampusArchitecture(scene,language);
 const atmosphere=createWorldAtmosphere(scene,{mobile:lowSpec});
 const {colliders,roofs,doors,targets,stations,drone,safetyCenter}=campus;
 // Industry EPP avatar, animated limbs and camera follow; geometry can be replaced with a rigged glTF in Hito 6.
 const player=makeAvatar(scene),avatar=player.root;
 const controls={azimuth:.25,distance:9.6,pitch:.46};let phase='standby',time=0,arrivalFrom=new THREE.Vector3(0,16,41),arrivalDone=null,arrivalT=0;
 const state={keys:new Set(),joyX:0,joyZ:0,paused:true,completed:[],flying:false,overlayFocus:null};
 // Damped camera look vector keeps dialog-focused dolly movements continuous.
 const cameraAim=new THREE.Vector3(avatar.position.x,avatar.position.y+1.4,avatar.position.z);
 let raf=0,last=0,lastTick=0,nearPrev='',dead=false,drag=null,stepTime=0;
 const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const ray=new THREE.Raycaster(),point=new THREE.Vector2();
 function placeNear(){let best=null,min=4.15;for(const item of stations){const d=Math.hypot(item.x-avatar.position.x,item.z-avatar.position.z);if(d<min){min=d;best=item;}}return best;}
 function nearEmit(){const obj=placeNear();const id=obj?obj.id:'';if(id!==nearPrev){nearPrev=id;if(onNear)onNear(obj);}}
 function resize(){if(dead)return;const w=Math.max(2,canvas.clientWidth),h=Math.max(2,canvas.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<600?65:53;camera.updateProjectionMatrix();}
 const ro=typeof ResizeObserver==='function'?new ResizeObserver(resize):null;if(ro)ro.observe(canvas);window.addEventListener('resize',resize);resize();
 function down(e){if(e.pointerType==='mouse'&&e.button!==0)return;drag={x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false};}
 function move(e){if(!drag||phase!=='world')return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(e.clientX-drag.startX)>6||Math.abs(e.clientY-drag.startY)>6)drag.moved=true;controls.azimuth-=dx*.006;controls.pitch=clamp(controls.pitch+dy*.0045,-.10,1.18);drag.x=e.clientX;drag.y=e.clientY;}
 function up(e){if(drag&&!drag.moved&&phase==='world'&&!state.paused){const rect=canvas.getBoundingClientRect();point.x=((e.clientX-rect.left)/rect.width)*2-1;point.y=-((e.clientY-rect.top)/rect.height)*2+1;ray.setFromCamera(point,camera);const hit=ray.intersectObjects(targets,false)[0];if(hit&&onPick)onPick(hit.object.userData.interactionId);}drag=null;}
 function wheel(e){if(phase!=='world')return;e.preventDefault();controls.distance=clamp(controls.distance+e.deltaY*.010,5.2,16);}
 canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);
 window.addEventListener('pointerup',up);window.addEventListener('pointercancel',cancelDrag);window.addEventListener('blur',cancelDrag);
 canvas.addEventListener('wheel',wheel,{passive:false});
 function cancelDrag(){drag=null;}
 const hitWall=(x,z)=>colliders.some(r=>x+.28>r.minX&&x-.28<r.maxX&&z+.28>r.minZ&&z-.28<r.maxZ);
 function goMove(dx,dz){const nextX=clamp(avatar.position.x+dx,-88,88),nextZ=clamp(avatar.position.z+dz,-92,96);
   if(!hitWall(nextX,avatar.position.z))avatar.position.x=nextX;
   if(!hitWall(avatar.position.x,nextZ))avatar.position.z=nextZ;
 }
 // 2D ray-vs-wall AABBs. The camera stays in the same room as the visitor
 // when its normal orbit would pass through an opaque wall. Sign/prop meshes
 // are excluded so they cannot make the camera jump unexpectedly.
 function unobstructedCamera(from,to){
   const vx=to.x-from.x,vz=to.z-from.z;
   if(Math.hypot(vx,vz)<.01)return to;
   let hit=1;
   for(const c of colliders){
     let lo=0,hi=1;
     for(const [p,d,min,max] of [[from.x,vx,c.minX-.12,c.maxX+.12],[from.z,vz,c.minZ-.12,c.maxZ+.12]]){
       if(Math.abs(d)<1e-7){if(p<min||p>max){lo=2;break;}continue;}
       const a=(min-p)/d,b=(max-p)/d;
       lo=Math.max(lo,Math.min(a,b));hi=Math.min(hi,Math.max(a,b));
       if(hi<lo)break;
     }
     if(hi>=lo && lo>0.015 && lo<hit)hit=lo;
   }
   if(hit===1)return to;
   // Keep the camera in front of the wall and above the visitor's head.
   return from.clone().lerp(to,Math.max(.20,hit-.09));
 }
 function apply(ids){state.completed=ids.slice();safetyCenter.setControls(ids);}
 apply([]);
 function loop(ms){if(dead)return;raf=requestAnimationFrame(loop);if(document.hidden){last=ms;return;}const dt=Math.min(.042,(ms-last)/1000||.016);last=ms;time+=dt;
   smoothFrameMs=smoothFrameMs*.965+dt*1000*.035;
   if(quality==='auto'&&phase==='world'&&!state.paused){
     slowSeconds=smoothFrameMs>28?slowSeconds+dt:Math.max(0,slowSeconds-dt*.50);
     if(slowSeconds>4.0&&dynamicRatio>.80){
       slowSeconds=0;dynamicRatio=Math.max(.80,dynamicRatio-.16);
       renderer.setPixelRatio(dynamicRatio);resize();
     }
   }
   if(phase==='arrival'){
     arrivalT=clamp(arrivalT+dt/(reduce?.2:2.6),0,1);const f=arrivalT*arrivalT*(3-2*arrivalT);
     camera.position.copy(arrivalFrom).lerp(new THREE.Vector3(2.37,5.2,5.30),f);camera.lookAt(0,1.4,8-12*f);
     if(arrivalT>=1){phase='world';state.paused=true;nearEmit();if(arrivalDone){const cb=arrivalDone;arrivalDone=null;cb();}}
   }else if(phase==='world'){
     const pressed=state.paused?new Set():state.keys;
     let side=(pressed.has('d')||pressed.has('arrowright')?1:0)-(pressed.has('a')||pressed.has('arrowleft')?1:0)+state.joyX;
     let fw=(pressed.has('s')||pressed.has('arrowdown')?1:0)-(pressed.has('w')||pressed.has('arrowup')?1:0)+state.joyZ;
     const length=Math.hypot(side,fw);
     const moving=length>.10, sprint=moving&&pressed.has('shift');
     if(moving){
       side/=Math.max(length,1);fw/=Math.max(length,1);
       const sx=Math.cos(controls.azimuth)*side+Math.sin(controls.azimuth)*fw;
       const sz=-Math.sin(controls.azimuth)*side+Math.cos(controls.azimuth)*fw;
       const speed=dt*(sprint?10:6.2);goMove(sx*speed,sz*speed);
       const desired=Math.atan2(sx,sz);
       const angle=Math.atan2(Math.sin(desired-avatar.rotation.y),Math.cos(desired-avatar.rotation.y));
       avatar.rotation.y+=angle*Math.min(1,dt*12);
     }
     const intensity=moving?(sprint?1.15:1):0;
     // Footstep phase persists between frames; the idle pose is settled gradually.
     if(moving)stepTime+=dt*(sprint?17:11);
     const swing=moving&&!reduce?Math.sin(stepTime)*intensity:0;
     player.legs.forEach((leg,i)=>leg.rotation.x+=(swing*(i===0?1:-1)*.53-leg.rotation.x)*Math.min(1,dt*13));
     player.arms.forEach((arm,i)=>arm.rotation.x+=(-swing*(i===0?1:-1)*.33-arm.rotation.x)*Math.min(1,dt*10));
     player.body.position.y+=((reduce?0:(moving?Math.abs(Math.sin(stepTime))*.054:Math.sin(time*1.45)*.017))-player.body.position.y)*Math.min(1,dt*8);
     player.body.rotation.z+=((reduce?0:side*-.065)-player.body.rotation.z)*Math.min(1,dt*5);
     player.head.rotation.y+=( (moving ? side*.10 : (reduce?0:Math.sin(time*.55)*.08)) - player.head.rotation.y)*Math.min(1,dt*3);
     if(!state.overlayFocus){
       const targetFov=(canvas.clientWidth<600?65:53)+(sprint&&!reduce?2.0:0);
       camera.fov+=(targetFov-camera.fov)*Math.min(1,dt*2.7);
       if(Math.abs(camera.fov-targetFov)>.02)camera.updateProjectionMatrix();
     }
     nearEmit();const p=avatar.position;const focus=state.overlayFocus;
     const distance=focus?(focus==='profile'?6.9:focus==='map'?12.5:focus==='splat'?8.5:6.2):controls.distance;
     const pitch=focus?(focus==='map'?.93:focus==='profile'?.25:.41):controls.pitch;
     const angle=controls.azimuth+(focus?(focus==='map'?.55:-.30):0);
     const orbitRadius=distance*Math.cos(pitch);
     const wanted=new THREE.Vector3(p.x+Math.sin(angle)*orbitRadius,p.y+1.4+Math.sin(pitch)*distance,p.z+Math.cos(angle)*orbitRadius);
     // A physical camera move: position and point-of-interest both animate, not a flat modal zoom.
     // Prevent viewing through the building behind the avatar.
     // Modal camera moves keep their cinematic behavior without wall clipping.
     const visibleCamera=focus?wanted:unobstructedCamera(new THREE.Vector3(p.x,p.y+1.7,p.z),wanted);
     camera.position.lerp(visibleCamera,Math.min(1,dt*(focus?2.8:5)));
     const attention=new THREE.Vector3(p.x,p.y+(focus==='map'?.7:1.4),p.z);
     cameraAim.lerp(attention,Math.min(1,dt*3.6));camera.lookAt(cameraAim);
   }
   for(const {roof,place} of roofs){
     const local=campus.getLocal(place,avatar.position);
     const inside=Math.abs(local.x)<place.width/2-.42&&Math.abs(local.z)<place.depth/2-.42;
     const target=inside?.08:1;
     roof.material.transparent=target<1||roof.material.opacity<.99;
     roof.material.opacity+=(target-roof.material.opacity)*Math.min(1,dt*4);
     roof.material.depthWrite=roof.material.opacity>.985;
     roof.visible=roof.material.opacity>.07;
   }
   for(const {place,panels} of doors){
     const local=campus.getLocal(place,avatar.position);
     const open=phase==='world'&&Math.abs(local.x)<4.2&&Math.abs(local.z-place.depth/2)<5.3;
     panels.forEach((panel,i)=>{
       const sign=i===0?-1:1;
       const dest=sign*(open?1.84:.89);
       panel.position.x+=(dest-panel.position.x)*Math.min(1,dt*4);
     });
   }
   const desiredDroneY=state.flying?5.3:1.24;
   drone.group.position.y+=(desiredDroneY-drone.group.position.y)*Math.min(1,dt*1.9);
   if(state.flying&&!reduce)drone.group.position.y+=Math.sin(time*2.0)*.007;if(state.flying){if(!reduce)drone.group.rotation.y+=dt*.46;drone.rotors.forEach(r=>r.rotation.y+=dt*16);}
   campus.update(dt,time,reduce);atmosphere.update(dt,time,reduce);
   renderer.render(scene,camera);if(phase==='world'&&ms-lastTick>220){lastTick=ms;if(onStep)onStep({x:avatar.position.x,z:avatar.position.z});}
 }
 raf=requestAnimationFrame(loop);
 return {
   transition(cb){arrivalDone=cb;phase='arrival';arrivalT=0;camera.position.copy(arrivalFrom);state.paused=true;},
   enter(){if(phase!=='world')phase='world';state.paused=false;},
   pause(v){state.paused=!!v;state.keys.clear();state.joyX=0;state.joyZ=0;},
   focusOverlay(mode){state.overlayFocus=mode||null;state.keys.clear();state.joyX=0;state.joyZ=0;},
   clearKeys(){state.keys.clear();state.joyX=0;state.joyZ=0;},
   keys(key,pressed){const k=String(key).toLowerCase();if(pressed)state.keys.add(k);else state.keys.delete(k);},
   setJoystick(x,z){state.joyX=x;state.joyZ=z;},
   resetCamera(){controls.azimuth=avatar.rotation.y;controls.pitch=.46;controls.distance=9.6;},
   setQuality(next){
     quality=['auto','eco','high'].includes(next)?next:'auto';slowSeconds=0;
     dynamicRatio=quality==='eco'?Math.min(1,window.devicePixelRatio||1):quality==='high'?Math.min(1.75,window.devicePixelRatio||1):baseRatio;
     renderer.setPixelRatio(dynamicRatio);resize();
     // Eco disables dynamic soft shadows, reducing GPU pressure on slower devices.
     renderer.shadowMap.enabled=quality==='eco'?false:!lowSpec;
     const shadowEnabled=renderer.shadowMap.enabled;
     sun.castShadow=shadowEnabled;
     // Recompile shadow-related material defines only when toggling the mode.
     scene.traverse(obj=>{
       if(!obj.material)return;
       (Array.isArray(obj.material)?obj.material:[obj.material]).forEach(m=>{m.needsUpdate=true;});
     });
     return quality;
   },
   getNear(){return placeNear();},
   teleport(id){const p=PLACES.find(t=>t.id===id);if(p){const at=placeEntrance(p,3.2);avatar.position.set(at.x,0,at.z);controls.azimuth=p.yaw||0;state.keys.clear();state.joyX=0;state.joyZ=0;nearEmit();}},
   moveControls(ids){apply(ids);},
   teleportToRisk(id){const risk=RISKS.find(r=>r.id===id);if(!risk)return;
     // Enter the safety lab without placing the avatar on top of the work cell.
     const approach={lift:[risk.x+2.3,risk.z+1.0],traffic:[risk.x-2.3,risk.z+1.0],exit:[risk.x+1.5,risk.z+1.0]};
     const [x,z]=approach[id]||[risk.x,risk.z+1];avatar.position.set(x,0,z);controls.azimuth=0;state.keys.clear();state.joyX=0;state.joyZ=0;nearEmit();},
   flyDrone(v){state.flying=!!v;},
   setExhibit(zone,index){if(campus.setExhibit)campus.setExhibit(zone,index);},
   setLanguage(lang){campus.updateLanguage(lang);},
   reset(){avatar.position.copy(origin);apply([]);state.flying=false;nearEmit();},
   dispose(){
     dead=true;cancelAnimationFrame(raf);if(ro)ro.disconnect();
     window.removeEventListener('resize',resize);window.removeEventListener('pointerup',up);
     window.removeEventListener('pointercancel',cancelDrag);window.removeEventListener('blur',cancelDrag);
     canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);
     canvas.removeEventListener('wheel',wheel);
     const geometries=new Set(),materials=new Set(),textures=new Set();
     scene.traverse(o=>{
       if(o.geometry)geometries.add(o.geometry);
       if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));
     });
     materials.forEach(m=>{if(m.map)textures.add(m.map);if(m.normalMap)textures.add(m.normalMap);if(m.emissiveMap)textures.add(m.emissiveMap);});
     geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());
     renderer.dispose();
   }
 };
}

