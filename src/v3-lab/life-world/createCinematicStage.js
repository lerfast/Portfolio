import * as THREE from 'three';

/**
 * A small, continuous architectural space for the pre-game experience.
 * This uses an actual moving PerspectiveCamera — never swaps screenshots.
 * It is separate from the gameplay scene and is disposed before the world loads.
 */
export default function createCinematicStage({ canvas, onError }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (error) { if (onError) onError(error); return null; }

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.innerWidth <= 700;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.1 : 1.45));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x092442, 0.013);
  const camera = new THREE.PerspectiveCamera(mobile ? 62 : 47, 1, 0.1, 180);
  const positions = {
    approach: { p: [-3.6, 5.5, 31], l: [-2, 2, -1] },
    language: { p: [-3.0, 4.2, 14.4], l: [-1, 2, -2] },
    intro: { p: [8.5, 4.9, -1.0], l: [6.4, 2.8, -13.7] },
    profile: { p: [8.6, 3.65, -7.4], l: [6, 2.4, -14.3] },
    languageModal: { p: [-2.2, 3.7, 11], l: [-1, 2.4, -2] },
    portal: { p: [6.6, 2.3, -30.5], l: [6, 2.4, -39] }
  };
  // Ten physically separated gallery stops. The same PerspectiveCamera moves
  // through this corridor as visitors change professional chapters, not via
  // screenshots or a CSS-only fade. Gameplay stays a distinct, optional world.
  const professionalStops = [
    'skills','projects','commitment','certs','drone-operations',
    'gaussian-splatting','cycling','mission-patrimonio','blogs','contact'
  ];
  professionalStops.forEach((id,index)=>{
    const z = -54-index*15;
    positions[`folio:${id}`] = {
      p: [2.4+Math.sin(index*.7)*.9,4.7+Math.sin(index*.45)*.3,z+12],
      l: [2.9,3.0,z]
    };
  });
  const vec = values => new THREE.Vector3(...values);
  const currentLook = vec(positions.approach.l);
  camera.position.copy(vec(positions.approach.p)); camera.lookAt(currentLook);
  let start = performance.now();
  let duration = reduce ? 0 : 2050;
  let sourcePos = camera.position.clone(), sourceLook = currentLook.clone();
  let targetPos = vec(positions.language.p), targetLook = vec(positions.language.l);
  let active = true, frame = 0, clock = 0, lastRender = 0, mouseX = 0, mouseY = 0;

  const mat = (color, metal = .2, rough = .55, opacity = 1) =>
    new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough, transparent: opacity < 1, opacity, depthWrite: opacity === 1, side: THREE.DoubleSide });
  const metal = mat(0xb6dbea, .7, .31), navy = mat(0x143654, .5, .39);
  const ice = mat(0x37c9ee, .48, .3), glow = new THREE.MeshBasicMaterial({ color: 0x5be2ff, transparent: true, opacity: .83 });
  const warm = mat(0xf9c68a, .38, .34);
  const glass = mat(0x4a9ec1, .5, .19, .17);
  const floor = mat(0x13385b, .24, .43);
  const sceneItems = [];
  function box(parent, size, pos, material) {
    const o = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    o.position.set(...pos); parent.add(o); return o;
  }
  function ring(parent, radius, tube, material, position) {
    const o = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 10, 96), material);
    o.position.set(...position); parent.add(o); return o;
  }
  scene.add(new THREE.HemisphereLight(0xc8eaff, 0x05172b, 2.6));
  const sunlight = new THREE.DirectionalLight(0xffdbac, 2.7);
  sunlight.position.set(-11, 19, 20); scene.add(sunlight);
  const blueLamp = new THREE.PointLight(0x24c9f1, 55, 35); blueLamp.position.set(-4, 6, 0); scene.add(blueLamp);
  const goldLamp = new THREE.PointLight(0xfdbb71, 55, 39); goldLamp.position.set(9, 7, -17); scene.add(goldLamp);

  // One connected architectural setting with two chambers and a passage.
  box(scene, [47, .28, 72], [1, -.4, -18], floor);
  for (const x of [-9, -3, 3, 9, 15]) {
    const post = box(scene, [.24, 10, .27], [x, 4.8, -6], metal);
    post.material = navy;
    box(scene, [.12, .15, 27], [x, 9.8, -17], warm);
    box(scene, [.2, 2, .28], [x, 1.4, -6], metal);
  }
  // Room for language choice: a gallery of nested perspective frames.
  const frames = [];
  for (let i = 0; i < 6; i++) {
    const z = 5 - i * 3.7;
    const assembly = new THREE.Group(); assembly.position.set(-1, 0, z); scene.add(assembly);
    const scale = 1 + i * .12;
    const w = 11 * scale, h = 6 * scale;
    box(assembly, [.095, h, .13], [-w / 2, h / 2, 0], i % 2 ? metal : ice);
    box(assembly, [.095, h, .13], [w / 2, h / 2, 0], i % 2 ? metal : ice);
    box(assembly, [w, .11, .13], [0, h, 0], i % 2 ? metal : ice);
    frames.push(assembly);
  }
  // A real three-dimensional corridor towards the professional introduction.
  box(scene, [24, .1, 1.1], [4, .04, -12], metal).rotation.y = -.32;
  const introGroup = new THREE.Group(); introGroup.position.set(6, 0, -14); scene.add(introGroup);
  box(introGroup, [13, 7.5, .38], [0, 4.3, -3.8], navy);
  box(introGroup, [11.9, 6.5, .07], [0, 4.3, -3.54], glass);
  for (const x of [-5.7, -2.85, 0, 2.85, 5.7]) {
    box(introGroup, [.12, 7.2, .26], [x, 4.2, -3.35], metal);
  }
  for (const y of [1.55, 4.2, 6.85]) box(introGroup, [11.5, .1, .18], [0, y, -3.28], warm);
  const central = ring(introGroup, 2.45, .075, ice, [0, 4.1, -2.55]); central.rotation.y = .25;
  const inner = ring(introGroup, 1.66, .055, warm, [0, 4.1, -2.31]); inner.rotation.y = -.2;
  const sculpture = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), mat(0x7cc9e3, .75, .19));
  sculpture.position.set(0, 4.1, -2.25); introGroup.add(sculpture);
  sceneItems.push({ type: 'sculpture', mesh: sculpture }, { type: 'ring', mesh: central }, { type: 'ring', mesh: inner });

  // Professional wing. Repeating structural rhythm, individual sculptural
  // exhibits and colored reflections preserve depth across all ten camera shots.
  const wing = new THREE.Group(); scene.add(wing);
  box(wing, [24,.20,161], [5,-.29,-118], floor);
  const accentColors=[0x4be7ef,0xffac88,0x80e8b9,0xffca80,0x53ddf1,0xaf9aff,0xffa38a,0xffcf8c,0xbca9ff,0x76eabe];
  professionalStops.forEach((id,index)=>{
    const z=-54-index*15;
    const group=new THREE.Group(); group.position.set(8,0,z); wing.add(group);
    const accent=mat(accentColors[index],.48,.3);
    const pillar=box(group,[.35,7.1,.45],[-5.4,3.5,-1.3],navy);
    box(group,[11,.20,.55],[0,7.05,-1.3],metal);
    box(group,[11,.12,.40],[0,.55,-1.3],accent);
    box(group,[.35,7.1,.45],[5.4,3.5,-1.3],navy);
    box(group,[4.3,.65,3],[0,.35,-.6],navy);
    box(group,[3.8,.11,2.9],[0,.71,-.6],accent);
    const sculpture=new THREE.Mesh(
      index%3===0?new THREE.IcosahedronGeometry(1.6,1):index%3===1?new THREE.OctahedronGeometry(1.7,1):new THREE.TorusKnotGeometry(1.15,.37,50,6),
      mat(accentColors[index],.65,.26)
    );
    sculpture.position.set(0,3.48,0);group.add(sculpture);
    const orbit=ring(group,2.55,.06,accent,[0,3.6,-.15]); orbit.rotation.y=.19+index*.18;
    const second=ring(group,3.2,.028,metal,[0,3.6,-.28]);second.rotation.x=.23;
    box(group,[.15,5.1,2],[-7,2.5,-3.5],glass);
    sceneItems.push({type:'sculpture',mesh:sculpture},{type:'ring',mesh:orbit});
    // A restrained, local accent light; the long corridor stays inexpensive.
    const glowLamp=new THREE.PointLight(accentColors[index],8,11,2);
    glowLamp.position.set(0,5.0,1.8);group.add(glowLamp);
  });

  // Portal remains a physical part of the scene, not a screen-flash transition.
  const threshold = new THREE.Group(); threshold.position.set(6.5, 0, -29); scene.add(threshold);
  for (const x of [-3.2, 3.2]) box(threshold, [.5, 7.8, .6], [x, 3.9, 0], metal);
  box(threshold, [7, .65, .65], [0, 7.75, 0], metal);
  const portalLight = ring(threshold, 2.7, .075, glow, [0, 3.9, -.06]); portalLight.rotation.y = .09;
  sceneItems.push({ type: 'ring', mesh: portalLight });
  const dustGeometry = new THREE.BufferGeometry();
  const count = mobile ? 80 : 150, coords = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    coords[i * 3] = -12 + (i % 19) * 1.5;
    coords[i * 3 + 1] = 1 + (i * 7 % 20) * .48;
    coords[i * 3 + 2] = -38 + (i * 13 % 52) * 1.05;
  }
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(coords, 3));
  const dots = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0x8ce9ff, size: .085, sizeAttenuation: true, transparent: true, opacity: .75 })); scene.add(dots);

  function resize() {
    if (!active) return;
    const w = Math.max(2, canvas.clientWidth), h = Math.max(2, canvas.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.fov = w < 750 ? 64 : 47;
    camera.updateProjectionMatrix();
  }
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  if (observer) observer.observe(canvas);
  window.addEventListener('resize', resize); resize();
  function onPointer(e) { mouseX = THREE.MathUtils.clamp((e.clientX / Math.max(window.innerWidth, 1) - .5) * 2, -1, 1); mouseY = THREE.MathUtils.clamp((e.clientY / Math.max(window.innerHeight, 1) - .5) * 2, -1, 1); }
  window.addEventListener('pointermove', onPointer, { passive: true });

  function flyTo(name, ms = 1100) {
    let selected = positions[name] || positions.intro;
    if (name && name.startsWith('profile:')) {
      const keys=['capabilities','osh','projects','credentials','drones','studio','heritage','contact'];
      const i = Math.max(0, keys.indexOf(name.slice(8)));
      selected = {p:[positions.profile.p[0] + Math.sin(i*.75)*.9, positions.profile.p[1] + Math.cos(i*.5)*.26, positions.profile.p[2] + Math.cos(i*.55)*.8], l:[6+Math.sin(i*.5)*1.4,2.4,-14.3]};
    }
    sourcePos.copy(camera.position); sourceLook.copy(currentLook);
    targetPos = vec(selected.p); targetLook = vec(selected.l);
    start = performance.now(); duration = reduce ? 0 : ms;
    if (duration === 0) { camera.position.copy(targetPos); currentLook.copy(targetLook); camera.lookAt(currentLook); }
  }
  function render(now) {
    if (!active) return;
    frame = requestAnimationFrame(render);
    if (document.hidden) { clock = now; return; }
    // Cap the pre-game decorative scene at ~30 FPS on touch devices.
    if (mobile && now - lastRender < 31) return;
    lastRender = now;
    const dt = Math.min(.05, (now - clock) / 1000 || .016); clock = now;
    const t = duration ? THREE.MathUtils.clamp((now - start) / duration, 0, 1) : 1;
    const eased = t * t * (3 - 2 * t);
    camera.position.copy(sourcePos).lerp(targetPos, eased);
    currentLook.copy(sourceLook).lerp(targetLook, eased);
    const wobble = reduce ? 0 : Math.min(.065, dt * 1.6);
    if (wobble) camera.position.x += mouseX * .16 * eased;
    if (wobble) camera.position.y += -mouseY * .10 * eased;
    camera.lookAt(currentLook);
    if (!reduce) {
      sculpture.rotation.y += dt * .14;
      central.rotation.z += dt * .05;
      inner.rotation.z -= dt * .07;
      dots.rotation.y = Math.sin(now * .00008) * .011;
    }
    renderer.render(scene, camera);
  }
  frame = requestAnimationFrame(render);
  return {
    flyTo,
    dispose() {
      active = false; cancelAnimationFrame(frame);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) { const mats = Array.isArray(o.material) ? o.material : [o.material]; mats.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); }); }
      });
      renderer.dispose();
    }
  };
}
