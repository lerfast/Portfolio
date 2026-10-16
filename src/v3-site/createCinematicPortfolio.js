import * as THREE from "three";

// A real Three.js camera travels around a single architectural sculpture as
// the V2 professional chapters enter the viewport. Decorative and optional:
// without WebGL, all portfolio information remains available as regular HTML.
const VIEWS = [
  [0, 3.3, 20, 0, 2.2, 0],     // hero: fly-in
  [9.8, 5, 17, 0, 2.1, 0],    // skills
  [4.8, 9, 16, 0, 3, 0],     // projects
  [-8, 4.6, 16, 0, 2.2, 0],  // safety
  [-4, 11, 20, 0, 3, 0],     // credentials
  [10, 8, 14, 0, 1.8, 0],    // drones
  [4.5, 2.2, 12.5, 0, 3, 0], // 3DGS
  [-9, 8, 16, 0, 2.1, 0],    // audiovisual
  [-5, 3.5, 13, 0, 2, 0],   // heritage
  [7, 12, 22, 0, 2, 0],      // blog
  [0, 4.5, 20, 0, 2.2, 0],  // contact
];

function material(color, opts) {
  return new THREE.MeshStandardMaterial({color, metalness: .52, roughness: .31, ...opts});
}
function addMesh(group, geometry, mat, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.position.set(x,y,z);
  group.add(mesh);
  return mesh;
}

export default function createCinematicPortfolio(canvas) {
  if (!canvas) return null;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" }); }
  catch (_) { return null; }
  renderer.setClearColor(0x050c20, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.6;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .2, 130);
  camera.position.set(0, 11.5, 33);
  const look = new THREE.Vector3(0, 2.5, 0);
  const sculpture = new THREE.Group();
  sculpture.position.set(3.6, 0, -2.7);
  scene.add(sculpture);
  const core = new THREE.Group();
  sculpture.add(core);
  const steel = material(0x0b2944), glass = material(0x30cbea, {transparent:true, opacity:.78, roughness:.1, metalness:.27, depthWrite:false});
  const warm = material(0xffa66f, {emissive:0x672419, emissiveIntensity:.16});
  const pale = material(0xf2f8ff, {metalness:.33, roughness:.27});
  const jade = material(0x5df0ce, {emissive:0x044637, emissiveIntensity:.25});
  addMesh(core,new THREE.IcosahedronGeometry(1.68,1),glass,0,3.35,0);
  addMesh(core,new THREE.OctahedronGeometry(.91),pale,0,3.35,0);
  const shield = addMesh(core,new THREE.TorusGeometry(3.35,.072,12,96),jade,0,3.35,0);
  shield.rotation.x = .29;
  const ring2 = addMesh(core,new THREE.TorusGeometry(2.47,.037,9,84),warm,0,3.35,0);
  ring2.rotation.y = .87;
  const ring3 = addMesh(core,new THREE.TorusGeometry(4.38,.02,8,120),glass,0,3.35,0);
  ring3.rotation.x=.98;ring3.rotation.y=.22;
  addMesh(core,new THREE.CylinderGeometry(3.35,3.85,.18,6),steel,0,.06,0).rotation.y=Math.PI/6;
  const columns = [ [-2.4,1.8,-1.1,.48,3.4,.48],[-1.5,1.2,1.4,.52,2.4,.55],[2.2,1.45,-1.1,.45,2.9,.45],[1.3,1.1,1.8,.56,2.1,.57],[0,2.1,-2.15,.42,4.0,.44] ];
  columns.forEach(([x,y,z,w,h,d],i) => {
    const geometry = new THREE.BoxGeometry(w,h,d);
    addMesh(core,geometry,i%2?warm:steel,x,y,z);
    addMesh(core,new THREE.BoxGeometry(w+.05,.09,d+.05),i%2?pale:jade,x,y+h/2,z);
  });
  for(let i=0;i<22;i++){
    const angle = (i/22)*Math.PI*2;
    const radius=5.45+(i%3)*.36;
    const pole=addMesh(sculpture,new THREE.BoxGeometry(.045,.55+i%3*.18,.045),i%4?glass:warm,Math.cos(angle)*radius,1.2+((i*7)%9)*.24,Math.sin(angle)*radius);
    pole.rotation.y=angle;
  }
  const particlesGeometry=new THREE.BufferGeometry();
  const count=90,coords=new Float32Array(count*3);
  for(let i=0;i<count;i++){
    const angle=i*2.39996, r=6.7+(i%9)*.68;
    coords[i*3]=Math.cos(angle)*r+3.6;
    coords[i*3+1]=.2+(i%14)*.68;
    coords[i*3+2]=Math.sin(angle)*r-2.7;
  }
  particlesGeometry.setAttribute("position",new THREE.BufferAttribute(coords,3));
  const points=new THREE.Points(particlesGeometry,new THREE.PointsMaterial({color:0x7bdff3,size:.05,transparent:true,opacity:.7}));
  scene.add(points);
  scene.add(new THREE.AmbientLight(0xb8dcff,1.3));
  const sun=new THREE.DirectionalLight(0xfff5de,3.1);sun.position.set(7,14,12);scene.add(sun);
  const cyan=new THREE.PointLight(0x2ed4f9,58);cyan.position.set(-5,6,3);scene.add(cyan);
  const coral=new THREE.PointLight(0xff976b,32);coral.position.set(6,4,-2);scene.add(coral);

  let width=0,height=0,desired=0,raf=0,last=0,frame=0,disposed=false;
  const targetPosition=new THREE.Vector3();
  const targetLook=new THREE.Vector3();
  const resize=()=>{
    const parent=canvas.parentNode;
    if(!parent) return;
    const w=Math.max(1,parent.clientWidth),h=Math.max(1,parent.clientHeight);
    if(w===width&&h===height)return;
    width=w;height=h;
    renderer.setSize(w,h,false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth<800?1.25:1.7));
    camera.aspect=w/h;camera.updateProjectionMatrix();
  };
  const render=timestamp=>{
    if(disposed)return;
    raf=requestAnimationFrame(render);
    if(document.hidden)return;
    if(timestamp-last<24)return; // ~40 fps max for a decorative background.
    const dt=Math.min(.06,(timestamp-last)/1000||.016);last=timestamp;
    frame+=dt;
    resize();
    const config=VIEWS[desired]||VIEWS[0];
    targetPosition.set(config[0],config[1],config[2]);
    targetLook.set(config[3],config[4],config[5]);
    camera.position.lerp(targetPosition,Math.min(1,dt*1.55));
    look.lerp(targetLook,Math.min(1,dt*1.75));
    camera.lookAt(look);
    core.rotation.y+=dt*.07;
    shield.rotation.z+=dt*.055;
    ring2.rotation.x+=dt*.085;
    ring3.rotation.y+=dt*.038;
    core.position.y=Math.sin(frame*.63)*.14;
    renderer.render(scene,camera);
  };
  resize();raf=requestAnimationFrame(render);
  return {
    setChapter(index){desired=Math.max(0,Math.min(VIEWS.length-1,Number(index)||0));},
    dispose(){
      disposed=true;cancelAnimationFrame(raf);
      scene.traverse(obj=>{
        if(obj.geometry)obj.geometry.dispose();
        if(obj.material){const mats=Array.isArray(obj.material)?obj.material:[obj.material];mats.forEach(m=>m.dispose());}
      });
      renderer.dispose();
      if(renderer.forceContextLoss)renderer.forceContextLoss();
    }
  };
}
