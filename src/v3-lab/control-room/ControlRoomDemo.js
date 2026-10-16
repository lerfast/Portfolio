import React, { useContext, useEffect, useState } from "react";
import LangContext from "../../contexts/langContext";
import { getContent } from "../../portfolio";
import "./ControlRoomDemo.css";

/*
 * V3 / Prototype 01 — LER Control Room
 * Isolated React experience. No changes to the V2 website unless
 * the exact ?v3demo=control-room query parameter is present.
 * The workplace risk simulator is a CONCEPTUAL demonstration,
 * not a feature attributed to Oshlix.
 */
const SECTORS = ["safety", "spatial", "media", "heritage"];
const YOUTUBE = "https://www.youtube.com/@rojastech1";
const OSHLIX = "https://www.oshlix.com";
const GAITANA = "https://superspl.at/scene/5ccc87ed";

const words = {
  en: {
    portfolio: "PROFESSIONAL PORTFOLIO",
    system: "EXPERIMENTAL INTERFACE · V3 / 01",
    status: "CONCEPT ONLINE",
    title: ["SAFETY.", "SOFTWARE.", "IMPACT."],
    intro: "Business Administrator · Occupational Health and Safety Management Specialist · Software Developer",
    intro2: "I connect operational safety, business thinking and software development to build practical technology — with Oshlix at the center.",
    modules: "DISCOVER THE SYSTEM",
    nav: ["SAFETY & SOFTWARE", "UAS & SPATIAL", "MEDIA PRODUCTION", "MISIÓN PATRIMONIO"],
    navSub: ["Oshlix + OHS", "Drone + 3DGS", "Ride & Fly", "Documentary atlas"],
    index: "MODULE",
    viewProject: "VISIT OSHLIX",
    resume: "PROFESSIONAL CREDENTIALS",
    openChannel: "EXPLORE CHANNEL",
    openFilm: "WATCH THE FILM",
    openViewer: "EXPLORE 3D MODEL",
    launch: "LAUNCH 3D VIEWER",
    closeViewer: "CLOSE 3D VIEWER",
    navHelp: "Choose a module to explore live work and an interactive demonstration.",
    loading: "3D model loads only after you choose to open it.",
    back: "RETURN TO V2 PORTFOLIO",
    aboutTag: "FEATURED PROJECT / OSHLIX",
    aboutTitle: "Technology for safer work.",
    aboutText: "Oshlix is my principal technology project, focused on software solutions for occupational health and safety management.",
    safetyCaption: "INTERACTIVE SAFETY LAB / CONCEPT DEMO",
    safetyHelper: "Select a point in the facility to explore a safety consideration.",
    safetyLabel: "RISK IDENTIFICATION EXERCISE",
    safetyDisclaimer: "Illustrative exercise for this portfolio. Not an Oshlix production feature or a formal risk assessment.",
    risks: [
      { name: "Work at height", label: "Elevated platform", desc: "Assess fall exposures and collective protection measures before work begins.", tip: "Planning · collective protections · procedures" },
      { name: "Pedestrian / vehicle interface", label: "Loading zone", desc: "Separate pedestrian routes and vehicle movements; consider visibility and traffic control.", tip: "Circulation · segregation · signaling" },
      { name: "Ergonomic exposure", label: "Workstation", desc: "Examine posture, repetitive motion and workstation adjustment to reduce exposure.", tip: "Ergonomics · task design · prevention" },
    ],
    select: "SELECTED CONTROL POINT",
    points: "3 INTERACTIVE POINTS",
    move: "EXPLORE LIVE SCENE",
    spatialTag: "SECOND SPECIALTY / UAS + SPATIAL TECHNOLOGY",
    spatialTitle: "Beyond the ground.",
    spatialText: "Licensed professional UAS drone pilot with a valid license (Aerocivil Colombia). Aerial capture, operational planning, photogrammetry and 3D Gaussian Splatting connect technical precision with spatial experiences.",
    sms: "SAFETY BRIDGE / SMS × OHS",
    smsText: "Operational Safety Management (SMS) and Occupational Health & Safety (OHS) are different systems, linked by hazard identification and risk prevention.",
    spatialCase: "REAL 3D CASE / LA GAITANA, NEIVA",
    spatialHint: "Drag to explore the real reconstruction in the embedded viewer.",
    mediaTag: "THIRD AREA / FILM + EDITING",
    mediaTitle: "Stories with a point of view.",
    mediaText: "Ride & Fly documents places from the road and from the air. Recording, editing, aerial cinematography and immersive formats turn fieldwork into a story.",
    mediaCase: "FEATURED VIDEO / CALI FROM THE AIR",
    heritageTag: "DOCUMENTARY SERIES / MISIÓN PATRIMONIO",
    heritageTitle: "A moving archive of places.",
    heritageText: "Motorcycle travel, drone flights, 360° capture and — later — 3D reconstructions. Misión Patrimonio documents the journey and the places it reaches.",
    heritageCase: "DOCUMENTARY FOOTAGE / BUENAVENTURA",
    openSeries: "WATCH SERIES TRAILER",
    scenes: ["Oshlix · principal technology project", "Licensed UAS pilot (valid license · Aerocivil)", "DaVinci Resolve · YouTube production", "Real documentary + digital heritage"],
    footer: "DESIGNED AS AN INTERACTIVE EXPERIMENT. THE PROFESSIONAL RECORD REMAINS ACCESSIBLE.",
    keyboard: "01—04 / USE THE MODULE SELECTOR",
  },
  es: {
    portfolio: "PORTAFOLIO PROFESIONAL",
    system: "INTERFAZ EXPERIMENTAL · V3 / 01",
    status: "CONCEPTO ACTIVO",
    title: ["SEGURIDAD.", "SOFTWARE.", "IMPACTO."],
    intro: "Administrador de Empresas · Especialista en Gerencia de Seguridad y Salud en el Trabajo · Desarrollador de Software",
    intro2: "Conecto la seguridad laboral, la visión empresarial y el desarrollo de software para crear tecnología útil, con Oshlix como proyecto central.",
    modules: "EXPLORA EL SISTEMA",
    nav: ["SST Y SOFTWARE", "UAS Y TECNOLOGÍA 3D", "PRODUCCIÓN AUDIOVISUAL", "MISIÓN PATRIMONIO"],
    navSub: ["Oshlix + SST", "Drones + 3DGS", "Ride & Fly", "Atlas documental"],
    index: "MÓDULO",
    viewProject: "VISITAR OSHLIX",
    resume: "CREDENCIALES PROFESIONALES",
    openChannel: "EXPLORAR CANAL",
    openFilm: "VER EL VIDEO",
    openViewer: "EXPLORAR MODELO 3D",
    launch: "ABRIR VISOR 3D",
    closeViewer: "CERRAR VISOR 3D",
    navHelp: "Selecciona un módulo para conocer proyectos reales y una demostración interactiva.",
    loading: "El modelo 3D solo se carga cuando decides abrirlo.",
    back: "VOLVER AL PORTAFOLIO V2",
    aboutTag: "PROYECTO PRINCIPAL / OSHLIX",
    aboutTitle: "Tecnología para trabajar con seguridad.",
    aboutText: "Oshlix es mi proyecto tecnológico principal, enfocado en soluciones de software para la gestión de la seguridad y salud en el trabajo.",
    safetyCaption: "LABORATORIO DE SEGURIDAD / DEMOSTRACIÓN CONCEPTUAL",
    safetyHelper: "Selecciona un punto de la instalación para explorar un aspecto de seguridad.",
    safetyLabel: "EJERCICIO DE IDENTIFICACIÓN DE PELIGROS",
    safetyDisclaimer: "Ejercicio ilustrativo del portafolio. No es una función productiva de Oshlix ni una evaluación formal de riesgos.",
    risks: [
      { name: "Trabajo en alturas", label: "Plataforma elevada", desc: "Evaluar la exposición a caídas y las protecciones colectivas antes de comenzar.", tip: "Planeación · protecciones colectivas · procedimientos" },
      { name: "Interacción peatón / vehículo", label: "Zona de cargue", desc: "Separar recorridos peatonales y vehiculares; considerar visibilidad y control de tránsito.", tip: "Circulación · segregación · señalización" },
      { name: "Exposición ergonómica", label: "Puesto de trabajo", desc: "Examinar posturas, movimientos repetitivos y ajustes del puesto para reducir la exposición.", tip: "Ergonomía · diseño de tareas · prevención" },
    ],
    select: "PUNTO DE CONTROL SELECCIONADO",
    points: "3 PUNTOS INTERACTIVOS",
    move: "EXPLORAR ESCENA",
    spatialTag: "SEGUNDA ESPECIALIDAD / UAS + TECNOLOGÍA ESPACIAL",
    spatialTitle: "Más allá de la superficie.",
    spatialText: "Piloto profesional UAS con licencia vigente (Aerocivil Colombia). La captura aérea, la planificación operacional, la fotogrametría y el 3D Gaussian Splatting conectan precisión técnica con experiencias espaciales.",
    sms: "CONEXIÓN PREVENTIVA / SMS × SST",
    smsText: "El Sistema de Gestión de la Seguridad Operacional (SMS) y la Seguridad y Salud en el Trabajo son distintos, pero comparten la identificación de peligros y la prevención del riesgo.",
    spatialCase: "CASO REAL EN 3D / LA GAITANA, NEIVA",
    spatialHint: "Arrastra para explorar la reconstrucción real en el visor integrado.",
    mediaTag: "TERCER EJE / CINE + EDICIÓN",
    mediaTitle: "Historias desde otra perspectiva.",
    mediaText: "Ride & Fly documenta lugares desde la carretera y desde el cielo. Grabación, edición, cinematografía aérea y formatos inmersivos convierten el trabajo de campo en una historia.",
    mediaCase: "VIDEO DESTACADO / CALI DESDE EL AIRE",
    heritageTag: "SERIE DOCUMENTAL / MISIÓN PATRIMONIO",
    heritageTitle: "Memorias que se pueden recorrer.",
    heritageText: "Viajes en motocicleta, vuelos con dron, captura 360° y — posteriormente — reconstrucciones 3D. Misión Patrimonio documenta tanto el viaje como los lugares que visita.",
    heritageCase: "REGISTRO DOCUMENTAL / BUENAVENTURA",
    openSeries: "VER TRÁILER DE LA SERIE",
    scenes: ["Oshlix · proyecto tecnológico principal", "Piloto UAS certificado por Aerocivil", "DaVinci Resolve · producción YouTube", "Documental real + patrimonio digital"],
    footer: "DISEÑADO COMO EXPERIMENTO INTERACTIVO. EL PERFIL PROFESIONAL SIGUE DISPONIBLE.",
    keyboard: "01—04 / UTILIZA EL SELECTOR DE MÓDULOS",
  },
};

function Icon({ name, size = 18 }) {
  const paths = {
    arrow: <><path d="M4 12h16M13 5l7 7-7 7" /></>,
    north: <><path d="m12 2 6 18-6-4-6 4z" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></>,
    crosshair: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></>,
    external: <><path d="M13 4h7v7M20 4l-9 9"/><path d="M20 13v7H4V4h7"/></>,
    close: <><path d="M5 5l14 14M19 5 5 19"/></>,
    play: <><path d="m8 5 11 7-11 7z"/></>,
    shield: <><path d="m12 2 8 4v6c0 5-3 8-8 10C7 20 4 17 4 12V6l8-4Z"/><path d="m9 12 2 2 4-4"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" aria-hidden="true">{paths[name] || paths.arrow}</svg>;
}

function FacilityScene({ activeRisk, onSelect, labels }) {
  const pts = [
    { left: "42.2%", top: "34%" },
    { left: "61%", top: "61%" },
    { left: "23%", top: "68%" },
  ];
  return (
    <div className="cr-facility">
      <svg className="cr-facility-art" viewBox="0 0 960 570" role="img" aria-label="Stylized architectural safety training environment with platforms, vehicles and workstations">
        <defs>
          <linearGradient id="cr-base" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1a2a34"/><stop offset="1" stopColor="#0e1822"/></linearGradient>
          <linearGradient id="cr-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#486273"/><stop offset="1" stopColor="#203844"/></linearGradient>
          <linearGradient id="cr-side" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#172935"/><stop offset="1" stopColor="#0c1821"/></linearGradient>
          <linearGradient id="cr-glow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c4ff77" stopOpacity=".31"/><stop offset="1" stopColor="#c4ff77" stopOpacity="0"/></linearGradient>
          <pattern id="cr-grid" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .43 -1 .43 470 -90)"><path d="M46 0H0V46" stroke="#8fb9b2" strokeWidth="1" strokeOpacity=".16" fill="none"/></pattern>
        </defs>
        <g opacity=".9" transform="translate(10,12)">
          <path d="M90 330 468 152 871 314 489 510Z" fill="url(#cr-base)" stroke="#547481" strokeWidth="2"/>
          <path d="M90 330 489 510v28L90 354Z" fill="#0a1620" stroke="#426370"/>
          <path d="M489 510 871 314v26L489 538Z" fill="#10202a" stroke="#426370"/>
          <path d="M92 332 468 156 868 315 491 509Z" fill="url(#cr-grid)" />
          <path d="M156 314 485 174 734 273 409 424Z" fill="#18313b" stroke="#6c9488" strokeOpacity=".65"/>
          {/* Main factory structure */}
          <path d="M302 254 485 166 672 242 488 335Z" fill="url(#cr-top)" stroke="#8fb6bc" strokeWidth="2"/>
          <path d="M302 254 488 335v114L302 369Z" fill="url(#cr-side)" stroke="#47616f" strokeWidth="2"/>
          <path d="M488 335 672 242v114L488 449Z" fill="#203341" stroke="#597781" strokeWidth="2"/>
          <path d="M338 290 460 347v75l-122-56Z" fill="#0c1d26" stroke="#426774" />
          <path d="M362 315 436 350v40l-74-34Z" fill="#284953"/>
          <path d="M510 356 555 335v77l-45 21Z" fill="#152e39" stroke="#567e88"/>
          <path d="M574 326 620 305v76l-46 22Z" fill="#152e39" stroke="#567e88"/>
          {/* Roof units */}
          <path d="M373 237 442 205l85 33-70 36Z" fill="#29414a" stroke="#7b9da4"/>
          <path d="M373 237v24l84 36v-23Z" fill="#182933"/>
          <path d="M457 274v23l70-36v-23Z" fill="#172a34"/>
          <path d="M542 235 596 258v28l-54-22Z" fill="#1c3340" stroke="#799ca3"/>
          {/* External stair and elevated platform */}
          <path d="M267 281 327 253l95 38-59 29Z" fill="#314f5c" stroke="#bfd3d5"/>
          <path d="M271 281v93l94 40v-94Z" fill="#16232d" stroke="#7da0a3"/>
          <path d="m270 297 95 41m-95-24 95 40m-95-24 95 41m-95-24 95 41" stroke="#b5c8c8" strokeOpacity=".28"/>
          <path d="M237 352 268 338 303 354 271 369Z" fill="#395d68" stroke="#afcbd0"/>
          <path d="M236 352v35l36 15v-33Z" fill="#142b34" stroke="#577c87"/>
          <path d="M272 369v33l31-15v-33Z" fill="#213f49"/>
          {/* Pedestrian paths */}
          <path d="m131 361 132 60m-120-32 104 46" stroke="#c4ff77" strokeWidth="4" strokeDasharray="15 17" strokeOpacity=".6"/>
          <path d="m571 451 226-111" stroke="#f3c77d" strokeWidth="5" strokeDasharray="19 15" strokeOpacity=".7"/>
          {/* Service truck */}
          <path d="M641 426 724 384l64 26-84 43Z" fill="#a6e16f" stroke="#d2ffa6"/>
          <path d="M641 426v33l63 27v-33Z" fill="#587b53" stroke="#9ac88c"/>
          <path d="M704 453v33l84-42v-34Z" fill="#628d63" stroke="#c4ffa3"/>
          <path d="m713 416 33-17 22 10-33 17Z" fill="#233a42"/>
          <ellipse cx="669" cy="478" rx="10" ry="13" fill="#091218" stroke="#93aba6" strokeWidth="4"/>
          <ellipse cx="745" cy="464" rx="10" ry="13" fill="#091218" stroke="#93aba6" strokeWidth="4"/>
          {/* Workstation */}
          <path d="M142 305 209 274l76 32-66 32Z" fill="#45727e" stroke="#96bcc1" strokeWidth="2"/>
          <path d="m155 311 2 37m109-38 1 37m-49-10 1 36" stroke="#86afb8" strokeWidth="5"/>
          <path d="M183 265 228 243l37 17-45 22Z" fill="#132c35" stroke="#aac7c3"/>
          <path d="m183 265 37 17v28l-37-17Z" fill="#243d4b"/>
          {/* site architectural lighting */}
          <path d="M268 255 485 152l205 82" fill="none" stroke="#c4ff77" strokeWidth="1.8" strokeOpacity=".35" strokeDasharray="8 8"/>
          <path d="M318 369v38m170 42v42m184-135v36" stroke="#8bb6bf" opacity=".48"/>
          <circle cx="485" cy="170" r="10" fill="#d8ffe3" opacity=".1"/>
        </g>
      </svg>
      {pts.map((p, i) => (
        <button
          type="button"
          key={i}
          className={`cr-hotspot ${activeRisk === i ? "is-active" : ""}`}
          style={p}
          aria-label={`${labels.risks[i].name}: ${labels.risks[i].label}`}
          aria-pressed={activeRisk === i}
          onClick={() => onSelect(i)}
        ><span className="cr-hotspot-ring"/><span className="cr-hotspot-dot">0{i + 1}</span></button>
      ))}
      <div className="cr-grid-mark cr-grid-mark-a" aria-hidden="true">+ 04°33' / SITE-01</div>
      <div className="cr-grid-mark cr-grid-mark-b" aria-hidden="true">ISOMETRIC SAFETY / 3 HOTSPOTS</div>
    </div>
  );
}

function OrbitalScene({ sector, labels, onOpen3D }) {
  if (sector === "media" || sector === "heritage") {
    const media = sector === "media";
    return <div className="cr-film-scene">
      <img src={`https://i.ytimg.com/vi/${media ? "9Do3RMFLCfk" : "nfjlRb8mejU"}/hqdefault.jpg`} alt={media ? "Aerial film of Cali from Ride & Fly" : "Documentary aerial footage of Buenaventura"} loading="lazy" />
      <div className="cr-film-darken" />
      <div className="cr-film-frame"><span>REC / RIDE & FLY</span><span>4K · DOC</span></div>
      <a className="cr-film-play" href={`https://www.youtube.com/watch?v=${media ? "9Do3RMFLCfk" : "nfjlRb8mejU"}`} target="_blank" rel="noopener noreferrer" aria-label={labels.openFilm}><Icon name="play" size={29}/></a>
      <div className="cr-film-caption"><span>{media ? labels.mediaCase : labels.heritageCase}</span><strong>{media ? "CALI / COLOMBIA" : "BUENAVENTURA / COLOMBIA"}</strong></div>
    </div>;
  }
  return <div className="cr-orbit-scene">
    <div className="cr-orbit-grid" aria-hidden="true"/>
    <div className="cr-orbit-ring cr-orbit-ring-a"/><div className="cr-orbit-ring cr-orbit-ring-b"/><div className="cr-orbit-ring cr-orbit-ring-c"/>
    <div className="cr-orbit-core"><Icon name="north" size={56}/><span>UAS / 3DGS</span></div>
    <span className="cr-orbit-ping ping-one"/><span className="cr-orbit-ping ping-two"/>
    <div className="cr-orbit-coordinate">COLOMBIA / 2.9273° N</div>
    <div className="cr-orbit-action"><span>{labels.spatialCase}</span><button type="button" onClick={onOpen3D}>{labels.launch} <Icon name="arrow" size={14}/></button></div>
  </div>;
}

function ControlRoomDemo() {
  const context = useContext(LangContext) || { lang: "en", setLang: () => {} };
  const { lang, setLang } = context;
  const t = words[lang] || words.en;
  const [activeSector, setActiveSector] = useState("safety");
  const [activeRisk, setActiveRisk] = useState(0);
  const [open3D, setOpen3D] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const resumeLink = getContent(lang).greeting.resumeLink;
  const sectorIndex = SECTORS.indexOf(activeSector);

  useEffect(() => {
    document.title = "LER // CONTROL ROOM — Portfolio V3 Prototype";
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    if (media.addEventListener) media.addEventListener("change", sync);
    else media.addListener(sync);
    return () => {
      if (media.removeEventListener) media.removeEventListener("change", sync);
      else media.removeListener(sync);
    };
  }, []);

  const choose = (id) => {
    setActiveSector(id);
    setOpen3D(false);
  };
  const link = (href, label, primary = false) => (
    <a className={`cr-cta ${primary ? "cr-cta-primary" : "cr-cta-secondary"}`} href={href} target="_blank" rel="noopener noreferrer">{label}<Icon name={primary ? "arrow" : "external"} size={16}/></a>
  );

  return (
    <main className={`cr-v3 ${reduceMotion ? "cr-reduced-motion" : ""}`}>
      <div className="cr-noise" aria-hidden="true"/>
      <header className="cr-topbar">
        <a href={window.location.pathname} className="cr-logo" aria-label="Return to the current portfolio"><span className="cr-logo-glyph">L<span>↗</span>R</span><span className="cr-logo-slash">/</span><span className="cr-logo-name">LUIS EMILIO ROJAS</span></a>
        <div className="cr-top-label"><span className="cr-status-light"/>{t.system}</div>
        <div className="cr-top-actions"><span className="cr-live"><span className="cr-live-led"/>{t.status}</span><button type="button" className="cr-lang" onClick={() => setLang(lang === "en" ? "es" : "en")}>{lang === "en" ? "ES" : "EN"}<span aria-hidden="true">↗</span></button></div>
      </header>

      <div className="cr-shell">
        <aside className="cr-sidebar" aria-label={t.modules}>
          <div className="cr-sidebar-meta"><span>01 / 04</span><span>INDEX</span></div>
          <p className="cr-sidebar-title">{t.modules}</p>
          <nav className="cr-sector-list" aria-label={t.modules}>
            {SECTORS.map((id, index) => (
              <button type="button" className={`cr-sector-button ${activeSector === id ? "is-active" : ""}`} key={id} onClick={() => choose(id)} aria-current={activeSector === id ? "page" : undefined}>
                <span className="cr-sector-number">0{index + 1}</span><span className="cr-sector-details"><strong>{t.nav[index]}</strong><small>{t.navSub[index]}</small></span><span className="cr-sector-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </nav>
          <p className="cr-sidebar-help">{t.navHelp}</p>
          <div className="cr-sidebar-bottom"><span className="cr-sidebar-dots" aria-hidden="true">◉ ◌ ◌ ◌</span><a href={window.location.pathname} className="cr-back">← {t.back}</a></div>
        </aside>

        <div className="cr-main-content">
          <div className="cr-intro-row"><span className="cr-label"><span className="cr-line-icon">+</span> {t.portfolio}</span><span className="cr-location">NEIVA / COLOMBIA <span>↗</span></span></div>
          <section className="cr-hero" aria-label="Professional identity">
            <div className="cr-hero-title"><span>{t.title[0]}</span><span>{t.title[1]}</span><span className="cr-hero-outline">{t.title[2]}</span></div>
            <div className="cr-hero-aside"><span className="cr-aside-divider"/><div><strong>LUIS EMILIO ROJAS</strong><p>{t.intro}</p><p>{t.intro2}</p></div></div>
          </section>

          <section className="cr-operations" aria-label="Interactive case">
            <div className="cr-operations-head"><span className="cr-label">{t.index} <strong>0{sectorIndex + 1}</strong> / {t.nav[sectorIndex]}</span><span className="cr-small-mono">EXPERIENCE / {String(sectorIndex+1).padStart(2,"0")}</span></div>
            <div key={activeSector} className={`cr-stage cr-stage-${activeSector}`}>
              <div className="cr-stage-scanlines" aria-hidden="true"/>
              {activeSector === "safety" ? (
                <>
                  <div className="cr-stage-top"><span><Icon name="crosshair" size={15}/>{t.safetyCaption}</span><span className="cr-data-chip">{t.points}</span></div>
                  <FacilityScene activeRisk={activeRisk} onSelect={setActiveRisk} labels={t}/>
                  <div className="cr-inspection-panel" aria-live="polite"><div className="cr-inspection-top"><span>{t.select}</span><strong>0{activeRisk+1}</strong></div><h3>{t.risks[activeRisk].name}</h3><p>{t.risks[activeRisk].desc}</p><small>{t.risks[activeRisk].tip}</small></div>
                  <div className="cr-stage-bottom"><span><span className="cr-animated-dot"/>{t.safetyLabel}</span><span>{t.safetyHelper}</span></div>
                </>
              ) : activeSector === "spatial" ? (
                <><div className="cr-stage-top"><span><Icon name="layers" size={15}/>{t.spatialTag}</span><span className="cr-data-chip">AEROCIVIL / UAS</span></div>{open3D ? <div className="cr-embed-wrap"><button type="button" onClick={() => setOpen3D(false)} className="cr-close-embed">× {t.closeViewer}</button><iframe title="La Gaitana - interactive 3D Gaussian Splatting" src="https://superspl.at/s?id=5ccc87ed" loading="lazy" allow="fullscreen" allowFullScreen/></div> : <OrbitalScene sector="spatial" labels={t} onOpen3D={() => setOpen3D(true)}/>}<div className="cr-stage-bottom"><span>{t.sms}</span><span>{t.loading}</span></div></>
              ) : (
                <><div className="cr-stage-top"><span><Icon name={activeSector === "media" ? "play" : "layers"} size={15}/>{activeSector === "media" ? t.mediaTag : t.heritageTag}</span><span className="cr-data-chip">RIDE & FLY</span></div><OrbitalScene sector={activeSector} labels={t}/></>
              )}
            </div>
            {activeSector === "safety" && <p className="cr-disclaimer">ⓘ {t.safetyDisclaimer}</p>}
          </section>

          <section className="cr-dossier" aria-label="Module information">
            <div className="cr-dossier-heading"><span className="cr-label">{String(sectorIndex+1).padStart(2,"0")} / CASE FILE</span><span className="cr-dossier-icon"><Icon name="arrow" size={22}/></span></div>
            <div className="cr-dossier-grid"><div className="cr-dossier-intro"><span className="cr-dossier-tag">{activeSector === "safety" ? t.aboutTag : activeSector === "spatial" ? t.spatialTag : activeSector === "media" ? t.mediaTag : t.heritageTag}</span><h2>{activeSector === "safety" ? t.aboutTitle : activeSector === "spatial" ? t.spatialTitle : activeSector === "media" ? t.mediaTitle : t.heritageTitle}</h2><p>{activeSector === "safety" ? t.aboutText : activeSector === "spatial" ? t.spatialText : activeSector === "media" ? t.mediaText : t.heritageText}</p></div><div className="cr-dossier-actions"><span className="cr-label">{t.scenes[sectorIndex]}</span>{activeSector === "safety" ? <>{link(OSHLIX,t.viewProject,true)}{link(resumeLink,t.resume)}</> : activeSector === "spatial" ? <>{link(GAITANA,t.openViewer,true)}<div className="cr-dossier-note"><Icon name="shield" size={22}/><span><strong>{t.sms}</strong><br/>{t.smsText}</span></div></> : activeSector === "media" ? <>{link(YOUTUBE,t.openChannel,true)}{link("https://www.youtube.com/watch?v=9Do3RMFLCfk",t.openFilm)}</> : <>{link("https://www.youtube.com/watch?v=xCqegWZJdUY",t.openSeries,true)}{link("https://www.youtube.com/watch?v=nfjlRb8mejU",t.openFilm)}</>}</div></div>
          </section>
          <footer className="cr-footer"><span>LER // DESIGNING SYSTEMS</span><span>{t.footer}</span><span>V3.01 / {new Date().getFullYear()}</span></footer>
        </div>
      </div>
    </main>
  );
}

export default ControlRoomDemo;
