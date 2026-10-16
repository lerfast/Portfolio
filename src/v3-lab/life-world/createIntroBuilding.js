import * as THREE from 'three';

/* LER V3 · Torre Eiffel, interactive artistic landmark model.
 * This is a procedural 3D visualization, not a scan, 360 video, or Gaussian Splat.
 * Kept separate from the genuine La Gaitana SuperSplat viewer on demand.
 * No new dependencies; lightweight geometry, keyboard/touch orbit and disposal. */
const clamp = THREE.MathUtils.clamp;
export default function createIntroBuilding({canvas,onFeature,onError}) {
 let renderer;
 try { renderer = new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'}); }
 catch(error){if(onError)onError(error);return null;}
 const mobile = window.innerWidth < 800;
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,mobile?1.25:1.6));
 renderer.setClearColor(0x000000,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.6;
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(38,1,.1,180);
 const target=new THREE.Vector3(0,12.1,0);
 const tower=new THREE.Group();scene.add(tower);
 scene.add(new THREE.HemisphereLight(0xc4f4ff,0x112540,2.8));
 const keyLight=new THREE.DirectionalLight(0xffdfb0,4.4);keyLight.position.set(-14,30,17);scene.add(keyLight);
 const coolLight=new THREE.DirectionalLight(0x5dcbf4,2.9);coolLight.position.set(13,16,-12);scene.add(coolLight);
 const materials={
  bronze:new THREE.MeshStandardMaterial({color:0xb99563,metalness:.64,roughness:.42}),
  lighter:new THREE.MeshStandardMaterial({color:0xe6c58a,metalness:.52,roughness:.36}),
  shadow:new THREE.MeshStandardMaterial({color:0x60788a,metalness:.55,roughness:.43}),
  deck:new THREE.MeshStandardMaterial({color:0x263e56,metalness:.5,roughness:.5}),
  stone:new THREE.MeshStandardMaterial({color:0xe8e3d5,roughness:.78}),
  grass:new THREE.MeshStandardMaterial({color:0x23857f,roughness:.93}),
  glow:new THREE.MeshBasicMaterial({color:0x72e7ef})
 };
 const geometries=[];
 function addMesh(geo,mat,pos,parent=tower){
  geometries.push(geo);const mesh=new THREE.Mesh(geo,mat);if(pos)mesh.position.set(...pos);parent.add(mesh);return mesh;
 }
 function box(x,y,z,w,h,d,mat=materials.bronze){return addMesh(new THREE.BoxGeometry(w,h,d),mat,[x,y,z]);}
 function beam(a,b,r=.09,mat=materials.bronze){
  const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b);
  const delta=to.clone().sub(from),len=delta.length();
  const mesh=addMesh(new THREE.CylinderGeometry(r*.88,r,len,6,1),mat);
  mesh.position.copy(from.add(to).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());
  return mesh;
 }
 // Base and surrounding public plaza. Model dimensions are artistic, not survey measurements.
 box(0,-.33,0,14,.58,14,materials.stone);
 box(0,-.68,0,15,.18,15,materials.deck);
 for(const [x,z] of [[-5.5,-5.5],[-5.5,5.5],[5.5,-5.5],[5.5,5.5]]){
  beam([x,.07,z],[x,.75,z],.12,materials.shadow);
  addMesh(new THREE.IcosahedronGeometry(.70,1),materials.grass,[x,.97,z]);
 }
 // Four tapered lattice legs: the Eiffel Tower's characteristic silhouette.
 const span=y=>y<=8.4 ? 4.65+(2.16-4.65)*(y/8.4)
   :y<=15 ? 2.16+(.84-2.16)*((y-8.4)/6.6)
   :y<=25.8 ? .84+(.12-.84)*((y-15)/10.8) : .12;
 const pos=(sx,sz,y)=>[sx*span(y),y,sz*span(y)];
 const side=[[1,1],[1,-1],[-1,1],[-1,-1]];
 for(const [sx,sz] of side){
  beam(pos(sx,sz,.1),pos(sx,sz,8.4),.23,materials.bronze);
  beam(pos(sx,sz,8.4),pos(sx,sz,15),.15,materials.bronze);
  beam(pos(sx,sz,15),pos(sx,sz,25.8),.10,materials.lighter);
 }
 // Multi-level crossbracing on all four facades, visible from every orbit angle.
 const levels=[.9,2.4,4.1,5.8,7.5,9.1,10.6,12,13.5,15.7,17.4,19.1,20.8,22.6,24.2];
 const faces=[
  y=>pos(-1,1,y),y=>pos(1,1,y),
  y=>pos(1,1,y),y=>pos(1,-1,y),
  y=>pos(1,-1,y),y=>pos(-1,-1,y),
  y=>pos(-1,-1,y),y=>pos(-1,1,y)
 ];
 for(let face=0;face<4;face++){
  const left=faces[face*2],right=faces[face*2+1];
  for(let idx=0;idx<levels.length-1;idx++){
   const lo=levels[idx],hi=levels[idx+1];
   beam(left(lo),right(hi),lo<8.4?.054:.038,materials.shadow);
   beam(right(lo),left(hi),lo<8.4?.054:.038,materials.bronze);
   beam(left(hi),right(hi),lo<8.4?.065:.045,materials.lighter);
  }
 }
 // Two tiered lookouts, guardrails, observation rooms and tapering top.
 function terrace(y,half,thickness){
  box(0,y,0,half*2,thickness,half*2,materials.deck);
  box(0,y+thickness*.54,0,half*2+.4,.10,half*2+.4,materials.lighter);
  const r=half+.12;
  for(const v of [-r,r]){
   beam([-r,y+.16,v],[r,y+.16,v],.035,materials.bronze);
   beam([v,y+.16,-r],[v,y+.16,r],.035,materials.bronze);
  }
  for(const a of [-r,r])for(const b of [-r,r])beam([a,y+.16,b],[a,y+1.02,b],.035,materials.lighter);
  for(const a of [-r,r]){
   beam([a,y+.97,-r],[a,y+.97,r],.033,materials.lighter);
   beam([-r,y+.97,a],[r,y+.97,a],.033,materials.lighter);
  }
 }
 terrace(8.4,2.78,.48);
 terrace(15,1.28,.34);
 box(0,16.2,0,1.35,1.45,1.35,materials.deck);
 box(0,18.3,0,.66,.30,.66,materials.lighter);
 beam([0,25.5,0],[0,28.2,0],.16,materials.lighter);
 beam([0,28.2,0],[0,30.2,0],.055,materials.lighter);
 addMesh(new THREE.SphereGeometry(.23,8,6),materials.glow,[0,29.8,0]);
 // Open arches between the broad legs, evocative of the Eiffel's four portals.
 for(let i=0;i<4;i++){
  let curve;
  if(i%2===0){const z=i===0?4.65:-4.65;curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(-4.65,.12,z),new THREE.Vector3(0,8,z*.5),new THREE.Vector3(4.65,.12,z));}
  else {const x=i===1?4.65:-4.65;curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(x,.12,-4.65),new THREE.Vector3(x*.5,8,0),new THREE.Vector3(x,.12,4.65));}
  addMesh(new THREE.TubeGeometry(curve,22,.12,6,false),materials.bronze);
 }
 const pointPositions=[[-4.65,3,4.65],[2.3,9.6,2.3],[.4,26.3,.4]];
 const markers=pointPositions.map((coordinates,index)=>{
  const marker=new THREE.Group();marker.position.set(...coordinates);marker.userData.feature=index;tower.add(marker);
  const geo=new THREE.SphereGeometry(.22,9,7);geometries.push(geo);
  const dot=new THREE.Mesh(geo,materials.glow);dot.userData.feature=index;marker.add(dot);
  const ringGeo=new THREE.TorusGeometry(.34,.024,6,25);geometries.push(ringGeo);
  marker.add(new THREE.Mesh(ringGeo,materials.lighter));return marker;
 });
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
 let az=.55,el=.28,dist=49,downX=0,downY=0,lastX=0,lastY=0,moved=false,dragging=false,dead=false,frame=0,lastTime=0,lastUser=0;
 const reduced=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 function resize(){if(dead)return;const w=Math.max(canvas.clientWidth,2),h=Math.max(canvas.clientHeight,2);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
 const observer=typeof ResizeObserver==='function'?new ResizeObserver(resize):null;
 if(observer)observer.observe(canvas);window.addEventListener('resize',resize);resize();
 function placeCamera(){camera.position.set(target.x+dist*Math.cos(el)*Math.sin(az),target.y+dist*Math.sin(el),target.z+dist*Math.cos(el)*Math.cos(az));camera.lookAt(target);}
 function down(e){if(e.pointerType==='mouse'&&e.button!==0)return;dragging=true;moved=false;downX=lastX=e.clientX;downY=lastY=e.clientY;if(canvas.setPointerCapture)canvas.setPointerCapture(e.pointerId);}
 function move(e){if(!dragging)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;if(Math.hypot(e.clientX-downX,e.clientY-downY)>5)moved=true;az-=dx*.007;el=clamp(el+dy*.005,-.20,1.12);lastUser=performance.now();}
 function up(e){if(!dragging)return;dragging=false;if(canvas.hasPointerCapture&&canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
  if(moved)return;const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);placeCamera();ray.setFromCamera(pointer,camera);
  const hit=ray.intersectObjects(markers,true)[0];if(hit){let obj=hit.object;while(obj&&!Number.isInteger(obj.userData.feature))obj=obj.parent;if(obj&&onFeature)onFeature(obj.userData.feature);}
 }
 function wheel(e){e.preventDefault();dist=clamp(dist+e.deltaY*.025,35,78);lastUser=performance.now();}
 function keydown(e){let used=true;switch(e.key){
  case 'ArrowLeft':az-=.15;break;case 'ArrowRight':az+=.15;break;
  case 'ArrowUp':el=clamp(el-.10,-.2,1.12);break;case 'ArrowDown':el=clamp(el+.10,-.2,1.12);break;
  case '+':case '=':dist=clamp(dist-2,35,78);break;case '-':dist=clamp(dist+2,35,78);break;
  case '1':case '2':case '3':if(onFeature)onFeature(Number(e.key)-1);break;
  default:used=false;
 }if(used){e.preventDefault();lastUser=performance.now();}}
 canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('wheel',wheel,{passive:false});canvas.addEventListener('keydown',keydown);
 function animate(now){if(dead)return;frame=requestAnimationFrame(animate);if(document.hidden)return;
  const dt=Math.min(.035,(now-lastTime)/1000||.016);lastTime=now;
  if(!dragging&&!reduced&&now-lastUser>2600)az+=dt*.085;
  if(!reduced)markers.forEach((m,i)=>{m.children[0].scale.setScalar(1+Math.sin(now*.002+i*2)*.13);});
  placeCamera();renderer.render(scene,camera);
 }
 frame=requestAnimationFrame(animate);
 return {dispose(){dead=true;cancelAnimationFrame(frame);if(observer)observer.disconnect();window.removeEventListener('resize',resize);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('wheel',wheel);canvas.removeEventListener('keydown',keydown);geometries.forEach(g=>g.dispose());Object.values(materials).forEach(m=>m.dispose());renderer.dispose();}};
}
