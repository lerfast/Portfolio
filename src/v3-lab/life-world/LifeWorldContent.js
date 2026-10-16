/* LER LIFE WORLD · Hito 1. Shared scene metadata and fully bilingual content. */
/* Coordinates are the single source of truth for the 3D campus and its HTML map.
 * yaw rotates each building so the front (+Z local) faces the main approach.
 * All labels, markers, risk stations and teleports derive from these positions. */
export const PLACES = [
  { id:'capabilities', x:0, z:-22, width:15, depth:12, yaw:0, label:{en:'Capabilities Plaza',es:'Plaza de competencias'},index:'01',kind:'core'},
  { id:'osh', x:0, z:-56, width:24, depth:19, yaw:0, label:{en:'Oshlix Safety Center',es:'Centro de Prevención Oshlix'},index:'02',kind:'primary'},
  { id:'projects', x:34, z:-26, width:16, depth:14, yaw:-Math.PI/2, label:{en:'Software Gallery',es:'Galería de Software'},index:'03',kind:'core'},
  { id:'credentials', x:-34, z:-26, width:16, depth:14, yaw:Math.PI/2, label:{en:'Credentials & Resume',es:'Formación y CV'},index:'04',kind:'core'},
  { id:'drones', x:43, z:15, width:17, depth:17, yaw:-Math.PI/2, label:{en:'Aerial Operations',es:'Operaciones Aéreas'},index:'05',kind:'outdoor'},
  { id:'studio', x:31, z:50, width:17, depth:15, yaw:Math.PI, label:{en:'Visual Production',es:'Producción Audiovisual'},index:'06',kind:'specialty'},
  { id:'heritage', x:-31, z:50, width:17, depth:15, yaw:Math.PI, label:{en:'Misión Patrimonio',es:'Misión Patrimonio'},index:'07',kind:'specialty'},
  { id:'contact', x:0, z:66, width:15, depth:12, yaw:Math.PI, label:{en:'Connect',es:'Conectemos'},index:'08',kind:'core'}
];
/* The map and the Three.js walkways share these paths. */
export const CAMPUS_PATHS = [
 [[0,0],[0,-13]],[[0,0],[-14,-9]],[[-14,-9],[-15,-35]],[[-15,-35],[0,-44]],
 [[0,0],[15,-8]],[[15,-8],[23,-25]],[[0,0],[-15,-8]],[[-15,-8],[-23,-25]],
 [[0,0],[19,8]],[[19,8],[32,15]],[[0,0],[12,23]],[[12,23],[31,41]],
 [[0,0],[-12,23]],[[-12,23],[-31,41]],[[0,0],[0,26]],[[0,26],[0,58]],
 [[31,41],[31,32]],[[0,58],[0,41]]
];
export const RISKS = [
  {id:'lift',x:-5,z:-56,en:{name:'Suspended load',description:'An active lifting zone exposes people to the movement or fall of a suspended load.',measure:'Establish a controlled exclusion zone',result:'The virtual load rests on its support and a controlled exclusion area appears. Real lifting operations require an authorized plan, suitable equipment and field verification.'},es:{name:'Carga suspendida',description:'La zona de izaje expone a las personas al desplazamiento o caída de una carga suspendida.',measure:'Establecer una zona de exclusión controlada',result:'La carga virtual desciende a su apoyo y aparece una zona de exclusión. En la realidad se requiere un plan de izaje autorizado, equipos apropiados y verificación en campo.'}},
  {id:'traffic',x:5,z:-56,en:{name:'Vehicle / pedestrian conflict',description:'Pedestrians and industrial traffic are sharing a work area without separation.',measure:'Separate pedestrian and vehicle routes',result:'The virtual vehicle stops and barriers separate the pedestrian route. Real site traffic management must be assessed, implemented and inspected.'},es:{name:'Interacción vehículo / peatón',description:'Peatones y vehículos industriales comparten una zona de trabajo sin separación.',measure:'Separar físicamente rutas peatonales y vehiculares',result:'El vehículo virtual se detiene y aparecen barreras que separan la ruta peatonal. La gestión real del tránsito debe evaluarse, implementarse y verificarse.'}},
  {id:'exit',x:-5,z:-49,en:{name:'Blocked emergency exit',description:'Stored materials obstruct a route intended for evacuation.',measure:'Remove obstructions and mark the exit',result:'The boxes move into a storage area and the evacuation route becomes visible. Emergency exits must be checked regularly and kept accessible.'},es:{name:'Salida de emergencia obstruida',description:'Material almacenado obstruye una vía prevista para evacuación.',measure:'Retirar obstáculos y señalizar la salida',result:'Las cajas pasan a una zona de almacenamiento y se visualiza la ruta de evacuación. Las salidas deben revisarse periódicamente y permanecer accesibles.'}}
];
export function placeEntrance(place,distance=2.2){
 const step=place.depth/2+distance,yaw=place.yaw||0;
 return {x:place.x+Math.sin(yaw)*step,z:place.z+Math.cos(yaw)*step};
}
export const LINKS = Object.freeze({
  oshlix:'https://www.oshlix.com',
  github:'https://github.com/lerfast',
  linkedin:'https://www.linkedin.com/in/luisemiliorojas/',
  resume:'https://drive.google.com/file/d/16KOJpFXgMhibKc7grFxfytRfSmcaQaFT/view?usp=drive_link',
  arepas:'https://lerfast.github.io/arepas-mas-corp/',
  catacafe:'https://lerfast.github.io/cata-cafe/',
  budget:'https://github.com/lerfast/Module5-Capstone-budget-app?tab=readme-ov-file',
  youtube:'https://www.youtube.com/@rojastech1',
  trailer:'https://www.youtube.com/watch?v=xCqegWZJdUY',
  laGaitana:'https://superspl.at/scene/5ccc87ed',
  laGaitanaEmbed:'https://superspl.at/s?id=5ccc87ed',
  email:'luisemiliorojas@hotmail.com',
  whatsapp:'https://wa.me/573187757620'
});
export const COPY = {
 en: {
   modelType:'EIFFEL TOWER · INTERACTIVE 3D MODEL',modelTruth:'Explore an artistic digital model of a famous landmark. Real 3DGS capture: La Gaitana, in my 3DGS portfolio.',modelControls:'DRAG / ARROW KEYS TO ORBIT · SCROLL / +/− TO ZOOM',modelPrompt:'Explore the model and select a highlighted point',conceptAria:'Interactive artistic model of the Eiffel Tower, not a photogrammetric capture',conceptLabel:'PARIS · ARCHITECTURE · 360° VIEW',animatedModel:'INTERACTIVE 3D',monumentPoints:['The Eiffel Tower arches','Observation decks','The summit and spire'],sectionsMenu:'EXPLORE SECTIONS',directNavLabel:'Direct portfolio navigation',direct3dgs:'3DGS & REAL TOURS',directOshlix:'OSHLIX',directContact:'CONTACT',quickContact:'CONTACT ME',real3dgsLink:'VIEW AUTHENTIC 3DGS · LA GAITANA',professionalIdentity:'PROFESSIONAL PROFILE',exploreMyAreas:'DISCOVER MY WORK',areaDetail:'PROFESSIONAL AREA',runMobile:'RUN',
   choose:'CHOOSE YOUR LANGUAGE',chooseSub:'Select the language of your experience. You can change it at any time.',english:'CONTINUE IN ENGLISH',spanish:'CONTINUAR EN ESPAÑOL',remembered:'Your last selection',lang:'Language',language:'Language selection',
   identity:'PROFESSIONAL PORTFOLIO · A DIFFERENT PERSPECTIVE',hello:'HI, I\'M',first:'LUIS',last:'EMILIO ROJAS',
   profession1:'BUSINESS ADMINISTRATOR',profession2:'OCCUPATIONAL HEALTH & SAFETY MANAGEMENT SPECIALIST',profession3:'SOFTWARE DEVELOPER',
   proposition:'I connect management, workplace safety and software engineering to create technology with a purpose.',
   mission:'Better decisions. Safer work. People first.',detail:'A professional journey told through spaces you can enter, explore and transform.',
   professionalTour:'EXPLORE MY PORTFOLIO',optionalGame:'ENTER MY WORLD · OPTIONAL GAME',
   enter:'ENTER MY WORLD',quick:'PROFESSIONAL OVERVIEW',discover:'MOVE THE CURSOR TO EXPLORE',introSkip:'SKIP TO EXPLORATION',subtitle:'AN INTERACTIVE PROFESSIONAL UNIVERSE',scroll:'MOVE / EXPLORE',
   loading:'BUILDING YOUR ARRIVAL',loadingHint:'Preparing the spaces and interactive world…',transition:'STEP INTO THE EXPERIENCE',
   welcome:'WELCOME TO MY WORLD',welcomeLead:'Eight connected spaces. Real work. Interactive ideas. The route is yours.',welcomeBody:'Explore my professional foundation first, then discover technology, aerial operations, audiovisual production and documentary work. Every space can be reached from the map.',
   explore:'START EXPLORING',tutorial:'CONTROLS & ORIENTATION',help:'HOW TO MOVE',skipTutorial:'SKIP TUTORIAL',helpLater:'REOPEN HELP',
   walk:'W A S D / ARROWS',walkD:'Move through the world',camera:'DRAG / TOUCH',cameraD:'Look up, down, left and right',run:'SHIFT',runD:'Run',act:'E / CLICK',actD:'Interact with nearby markers',escape:'ESC',escapeD:'Close panel or help',mapTitle:'EXPLORE THE CAMPUS',mapDescription:'Use the map for quick travel. No challenges are required to view professional information.',map:'MAP',close:'CLOSE',contact:'CONTACT',quickTitle:'PROFESSIONAL OVERVIEW',resume:'VIEW RESUME',github:'GITHUB',linkedin:'LINKEDIN',email:'EMAIL ME',overview:'MY WORK',
   profile:'Business Administrator · Occupational Health & Safety Management Specialist · Software Developer',
   introQuick:'Professional information is always accessible, even if you prefer not to navigate the world.',
   near:'NEARBY',press:'PRESS E',interact:'INTERACT',travel:'TRAVEL HERE',back:'BACK TO THE WORLD',backToPortfolio:'BACK TO PROFESSIONAL PORTFOLIO',position:'POSITION',restart:'RESET SAFETY SCENARIOS',completed:'CONTROLS',safety:'SAFETY CONCEPT EXPERIENCE',
   capabilityDescription:'A space for my skills across software, safety, management and spatial technology. Fully interactive workstations arrive in the next milestone.',
   oshDescription:'My main professional project: technology for workplace safety management and prevention. Explore a conceptual 3D risk-control scenario—this is not a live Oshlix assessment.',
   projectsDescription:'Work developed with React, Ruby on Rails and other software technologies. See real examples and source repositories.',
   credentialsDescription:'Business administration, occupational safety and full-stack development education, plus a valid professional UAS pilot license (Aerocivil Colombia).',
   dronesDescription:'Aerial operations, a valid professional UAS drone pilot license (Aerocivil Colombia), photogrammetry, 360° capture and 3D reconstruction.',
   studioDescription:'Video editing, documentary storytelling, DaVinci Resolve Studio and authentic Ride & Fly projects.',
   heritageDescription:'A documentary journey across Colombia and Ecuador, later extended through interactive 3D reconstructions.',
   contactDescription:'Contact me directly to discuss software, occupational safety or technical projects.',
   safetyGuideLabel:'INTERACTIVE TRAINING / 3 CELLS',safetyGuideTitle:'Prevent before it happens',safetyGuideIntro:'Choose a workstation, walk into the safety lab, inspect the hazard and apply a preventive control. The 3D scene changes when you act.',safetyControlDone:'CONTROL APPLIED · REVISIT',safetyInspectAction:'GO TO WORKSTATION',safetyStepsTitle:'Inspection stages',safetyObserve:'OBSERVE',safetyControl:'ACT',safetyVerify:'VERIFY',safetyBefore:'Hazard visible in the 3D scene. Select a preventive control to see the difference.',safetyNext:'INSPECT NEXT HAZARD',safetyAllDone:'ALL THREE STATIONS INTERVENED',safetyOshlixDisclaimer:'The safety simulation shown here is an independent portfolio demo, not an implemented Oshlix product feature.',
   inspection:'WORKSITE INSPECTION',risk:'OBSERVED HAZARD',apply:'APPLY PREVENTIVE CONTROL',applied:'CONTROL APPLIED',viewResult:'AFTER THE INTERVENTION',inspect:'INSPECT THE SITE',allDone:'THREE CONTROLS REPRESENTED',concept:'Illustrative portfolio simulation, not a certified risk assessment or a currently implemented Oshlix feature.',
   launch:'LAUNCH VIRTUAL DRONE',land:'LAND VIRTUAL DRONE',open3d:'EXPLORE REAL 3DGS',close3d:'EXIT 3D VIEWER',real3d:'Authentic La Gaitana reconstruction · Neiva, Colombia. Viewer loads only when requested.',
   openSite:'OPEN OFFICIAL SITE',project1:'AREPAS Y MÁS',project2:'CATA CAFÉ',project3:'BUDGET APP',video:'OPEN RIDE & FLY',trailer:'WATCH THE TRAILER',
   noWebgl:'3D rendering is not available in this browser. You can still explore my professional work right here.',retry:'TRY 3D AGAIN',alternate:'EXPLORE WITHOUT 3D',goThere:'EXPLORE SPACE',
   hud:'LER / PROFESSIONAL UNIVERSE',scene:'EXPLORE · INTERACT · DISCOVER',worldTitle:'THE WORLD IS YOUR MENU',onscreen:'Touch controls',rotate:'DRAG TO LOOK',touchMove:'MOVE',jump:'EXPLORE AREA',status:'LIVE EXPERIENCE',
   floatA:'MANAGEMENT / SYSTEMS',floatB:'SAFETY / ENGINEERING',floatC:'SOFTWARE / DESIGN',mapMeta:'LER / NAVIGATION',profileMeta:'LER / PROFESSIONAL PROFILE',controlsMeta:'LER / CONTROLS',webglMeta:'WEBGL / ACCESSIBLE EXPERIENCE',ready:'WORLD READY / CAMERA ACTIVE',initializing:'STARTING WEBGL',
   seePeople:'A professional universe, not a product claim.',photo:'Real evidence and project links remain available throughout your visit.'
 },
 es: {
   modelType:'TORRE EIFFEL · MODELO 3D INTERACTIVO',modelTruth:'Explora una maqueta digital artística de un monumento famoso. El 3DGS auténtico de La Gaitana está en mi portafolio.',modelControls:'ARRASTRA / FLECHAS PARA GIRAR · RUEDA / +/− PARA ACERCAR',modelPrompt:'Explora el modelo y selecciona un punto iluminado',conceptAria:'Maqueta artística interactiva de la Torre Eiffel; no es captura fotogramétrica',conceptLabel:'PARÍS · ARQUITECTURA · VISTA 360°',animatedModel:'3D INTERACTIVO',monumentPoints:['Arcos de la Torre Eiffel','Plataformas de observación','La cima y la antena'],sectionsMenu:'EXPLORAR SECCIONES',directNavLabel:'Navegación directa del portafolio',direct3dgs:'3DGS Y RECORRIDOS',directOshlix:'OSHLIX',directContact:'CONTACTO',quickContact:'CONTÁCTAME',real3dgsLink:'VER 3DGS REAL · LA GAITANA',professionalIdentity:'PERFIL PROFESIONAL',exploreMyAreas:'DESCUBRE MI TRABAJO',areaDetail:'ÁREA PROFESIONAL',runMobile:'CORRER',
   choose:'ELIGE TU IDIOMA',chooseSub:'Selecciona el idioma de la experiencia. Podrás cambiarlo en cualquier momento.',english:'CONTINUE IN ENGLISH',spanish:'CONTINUAR EN ESPAÑOL',remembered:'Tu elección anterior',lang:'Idioma',language:'Selección de idioma',
   identity:'PORTAFOLIO PROFESIONAL · OTRA PERSPECTIVA',hello:'HOLA, SOY',first:'LUIS',last:'EMILIO ROJAS',
   profession1:'ADMINISTRADOR DE EMPRESAS',profession2:'ESPECIALISTA EN GERENCIA DE SEGURIDAD Y SALUD EN EL TRABAJO',profession3:'DESARROLLADOR DE SOFTWARE',
   proposition:'Conecto la gestión empresarial, la seguridad laboral y la ingeniería de software para crear tecnología con propósito.',
   mission:'Mejores decisiones. Trabajo más seguro. Primero las personas.',detail:'Una trayectoria profesional contada mediante espacios a los que puedes entrar, explorar y transformar.',
   professionalTour:'EXPLORAR MI PORTAFOLIO',optionalGame:'ENTRAR A MI MUNDO · JUEGO OPCIONAL',
   enter:'ENTRA A MI MUNDO',quick:'PERFIL PROFESIONAL',discover:'MUEVE EL CURSOR PARA EXPLORAR',introSkip:'IR DIRECTAMENTE A EXPLORAR',subtitle:'UN UNIVERSO PROFESIONAL INTERACTIVO',scroll:'MUÉVETE / EXPLORA',
   loading:'PREPARANDO TU LLEGADA',loadingHint:'Construyendo los espacios y el mundo interactivo…',transition:'ENTRA EN LA EXPERIENCIA',
   welcome:'BIENVENIDO A MI MUNDO',welcomeLead:'Ocho espacios conectados. Trabajo real. Ideas interactivas. Tú decides la ruta.',welcomeBody:'Explora primero mi base profesional y descubre después tecnología, operaciones aéreas, producción audiovisual y documentales. Puedes llegar a cualquier espacio desde el mapa.',
   explore:'COMENZAR A EXPLORAR',tutorial:'CONTROLES Y ORIENTACIÓN',help:'CÓMO MOVERTE',skipTutorial:'SALTAR INSTRUCCIONES',helpLater:'VOLVER A VER LA AYUDA',
   walk:'W A S D / FLECHAS',walkD:'Camina por el mundo',camera:'ARRASTRAR / TOCAR',cameraD:'Mira arriba, abajo y a los lados',run:'SHIFT',runD:'Corre',act:'E / CLIC',actD:'Interactúa con marcadores próximos',escape:'ESC',escapeD:'Cierra un panel o la ayuda',mapTitle:'EXPLORA EL CAMPUS',mapDescription:'Usa el mapa para viajar rápidamente. No necesitas completar retos para consultar información profesional.',map:'MAPA',close:'CERRAR',contact:'CONTACTO',quickTitle:'PERFIL PROFESIONAL',resume:'VER MI CV',github:'GITHUB',linkedin:'LINKEDIN',email:'ESCRIBIRME',overview:'MI TRABAJO',
   profile:'Administrador de Empresas · Especialista en Gerencia de Seguridad y Salud en el Trabajo · Desarrollador de Software',
   introQuick:'La información profesional siempre está disponible, aunque prefieras no caminar por el mundo.',
   near:'CERCA DE TI',press:'PULSA E',interact:'INTERACTUAR',travel:'IR A ESTA ZONA',back:'VOLVER AL MUNDO',backToPortfolio:'VOLVER AL PORTAFOLIO PROFESIONAL',position:'POSICIÓN',restart:'REINICIAR ESCENARIOS DE SST',completed:'CONTROLES',safety:'EXPERIENCIA CONCEPTUAL DE SEGURIDAD',
   capabilityDescription:'Un espacio para mis capacidades en software, seguridad, administración y tecnologías espaciales. Las estaciones plenamente interactivas llegarán en el siguiente hito.',
   oshDescription:'Mi proyecto profesional principal: tecnología para gestionar seguridad laboral y prevenir riesgos. Explora un escenario 3D conceptual de controles; no es una evaluación real de Oshlix.',
   projectsDescription:'Trabajos desarrollados con React, Ruby on Rails y otras tecnologías. Consulta ejemplos auténticos y repositorios.',
   credentialsDescription:'Formación en administración, seguridad laboral y desarrollo web full-stack, además de mi licencia vigente como piloto profesional UAS (Aerocivil Colombia).',
   dronesDescription:'Operaciones aéreas como piloto profesional de drones con licencia vigente (Aerocivil Colombia), fotogrametría, captura 360° y reconstrucción 3D.',
   studioDescription:'Edición de video, narrativa documental, DaVinci Resolve Studio y proyectos auténticos de Ride & Fly.',
   heritageDescription:'Un viaje documental por Colombia y Ecuador, ampliado posteriormente mediante reconstrucciones 3D interactivas.',
   contactDescription:'Escríbeme para conversar sobre software, SST y proyectos técnicos.',
   safetyGuideLabel:'ENTRENAMIENTO INTERACTIVO / 3 ESTACIONES',safetyGuideTitle:'Prevenir antes de que ocurra',safetyGuideIntro:'Elige una estación, entra al laboratorio de seguridad, inspecciona el peligro y aplica un control preventivo. El escenario 3D cambia con tus decisiones.',safetyControlDone:'CONTROL APLICADO · VOLVER A VER',safetyInspectAction:'IR A LA ESTACIÓN',safetyStepsTitle:'Etapas de la inspección',safetyObserve:'OBSERVAR',safetyControl:'ACTUAR',safetyVerify:'VERIFICAR',safetyBefore:'El peligro está presente en el escenario 3D. Selecciona un control preventivo y observa el cambio.',safetyNext:'INSPECCIONAR OTRO PELIGRO',safetyAllDone:'TRES ESTACIONES INTERVENIDAS',safetyOshlixDisclaimer:'La simulación de seguridad es una demostración independiente del portafolio, no una función implementada de Oshlix.',
   inspection:'INSPECCIÓN DE LUGAR DE TRABAJO',risk:'PELIGRO OBSERVADO',apply:'APLICAR CONTROL PREVENTIVO',applied:'CONTROL APLICADO',viewResult:'DESPUÉS DE LA INTERVENCIÓN',inspect:'INSPECCIONAR EL LUGAR',allDone:'TRES CONTROLES REPRESENTADOS',concept:'Simulación ilustrativa para el portafolio: no es una evaluación certificada ni una función actualmente implementada en Oshlix.',
   launch:'DESPEGAR DRON VIRTUAL',land:'ATERRIZAR DRON VIRTUAL',open3d:'EXPLORAR 3DGS REAL',close3d:'SALIR DEL VISOR 3D',real3d:'Reconstrucción auténtica de La Gaitana · Neiva, Colombia. El visor carga solo cuando lo solicitas.',
   openSite:'ABRIR SITIO OFICIAL',project1:'AREPAS Y MÁS',project2:'CATA CAFÉ',project3:'APP DE PRESUPUESTO',video:'ABRIR RIDE & FLY',trailer:'VER EL TRÁILER',
   noWebgl:'Este navegador no permite renderizar 3D. Puedes explorar mi trabajo profesional aquí mismo.',retry:'INTENTAR 3D DE NUEVO',alternate:'EXPLORAR SIN 3D',goThere:'EXPLORAR ESPACIO',
   hud:'LER / UNIVERSO PROFESIONAL',scene:'EXPLORA · INTERACTÚA · DESCUBRE',worldTitle:'EL MUNDO ES TU MENÚ',onscreen:'Controles táctiles',rotate:'ARRASTRA PARA MIRAR',touchMove:'MOVER',jump:'EXPLORAR ZONA',status:'EXPERIENCIA EN VIVO',
   floatA:'ADMINISTRACIÓN / SISTEMAS',floatB:'SEGURIDAD / INGENIERÍA',floatC:'SOFTWARE / DISEÑO',mapMeta:'LER / NAVEGACIÓN',profileMeta:'LER / PERFIL PROFESIONAL',controlsMeta:'LER / CONTROLES',webglMeta:'WEBGL / EXPERIENCIA ACCESIBLE',ready:'MUNDO LISTO / CÁMARA ACTIVA',initializing:'INICIANDO WEBGL',
   seePeople:'Un universo profesional, no una afirmación comercial.',photo:'La evidencia y los enlaces reales siempre están disponibles durante la visita.'
 }
};
export function labelFor(id,lang){const p=PLACES.find(x=>x.id===id);if(p)return p.label[lang];const risk=RISKS.find(x=>x.id===id);return risk?risk[lang].name:id;}
export const getCopy = lang => COPY[lang==='es'?'es':'en'];
