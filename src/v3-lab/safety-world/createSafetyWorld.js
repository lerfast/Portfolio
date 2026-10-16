import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Actual realtime WebGL scene. Everything is procedural: no remote 3D assets.
const HAZARDS = [
  { id: "crane", pos: [-3.7, 3.25, -2.5] },
  { id: "traffic", pos: [2.7, 1.6, 0.6] },
  { id: "electric", pos: [5.15, 2.0, -2.55] },
  { id: "exit", pos: [-4.95, 1.7, 3.75] },
];

const C = {
  bg: 0x06111b, slab: 0x253e4b, floor: 0x2a3d49, cobalt: 0x1d6d88,
  cyan: 0x49def4, cyanSoft: 0x65dff1, amber: 0xffb25b, danger: 0xff6c55,
  green: 0x63f0b2, steel: 0x7f9caa, dark: 0x101e29, white: 0xdbe9ee,
};

function mat(color, roughness = 0.67, metalness = 0.18, emissive = 0x000000, emissiveIntensity = 0) {
  return new THREE.MeshStandardMaterial({color, roughness, metalness, emissive, emissiveIntensity});
}

function box(parent, name, size, at, material, castShadow = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  m.position.set(...at);
  m.castShadow = castShadow; m.receiveShadow = true; m.name = name;
  parent.add(m);
  return m;
}
function cylinder(parent, name, radius, height, at, material, sides = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, sides), material);
  m.name = name; m.position.set(...at); m.castShadow = true; m.receiveShadow = true;
  parent.add(m); return m;
}
function barBetween(parent, a, b, radius, material) {
  const from = new THREE.Vector3(...a); const to = new THREE.Vector3(...b);
  const mesh = cylinder(parent, "structural member", radius, from.distanceTo(to), from.clone().add(to).multiplyScalar(.5).toArray(), material, 9);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), to.sub(from).normalize());
  return mesh;
}
function line(parent, coords, color, alpha = 1) {
  const g = new THREE.BufferGeometry().setFromPoints(coords.map(v => new THREE.Vector3(...v)));
  const l = new THREE.Line(g, new THREE.LineBasicMaterial({color, transparent:alpha < 1, opacity:alpha}));
  parent.add(l); return l;
}
function glowDisc(parent, at, radius, color, opacity = .14) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(radius, 48), new THREE.MeshBasicMaterial({color, transparent:true, opacity, depthWrite:false, side:THREE.DoubleSide}));
  m.position.set(...at); m.rotation.x=-Math.PI/2; parent.add(m); return m;
}
function led(parent, at, color, size=.08) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(size,12,10), new THREE.MeshBasicMaterial({color}));m.position.set(...at);parent.add(m);return m;
}
function worker(parent, x,z,helmetColor, turned = false) {
  const g = new THREE.Group();g.position.set(x,0,z);g.rotation.y=turned?Math.PI*.8:0;
  const suit=mat(0xe7ad48);const skin=mat(0xa88061);const dark=mat(0x1b2f3b); const helmet=mat(helmetColor);
  cylinder(g,'torso',.31,.75,[0,1.08,0],suit);
  cylinder(g,'head',.21,.33,[0,1.69,0],skin);
  cylinder(g,'helmet',.27,.13,[0,1.93,0],helmet);
  box(g,'visor',[.51,.045,.22],[0,1.94,.14],helmet);
  cylinder(g,'left leg',.1,.53,[-.16,.43,0],dark);
  cylinder(g,'right leg',.1,.53,[.16,.43,0],dark);
  barBetween(g,[-.29,1.33,0],[-.45,.88,.06],.09,suit);
  barBetween(g,[.29,1.33,0],[.45,.87,.05],.09,suit);
  parent.add(g); return g;
}
function cone(parent,x,z) {
 const g = new THREE.Group(); g.position.set(x,.12,z);
 cylinder(g,'base',.19,.08,[0,.05,0],mat(0x142431));
 const m=new THREE.Mesh(new THREE.ConeGeometry(.15,.5,12),mat(0xff9d36)); m.position.y=.33;g.add(m);
 cylinder(g,'reflective band',.084,.055,[0,.34,0],mat(0xfff5dc)); parent.add(g);
}
function arrow(parent,x,z,matte,rot=0) {
 const g=new THREE.Group();g.position.set(x,.145,z);g.rotation.y=rot;
 box(g,'arrow spine',[.11,.012,.54],[0,0,0],matte,false);
 box(g,'arrow barb',[.12,.012,.38],[-.13,0,-.27],matte,false).rotation.y=Math.PI/4;
 box(g,'arrow barb',[.12,.012,.38],[.13,0,-.27],matte,false).rotation.y=-Math.PI/4;
 parent.add(g);return g;
}

export default function createSafetyWorld({canvas, onChoose, onMarkers, onWebGLError}) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:"high-performance"}); }
  catch(err) { if(onWebGLError) onWebGLError(err); return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.54;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(C.bg,0);
  const scene=new THREE.Scene(); scene.fog=new THREE.FogExp2(C.bg,.025);
  const camera=new THREE.PerspectiveCamera(39,1,.1,120);
  camera.position.set(16,15.3,18);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping=true;controls.dampingFactor=.065;controls.enablePan=false;
  controls.minDistance=10;controls.maxDistance=34;
  controls.minPolarAngle=.30;controls.maxPolarAngle=Math.PI/2.09;
  controls.target.set(0,1,0);
  controls.update();

  scene.add(new THREE.HemisphereLight(0x9edcff,0x0b1629,1.9));
  const sun=new THREE.DirectionalLight(0xe2f5ff,3.3);sun.position.set(9,18,11);sun.castShadow=true;
  sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-17;sun.shadow.camera.right=17;
  sun.shadow.camera.top=17;sun.shadow.camera.bottom=-17;sun.shadow.bias=-.0002;scene.add(sun);
  const warm=new THREE.PointLight(C.amber,38,17,2);warm.position.set(-5,6,-3);scene.add(warm);
  const cool=new THREE.PointLight(C.cyan,26,15,2);cool.position.set(5,6,3);scene.add(cool);
  const floorMat=mat(C.floor,.83,.06), frameMat=mat(C.steel,.52,.62), dark=mat(C.dark,.8,.2);
  const yellow=mat(0xe7b850,.68,.05), safety=mat(C.green,.6,.2,C.green,.19);
  const azure=mat(C.cyan,.44,.34,C.cyan,.12);
  const red=mat(C.danger,.52,.23,C.danger,.22);
  const white=mat(C.white,.79,.1);
  const base=new THREE.Group();scene.add(base);
  box(base,'floating facility footprint',[16,.5,11.6],[0,-.25,0],mat(C.slab,.79,.23));
  box(base,'main floor',[15.35,.14,11],[0,.08,0],floorMat);
  const edgeL=mat(C.cyan,.48,.42,C.cyan,.45);
  [ [-7.8,-5.5,7.8,-5.5],[7.8,-5.5,7.8,5.5],[7.8,5.5,-7.8,5.5],[-7.8,5.5,-7.8,-5.5] ].forEach(a=>line(base,[[a[0],.22,a[1]],[a[2],.22,a[3]]],C.cyan,.65));
  for(let x=-7;x<=7;x+=1){line(base,[[x,.16,-5.3],[x,.16,5.3]],0x426171,.18)}
  for(let z=-5;z<=5;z+=1){line(base,[[-7.5,.16,z],[7.5,.16,z]],0x426171,.18)}
  // Illuminated aisle down center and zebra crossings.
  box(base,'shared vehicle aisle',[15.0,.017,2.55],[0,.163,.45],mat(0x24333c,.94,.03),false);
  line(base,[[-7.35,.178,-.88],[7.35,.178,-.88]],C.amber,.9);
  line(base,[[-7.35,.178,1.82],[7.35,.178,1.82]],C.amber,.9);
  for(let x=-6.6;x<6.9;x+=1.2) box(base,'lane marking',[.58,.018,.09],[x,.186,.43],yellow,false);
  // Loading dock, canopy and decorative plant machinery.
  for(const x of [-7.1, -1, 5.85]) {
    box(base,'mast',[.18,4.3,.18],[x,2.25,-5.06],frameMat);
  }
  box(base,'roof front edge',[13.8,.15,.27],[-.64,4.45,-5.06],frameMat);
  for(let x=-5.6;x<=5.7;x+=1.15) box(base,'roof lattice',[.05,.07,.3],[x,4.43,-5.03],azure,false);
  // Gantry crane and suspended heavy cargo.
  const crane = new THREE.Group();crane.position.set(-3.65,0,-2.78);base.add(crane);
  for(let x of [-1.4,1.4]){
    for(let z of [-1.05,1.05]) box(crane,'gantry leg',[.22,5,.22],[x,2.62,z],frameMat);
    box(crane,'gantry horizontal',[.26,.27,2.36],[x,5.05,0],yellow);
  }
  box(crane,'gantry beam',[3.35,.34,.35],[0,5.3,0],yellow);
  box(crane,'hoist',[.85,.5,.7],[0,4.8,0],dark);
  const suspended = new THREE.Group();crane.add(suspended);
  const ropeMat=mat(0x899da6,.4,.7);
  for(let x of [-.32,.32])barBetween(suspended,[x,4.59,0],[x,3.2,0],.028,ropeMat);
  box(suspended,'unsecured suspended load',[1.3,.64,1.12],[0,2.84,0],mat(0xb57541,.71,.17));
  box(suspended,'cargo strap',[1.37,.045,.07],[0,3.17,0],yellow);
  const craneControl = new THREE.Group();crane.add(craneControl);
  for(let x=-1.7;x<=1.7;x+=.8)cone(craneControl,x,1.85);
  const craneBoundary=mat(C.green,.45,.3,C.green,.4);
  line(craneControl,[[-1.85,.23,1.65],[1.85,.23,1.65],[1.85,.23,-1.3],[-1.85,.23,-1.3],[-1.85,.23,1.65]],C.green,.95);
  // Lift truck: model wheels, forks, cage and colored body.
  const forklift=new THREE.Group();forklift.position.set(2.6,.13,.43);forklift.rotation.y=-.25;base.add(forklift);
  box(forklift,'forklift carriage',[1.8,.45,1.05],[0,.61,0],mat(0xefaa2b,.63,.2));
  box(forklift,'rear engine',[.8,.81,1.1],[.59,.92,0],yellow);
  for(const x of [-.64,.66])for(const z of [-.53,.53]) {
    const wheel=cylinder(forklift,'tire',.24,.18,[x,.25,z],dark,16);wheel.rotation.x=Math.PI/2;
  }
  for(let x of [-.6,.44])box(forklift,'cab upright',[.08,1.72,.08],[x,1.67,0],frameMat);
  box(forklift,'cab roof',[1.28,.1,.96],[-.08,2.53,0],frameMat);
  box(forklift,'mast',[.15,1.75,1.12],[-1,1.44,0],frameMat);
  for(const z of [-.37,.37])box(forklift,'fork prong',[1.4,.07,.14],[-1.62,.21,z],ropeMat);
  worker(base,1.1,-.93,0xf5c953);
  const trafficControl=new THREE.Group();base.add(trafficControl);
  for(let z of [-.68,1.88]) {
    for(let x=1.0;x<=5.5;x+=1.2)cone(trafficControl,x,z);
  }
  for(let x=1;x<=5;x+=1.4)arrow(trafficControl,x,1.22,safety,-Math.PI/2);
  // High voltage cabinet / guarded transformer.
  const power=new THREE.Group();power.position.set(5.25,0,-2.73);base.add(power);
  box(power,'service plinth',[2.12,.35,1.7],[0,.18,0],dark);
  box(power,'electrical cabinet',[1.58,2.55,1.07],[0,1.67,0],mat(0x476576,.59,.45));
  const cabinetDoor=box(power,'cabinet face',[1.64,2.37,.08],[0,1.67,.57],mat(0x547486,.67,.3));
  for(let y=1.35;y<2.7;y+=.37)box(power,'vent grille',[1,.035,.032],[0,y,.616],dark,false);
  const warning=led(power,[0,2.58,.67],C.danger,.15);
  const voltageBolt=new THREE.Group();power.add(voltageBolt);
  line(voltageBolt,[[.3,2.3,.66],[.03,1.9,.66],[.3,1.92,.66],[.03,1.43,.66]],C.amber,1);
  const electricControl=new THREE.Group();power.add(electricControl);
  const lock=box(electricControl,'closed protective panel',[1.67,2.4,.16],[0,1.67,.73],mat(0x2a5560,.42,.54));
  box(electricControl,'lockout box',[.43,.43,.2],[0,1.93,.9],safety);
  led(electricControl,[0,2.6,.86],C.green,.1);
  for(let x of [-.95,.95])cone(electricControl,x,1.22);
  // Emergency exit: sightlines and blocked doorway.
  const exit=new THREE.Group();exit.position.set(-5,0,4.28);base.add(exit);
  box(exit,'back wall',[3.5,3,.22],[0,1.6,.62],mat(0x355261,.66,.4));
  box(exit,'exit frame',[1.58,2.4,.2],[0,1.31,.48],frameMat);
  box(exit,'exit door',[1.24,2.13,.17],[0,1.2,.62],mat(0x326c62,.73,.2));
  box(exit,'exit sign',[1.7,.38,.21],[0,2.69,.55],mat(C.green,.5,.19,C.green,.28));
  led(exit,[.45,1.4,.76],C.green,.07);
  const obstruction=new THREE.Group();exit.add(obstruction);
  for(const [x,z,y] of [[-.85,-.8,.55],[.1,-1.2,.47],[.6,-.48,.5]])box(obstruction,'obstructing boxes',[.93,y*2,.8],[x,y+.16,z],mat(0x98724f,.83,.06));
  const exitControl=new THREE.Group();exit.add(exitControl);
  for(let z of [-2.1,-1.45,-.8])arrow(exitControl,0,z,safety,Math.PI);
  // Additional visual detail: valves, racks and piping.
  const pipes=new THREE.Group();base.add(pipes);
  for(const x of [-.8,.3])box(pipes,'process tank',[.7,1.55,.7],[x,.88,-3.75],mat(0x557587,.43,.6));
  for(const x of [-.8,.3])cylinder(pipes,'tank top',.4,.11,[x,1.72,-3.75],frameMat);
  barBetween(pipes,[-.8,1.25,-3.75],[.3,1.25,-3.75],.08,azure);
  for(let x of [-1.2,.6])cylinder(pipes,'work light',.12,3.5,[x,1.93,3.1],frameMat);
  for(const x of [-1.2,.6]){
    const lamp=led(pipes,[x,3.73,3.1],C.cyan,.17);
    const pl=new THREE.PointLight(C.cyan,3,3);pl.position.copy(lamp.position);pipes.add(pl);
  }
  worker(base,-1.6,2.3,C.white,true);
  // Perimeter atmosphere rings / scan field.
  const torus=new THREE.Mesh(new THREE.TorusGeometry(8.4,.012,3,140),new THREE.MeshBasicMaterial({color:C.cyan,transparent:true,opacity:.3}));
  torus.rotation.x=-Math.PI/2;torus.position.y=-.61;scene.add(torus);
  const torus2=new THREE.Mesh(new THREE.TorusGeometry(9.45,.012,3,140),new THREE.MeshBasicMaterial({color:C.cyan,transparent:true,opacity:.12}));
  torus2.rotation.x=-Math.PI/2;torus2.position.y=-.61;scene.add(torus2);
  const markerGroup=new THREE.Group();scene.add(markerGroup);
  const markers=[];const rayTargets=[];
  HAZARDS.forEach(h=>{
    const root=new THREE.Group();root.position.set(...h.pos); markerGroup.add(root);
    const bulb=new THREE.Mesh(new THREE.OctahedronGeometry(.28,0),new THREE.MeshBasicMaterial({color:C.danger}));
    bulb.userData.hazardId=h.id;root.add(bulb);rayTargets.push(bulb);
    const circle=new THREE.Mesh(new THREE.TorusGeometry(.5,.025,6,36),new THREE.MeshBasicMaterial({color:C.danger,transparent:true,opacity:.87}));
    circle.rotation.x=Math.PI/2;root.add(circle);markers.push({id:h.id,root,bulb,circle,at:new THREE.Vector3(...h.pos)});
    line(base,[[h.pos[0],.2,h.pos[2]],[...h.pos]],C.danger,.5);
    glowDisc(base,[h.pos[0],.21,h.pos[2]],.82,C.danger,.15);
  });
  const controlGroups={crane:craneControl,traffic:trafficControl,electric:electricControl,exit:exitControl};
  let mitigated=[];let active="crane";let desired=null;let animFrame=0;let elapsed=0;let lastTime=0;
  let disposed=false;let spinning=false;
  const reducedMotion=window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse=new THREE.Vector2(), raycaster=new THREE.Raycaster();
  const pointerDown={x:0,y:0};
  function pick(e) {
    const rect=canvas.getBoundingClientRect();
    const mx=(e.clientX-rect.left)/rect.width*2-1;
    const my=-(e.clientY-rect.top)/rect.height*2+1;
    mouse.set(mx,my);raycaster.setFromCamera(mouse,camera);
    const hit=raycaster.intersectObjects(rayTargets,false)[0];
    if(hit && hit.object.userData.hazardId && onChoose)onChoose(hit.object.userData.hazardId);
  }
  function down(e){pointerDown.x=e.clientX;pointerDown.y=e.clientY;}
  function up(e){if(Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y)<9)pick(e);}
  canvas.addEventListener("pointerdown",down);canvas.addEventListener("pointerup",up);
  function resize() {
    if(disposed)return;
    const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);
    renderer.setSize(w,h,false);camera.aspect=w/h;
    camera.fov=w<600?48:39;camera.updateProjectionMatrix();
  }
  const observer = typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;
  if(observer)observer.observe(canvas);
  window.addEventListener('resize',resize);resize();
  controls.addEventListener("start",()=>{desired=null;spinning=false;});
  function updateState() {
    for(const k of Object.keys(controlGroups))controlGroups[k].visible=mitigated.includes(k);
    obstruction.visible=!mitigated.includes('exit');
    voltageBolt.visible=!mitigated.includes('electric');warning.material.color.setHex(mitigated.includes('electric')?C.green:C.danger);
    lock.visible=mitigated.includes('electric');
    markers.forEach(m=>{const color=mitigated.includes(m.id)?C.green:C.danger;
      m.bulb.material.color.setHex(color);m.circle.material.color.setHex(color);
      m.root.scale.setScalar(m.id===active?1.26:.92);
    });
  }
  updateState();
  function animate(t) {
    if(disposed)return;
    animFrame=requestAnimationFrame(animate);
    if(document.hidden)return;
    const dt=Math.min(.04,(t-lastTime)/1000 || .016);lastTime=t;elapsed+=dt;
    if(desired){camera.position.lerp(desired.pos,Math.min(1,dt*2.2));controls.target.lerp(desired.target,Math.min(1,dt*2.2));
      if(camera.position.distanceTo(desired.pos)<.09)desired=null;}
    if(spinning&&!reducedMotion){camera.position.applyAxisAngle(new THREE.Vector3(0,1,0),dt*.13);}
    markers.forEach((m,i)=>{m.root.position.y=m.at.y+(reducedMotion?0:Math.sin(elapsed*2.8+i*.8)*.10);
      if(!reducedMotion){m.bulb.rotation.y=elapsed*.66;m.circle.rotation.z=elapsed*.45;}
      m.bulb.scale.setScalar(m.id===active?1.07+(reducedMotion?0:Math.sin(elapsed*4)*.13):.96);
    });
    // Operating machinery motion illustrates a live environment.
    suspended.position.y=mitigated.includes("crane") ? 0.65+(reducedMotion?0:.04*Math.sin(elapsed*1.6)) : (reducedMotion?0:.04*Math.sin(elapsed*1.2));
    forklift.position.x=2.6+(reducedMotion?0:Math.sin(elapsed*.7)*.22);
    torus.material.opacity=reducedMotion?.26:.26+.08*Math.sin(elapsed);
    controls.update();
    renderer.render(scene,camera);
    if(onMarkers){const r=canvas.getBoundingClientRect(); if(r.width && r.height) {
      const pins=markers.map(m=>{const p=m.root.position.clone().project(camera);
        return {id:m.id,x:(p.x*.5+.5)*r.width,y:(-p.y*.5+.5)*r.height,visible:p.z<1&&p.x>=-1.2&&p.x<=1.2&&p.y>=-1.2&&p.y<=1.2};});
      onMarkers(pins);
    }}
  }
  animFrame=requestAnimationFrame(animate);
  function setMitigated(ids){mitigated=ids.slice();updateState();}
  function setActive(id){active=id;updateState();}
  function focus(id){const h=HAZARDS.find(x=>x.id===id);if(!h)return;
    const target=new THREE.Vector3(h.pos[0],1.1,h.pos[2]);
    const direction=new THREE.Vector3(10,9,12).normalize().multiplyScalar(12.2);
    desired={target,pos:target.clone().add(direction)}; setActive(id);
  }
  function overview(){desired={target:new THREE.Vector3(0,1,0),pos:new THREE.Vector3(16,15.3,18)};}
  function setOrbit(on){spinning=!!on;}
  function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(animFrame);
    canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointerup',up);
    window.removeEventListener('resize',resize);if(observer)observer.disconnect();controls.dispose();
    scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const all=Array.isArray(o.material)?o.material:[o.material];all.forEach(m=>m.dispose());}});
    renderer.dispose();
  }
  return {setMitigated,setActive,focus,overview,setOrbit,dispose};
}
