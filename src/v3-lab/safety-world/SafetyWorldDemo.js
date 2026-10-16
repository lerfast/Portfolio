import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import LangContext from "../../contexts/langContext";
import createSafetyWorld from "./createSafetyWorld";
import "./SafetyWorldDemo.css";

/*
 * V3 / Experimental prototype: a REAL navigable 3D risk-prevention environment.
 * Entirely isolated behind ?v3demo=life-lab. Does not modify Oshlix.
 * It is a conceptual learning demo, NOT a commercial or certified risk engine.
 */
const WORLD_HAZARDS = [
  { id:"crane", number:"01", severity:"high", en:{title:"Suspended load", short:"An overhead load crosses an accessible area.", explanation:"A suspended load creates exposure beneath a lifting operation. The work zone needs controlled access and an agreed lifting procedure.", control:"Establish an exclusion zone and secure the lift", changed:"Exclusion cones and a protected lifting perimeter appear. The load is raised away from the shared area."}, es:{title:"Carga suspendida",short:"Una carga elevada atraviesa un área accesible.",explanation:"Una carga suspendida genera exposición bajo la operación de izaje. La zona requiere acceso controlado y un procedimiento de elevación definido.",control:"Delimitar la zona de exclusión y controlar el izaje",changed:"Aparece un perímetro de protección y se eleva la carga fuera del área compartida."}},
  { id:"traffic",number:"02",severity:"high",en:{title:"Vehicle–pedestrian conflict",short:"A forklift shares space with people on foot.",explanation:"Mixed traffic increases the likelihood of a collision or struck-by event. Traffic planning should separate movements and define safe routes.",control:"Separate pedestrians and moving equipment",changed:"A designated route, cones and directional arrows appear around the forklift."},es:{title:"Conflicto vehículo–peatón",short:"Un montacargas comparte el espacio con peatones.",explanation:"La circulación mixta incrementa la exposición a atropellamientos o choques. La planeación debe separar los desplazamientos y definir rutas seguras.",control:"Separar peatones y equipos en movimiento",changed:"Aparecen una ruta demarcada, conos y flechas direccionales alrededor del montacargas."}},
  { id:"electric",number:"03",severity:"high",en:{title:"Exposed electrical work",short:"A service cabinet is open during operations.",explanation:"Electrical maintenance requires competent personnel, isolation procedures and verification that hazardous energy is controlled before work begins.",control:"Isolate energy and represent lockout/tagout",changed:"The service panel closes and a lockout indicator and controlled area appear."},es:{title:"Trabajo eléctrico expuesto",short:"Hay un gabinete de servicio abierto durante la operación.",explanation:"El mantenimiento eléctrico exige personal competente, procedimientos de aislamiento y verificación del control de energías peligrosas antes de intervenir.",control:"Aislar la energía y representar bloqueo y etiquetado",changed:"Se cierra el panel de servicio y aparecen el indicador de bloqueo y el área controlada."}},
  { id:"exit",number:"04",severity:"medium",en:{title:"Obstructed emergency exit",short:"Storage blocks an evacuation route.",explanation:"Emergency routes should remain accessible, clearly identifiable and free from stored materials or equipment.",control:"Clear the exit and mark the escape route",changed:"The boxes are removed and evacuation arrows show a clear path to the exit."},es:{title:"Salida de emergencia obstruida",short:"Un almacenamiento bloquea la ruta de evacuación.",explanation:"Las rutas de emergencia deben permanecer accesibles, identificadas y libres de materiales o equipos almacenados.",control:"Liberar la salida y señalar la evacuación",changed:"Se retiran las cajas y aparecen flechas que señalan la ruta despejada."}},
];

const copy={
 en:{
   brand:"LER / SAFETY SYSTEMS",version:"V3 EXPERIMENT · REAL-TIME 3D",top:"SAVING LIVES STARTS WITH PREVENTION.",
   headingA:"DON'T JUST",headingB:"SEE THE RISK.",headingC:"CHANGE THE OUTCOME.",
   desc:"Walk through a live 3D worksite. Detect hazards. Apply safeguards. Watch the workplace change in real time.",
   subtitle:"An interactive concept inspired by occupational health & safety, risk management and software engineering.",
   live:"INTERACTIVE WEBGL WORLD",orb:"Drag to orbit",zoom:"Scroll / pinch to zoom",tap:"Select a glowing marker",inspect:"SAFETY INSPECTION",inspection:"EXPLORATION CONSOLE",complete:"Safeguards applied",of:"of 4",levels:{high:"ELEVATED EXPOSURE",medium:"EXPOSURE TO REVIEW"},
   seen:"CONTROL APPLIED",notSeen:"NEEDS YOUR ATTENTION",apply:"IMPLEMENT THIS CONTROL",selected:"SELECTED HAZARD",why:"WHY IT MATTERS",result:"AFTER THE INTERVENTION",next:"NEXT HAZARD",reset:"RESTART SIMULATION", overview:"OVERVIEW",orbit:"AUTO ORBIT",stopOrbit:"STOP ORBIT",tip:"Click the floating markers or select a risk in the list.",
   stage:"THE FACILITY",stageSub:"A living 3D learning environment",four:"FOUR AREAS TO INSPECT",completed:"All four controls applied — you changed the scenario.",completeDesc:"The model now visualizes the safeguards you selected. Real-world risk controls always require context-specific assessment and verification.",
   try3dgs:"NOW EXPLORE A REAL 3DGS SCENE",gaitana:"Monumento a La Gaitana · Neiva, Colombia",seeGaitana:"OPEN THE REAL 3D RECONSTRUCTION",close:"CLOSE 3DGS VIEWER",openExternal:"OPEN DIRECTLY ON SUPERSPLAT",modalText:"This is an actual Gaussian Splatting reconstruction. The industrial training scene is procedural WebGL, not a scanned workplace.",
   project:"THE PROFESSIONAL MISSION",projectLead:"Build technology that helps protect people.",projectDesc:"I'm a Business Administrator, Occupational Health and Safety Management Specialist, and Software Developer. Oshlix is my main software project focused on occupational health and safety management.",projectLink:"EXPLORE OSHLIX ↗",portfolioLink:"FULL PROFESSIONAL PORTFOLIO ↗",return:"BACK TO V2 PORTFOLIO",pilot:"Licensed professional UAS pilot with valid license (Aerocivil Colombia) · 3DGS · Ride & Fly",notice:"CONCEPT PROTOTYPE · No claim that this simulator is a feature of Oshlix. Example measures are illustrative, not an operational safety assessment.",
   webglFail:"Your browser could not start WebGL. You can still explore the hazards and apply controls using the inspection console.",instruction:"Risk identification first. Implement a control to change the scene.",scroll:"EXPLORE THE SITE",label:"Click to inspect",claim:"Protecting people through better systems.",
 },
 es:{
   brand:"LER / SISTEMAS DE SEGURIDAD",version:"EXPERIMENTO V3 · 3D EN TIEMPO REAL",top:"SALVAR VIDAS COMIENZA CON LA PREVENCIÓN.",
   headingA:"NO BASTA",headingB:"VER EL RIESGO.",headingC:"HAY QUE ACTUAR.",
   desc:"Recorre una instalación 3D real. Detecta peligros, aplica controles y observa cómo cambia el entorno de trabajo en tiempo real.",
   subtitle:"Una experiencia conceptual inspirada en Seguridad y Salud en el Trabajo, gestión del riesgo e ingeniería de software.",
   live:"MUNDO WEBGL INTERACTIVO",orb:"Arrastra para girar",zoom:"Rueda / pellizca para acercar",tap:"Selecciona un marcador luminoso",inspect:"INSPECCIÓN DE SEGURIDAD",inspection:"CONSOLA DE EXPLORACIÓN",complete:"Controles aplicados",of:"de 4",levels:{high:"EXPOSICIÓN ELEVADA",medium:"EXPOSICIÓN POR EVALUAR"},
   seen:"CONTROL APLICADO",notSeen:"REQUIERE ATENCIÓN",apply:"IMPLEMENTAR ESTE CONTROL",selected:"PELIGRO SELECCIONADO",why:"POR QUÉ IMPORTA",result:"DESPUÉS DE INTERVENIR",next:"SIGUIENTE PELIGRO",reset:"REINICIAR SIMULACIÓN", overview:"VISTA GENERAL",orbit:"ÓRBITA AUTOMÁTICA",stopOrbit:"DETENER ÓRBITA",tip:"Pulsa los marcadores flotantes o selecciona un peligro de la lista.",
   stage:"LA INSTALACIÓN",stageSub:"Un entorno didáctico 3D que responde a tus decisiones",four:"CUATRO ZONAS POR INSPECCIONAR",completed:"Aplicaste los cuatro controles y transformaste el escenario.",completeDesc:"El modelo representa las medidas que seleccionaste. En operaciones reales, los controles necesitan evaluación y verificación específicas.",
   try3dgs:"AHORA EXPLORA UNA ESCENA 3DGS REAL",gaitana:"Monumento a La Gaitana · Neiva, Colombia",seeGaitana:"ABRIR RECONSTRUCCIÓN 3D REAL",close:"CERRAR VISOR 3DGS",openExternal:"ABRIR DIRECTAMENTE EN SUPERSPLAT",modalText:"Esta es una reconstrucción auténtica mediante Gaussian Splatting. La instalación industrial anterior está creada mediante WebGL, no es el escaneo de una fábrica real.",
   project:"LA MISIÓN PROFESIONAL",projectLead:"Crear tecnología que ayude a proteger a las personas.",projectDesc:"Soy Administrador de Empresas, Especialista en Gerencia de Seguridad y Salud en el Trabajo y Desarrollador de Software. Oshlix es mi proyecto tecnológico principal, enfocado en la gestión de SST.",projectLink:"CONOCER OSHLIX ↗",portfolioLink:"PORTAFOLIO PROFESIONAL COMPLETO ↗",return:"VOLVER AL PORTAFOLIO V2",pilot:"Piloto UAS profesional certificado por Aerocivil Colombia · 3DGS · Ride & Fly",notice:"PROTOTIPO CONCEPTUAL · No representa una función ya implementada en Oshlix. Los controles son ilustrativos y no sustituyen una evaluación operacional.",
   webglFail:"El navegador no pudo iniciar WebGL. Puedes explorar los peligros y aplicar controles desde la consola de inspección.",instruction:"Primero identifica los peligros. Aplica un control para transformar la escena.",scroll:"EXPLORAR INSTALACIÓN",label:"Inspeccionar",claim:"Proteger personas mediante mejores sistemas.",
 }
};

const MarkIcon=({fixed})=><svg aria-hidden="true" viewBox="0 0 24 24"><path d={fixed?"M5 12l4 4L19 6":"M12 4v10m0 5v1"} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export default function SafetyWorldDemo(){
  const context=useContext(LangContext);const lang=context && context.lang==="es"?"es":"en";
  const t=copy[lang];
  const [selected,setSelected]=useState("crane");
  const [mitigated,setMitigated]=useState([]);
  const [webglFailed,setWebglFailed]=useState(false);
  const [isOrbiting,setIsOrbiting]=useState(false);
  const [splatOpen,setSplatOpen]=useState(false);
  const [sceneInitialized,setSceneInitialized]=useState(false);
  const canvas=useRef(null), world=useRef(null), pins=useRef({}), overlayRef=useRef(null);
  const selectRef=useRef(null);
  selectRef.current=(id)=>setSelected(id);
  const markersRef=useRef(null);
  markersRef.current=(list)=>{
    if(!overlayRef.current)return;
    list.forEach(({id,x,y,visible})=>{const el=pins.current[id];if(!el)return;
      el.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      el.style.opacity=visible?"1":"0";
      el.style.pointerEvents=visible?"auto":"none";
    });
  };
  useEffect(()=>{
    if(!canvas.current)return undefined;
    let cancelled=false;
    const w=createSafetyWorld({canvas:canvas.current,onChoose:id=>{if(selectRef.current)selectRef.current(id);},onMarkers:list=>{if(markersRef.current)markersRef.current(list);},onWebGLError:()=>{if(!cancelled)setWebglFailed(true);}});
    world.current=w;
    if(w){setSceneInitialized(true);w.setActive("crane");}
    return ()=>{cancelled=true;if(w)w.dispose();world.current=null;};
  },[]);
  useEffect(()=>{if(world.current)world.current.setMitigated(mitigated);},[mitigated]);
  useEffect(()=>{if(world.current)world.current.setActive(selected);},[selected]);
  useEffect(()=>{if(world.current)world.current.setOrbit(isOrbiting);},[isOrbiting]);
  useEffect(()=>{if(!splatOpen)return undefined;
    const previous=document.body.style.overflow;document.body.style.overflow="hidden";
    const key=e=>{if(e.key==='Escape')setSplatOpen(false);};window.addEventListener('keydown',key);
    return ()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',key);};
  },[splatOpen]);
  const hazard=WORLD_HAZARDS.find(h=>h.id===selected)||WORLD_HAZARDS[0];
  const done=mitigated.includes(selected);
  const selectHazard=useCallback(id=>{setSelected(id);if(world.current)world.current.focus(id);},[]);
  const applyControl=()=>setMitigated(prev=>prev.includes(selected)?prev:[...prev,selected]);
  const nextHazard=()=>{const idx=WORLD_HAZARDS.findIndex(h=>h.id===selected);selectHazard(WORLD_HAZARDS[(idx+1)%WORLD_HAZARDS.length].id);};
  const reset=()=>{setMitigated([]);selectHazard('crane');if(world.current)world.current.overview();};
  const toggleLanguage=()=>{if(context && context.setLang)context.setLang(lang==='en'?'es':'en');};
  return (
    <main className="life-page" lang={lang}>
      <div className="life-grain" aria-hidden="true"/>
      <header className="life-header">
        <a className="life-brand" href="/" aria-label="Portfolio main website"><span className="life-brand-icon">L<span>·</span>R</span><span className="life-brand-text">{t.brand}<small>LUIS EMILIO ROJAS</small></span></a>
        <div className="life-header-right"><span className="life-system-status"><i/> {t.version}</span><button type="button" className="life-language" onClick={toggleLanguage} aria-label={lang==='en'?'Cambiar a español':'Switch to English'}>{lang==='en'?'ES':'EN'}</button><a className="life-back" href="/">{t.return} <span>↗</span></a></div>
      </header>
      <section className="life-hero" aria-labelledby="life-title">
        <div className="life-eyebrow"><span className="life-eyebrow-line"/>{t.top}<span className="life-eyebrow-index">01 / SAFETY LAB</span></div>
        <div className="life-hero-heading"><div><h1 id="life-title"><span>{t.headingA}</span><span>{t.headingB}</span><em>{t.headingC}</em></h1></div><div className="life-hero-copy"><p>{t.desc}</p><small>{t.subtitle}</small></div></div>
      </section>
      <section className="life-experience" aria-label={t.live}>
        <div className="life-stage">
          <div className="life-canvas-wrap">
            <div className="life-ambient life-ambient-a" aria-hidden="true"/><div className="life-ambient life-ambient-b" aria-hidden="true"/>
            <div className="life-stage-head"><span className="life-live"><i/>{t.live}</span><span className="life-stage-id">FACILITY / SIM-001</span></div>
            <canvas ref={canvas} className="life-webgl" aria-label={t.stageSub} role="img"/>
            <div className="life-crosshair" aria-hidden="true">+</div>
            <div ref={overlayRef} className="life-world-pins">
              {WORLD_HAZARDS.map(h=><button key={h.id} type="button" ref={el=>{pins.current[h.id]=el;}} className={'life-world-pin'+(selected===h.id?' is-selected':'')+(mitigated.includes(h.id)?' is-safe':'')} onClick={()=>selectHazard(h.id)} title={h[lang].title} aria-label={t.label+': '+h[lang].title}><span className="life-pin-core"><MarkIcon fixed={mitigated.includes(h.id)}/></span><small>{h.number}</small></button>)}
            </div>
            {webglFailed&&<div className="life-webgl-fallback" role="alert">{t.webglFail}</div>}
            {!webglFailed&&!sceneInitialized&&<div className="life-loading">INITIALIZING SAFETY WORLD...</div>}
            <div className="life-stage-controls"><button type="button" onClick={()=>{if(world.current)world.current.overview();setIsOrbiting(false);}}>{t.overview} <span>⌖</span></button><button type="button" className={isOrbiting?'is-active':''} onClick={()=>setIsOrbiting(x=>!x)}>{isOrbiting?t.stopOrbit:t.orbit} <span>↻</span></button></div>
            <div className="life-stage-guides"><span>◉ {t.orb}</span><span>⊕ {t.zoom}</span><span>◇ {t.tap}</span></div>
          </div>
          <div className="life-stage-foot"><div><strong>LIVE INDUSTRIAL ENVIRONMENT</strong><span>THREE.JS · WEBGL · REACT</span></div><p>{t.tip}</p></div>
        </div>
        <aside className="life-console" aria-label={t.inspection}>
          <div className="life-console-header"><span className="life-mono">{t.inspection}</span><span className="life-console-number">04 <small>AREAS</small></span></div>
          <h2>{t.inspection}</h2>
          <div className="life-progress"><div><span>{t.complete}</span><b>{mitigated.length} <small>/ 4</small></b></div><div className="life-progress-track"><i style={{width:(mitigated.length/4*100)+'%'}}/></div></div>
          <span className="life-list-label">{t.four}</span>
          <div className="life-hazards" role="group" aria-label={t.four}>{WORLD_HAZARDS.map(h=>{
            const isFixed=mitigated.includes(h.id);
            return <button type="button" key={h.id} className={'life-hazard'+(selected===h.id?' is-active':'')+(isFixed?' is-fixed':'')} onClick={()=>selectHazard(h.id)} aria-pressed={selected===h.id}>
              <span className="life-hazard-num">{h.number}</span><span className="life-hazard-content"><strong>{h[lang].title}</strong><small>{isFixed?t.seen:t.notSeen}</small></span><span className="life-hazard-indicator"><MarkIcon fixed={isFixed}/></span>
            </button>;
          })}</div>
          <div className="life-inspector" key={selected}>
            <span className="life-inspector-kicker">{t.selected} <span> / {hazard.number}</span></span>
            <h3>{hazard[lang].title}</h3>
            <span className={'life-exposure '+(done?'is-safe':'')}>{done?t.seen:t.levels[hazard.severity]}</span>
            <p>{hazard[lang].short}</p>
            <strong className="life-detail-label">{t.why}</strong>
            <p className="life-explanation">{hazard[lang].explanation}</p>
            {done ? <div className="life-fixed-result"><strong>✓ {t.result}</strong><p>{hazard[lang].changed}</p></div> : <button type="button" onClick={applyControl} className="life-apply"><span>{t.apply}</span><span>↗</span></button>}
            <div className="life-inspector-actions"><button type="button" onClick={nextHazard}>{t.next} →</button><button type="button" onClick={reset}>{t.reset} ↺</button></div>
          </div>
          {mitigated.length===4&&<div className="life-completion"><span>✓ 04 / 04</span><strong>{t.completed}</strong><p>{t.completeDesc}</p></div>}
        </aside>
      </section>
      <div className="life-disclaimer">ⓘ {t.notice}</div>
      <section className="life-next" aria-label={t.project}>
        <div className="life-project-intro"><span className="life-kicker">{t.project} / 01</span><h2>{t.projectLead}</h2><p>{t.projectDesc}</p><div className="life-project-ctas"><a href="https://www.oshlix.com" target="_blank" rel="noopener noreferrer">{t.projectLink}</a><a href="/">{t.portfolioLink}</a></div></div>
        <div className="life-spatial"><div className="life-spatial-grid"/><span className="life-kicker">{t.try3dgs} / 02</span><h2>3D GAUSSIAN<br/>SPLATTING.</h2><p>{t.gaitana}</p><button type="button" onClick={()=>setSplatOpen(true)}>{t.seeGaitana} <span>↗</span></button><small>{t.pilot}</small></div>
      </section>
      <footer className="life-footer"><span>© LUIS EMILIO ROJAS · V3 EXPERIENCE LAB</span><a href="/">{t.return} ↗</a></footer>
      {splatOpen&&<div className="life-modal" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSplatOpen(false);}}><section role="dialog" aria-modal="true" aria-labelledby="life-modal-title" className="life-modal-box"><div className="life-modal-header"><div><span className="life-kicker">LIVE 3DGS / NEIVA, COLOMBIA</span><h2 id="life-modal-title">{t.gaitana}</h2></div><button type="button" onClick={()=>setSplatOpen(false)} aria-label={t.close}>✕</button></div><div className="life-iframe-holder"><iframe title="Monumento a La Gaitana en SuperSplat" src="https://superspl.at/s?id=5ccc87ed" allow="fullscreen; accelerometer; gyroscope" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/></div><div className="life-modal-foot"><p>{t.modalText}</p><a href="https://superspl.at/scene/5ccc87ed" target="_blank" rel="noopener noreferrer">{t.openExternal} ↗</a></div></section></div>}
    </main>
  );
}
