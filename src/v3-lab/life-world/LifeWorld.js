import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import LangContext from '../../contexts/langContext';
import { COPY, PLACES, RISKS, CAMPUS_PATHS, LINKS, labelFor } from './LifeWorldContent';
import LifeWorldIcon from './LifeWorldIcons';
import LifeWorldDExhibits from './LifeWorldDExhibits';
import ProfessionalJourney, { JOURNEY_SECTIONS } from './ProfessionalJourney';
import {EXHIBITS,exhibitLabel} from './LifeWorldExhibitData';
import './LifeWorldHito1.css';
import './LifeWorldSafety.css';

const AREA_ICONS = {capabilities:'capabilities',osh:'oshlix',projects:'software',credentials:'credentials',drones:'drone',studio:'youtube',heritage:'heritage',contact:'contact'};
const PROGRESS_KEY = 'ler-life-world-v3-hito1-progress';
function readProgress(){try{const v=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'[]');return Array.isArray(v)?v.filter(id=>RISKS.some(r=>r.id===id)):[];}catch{return [];}}
function External({href,children,...rest}){return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}<span aria-hidden="true"> ↗</span></a>;}

/** One uninterrupted 3D camera travels between the language hall and the introduction. */
function CinematicBackdrop({cue}) {
 const canvas = useRef(null), engine = useRef(null), previous = useRef(null);
 const [unavailable, setUnavailable] = useState(false);
 useEffect(() => {
  let alive = true;
  import('./createCinematicStage').then(module => {
   if (!alive || !canvas.current) return;
   const instance = module.default({canvas:canvas.current,onError:() => alive && setUnavailable(true)});
   if (!instance) { setUnavailable(true); return; }
   engine.current = instance;
   // The renderer itself begins at a distance and flies toward language selection.
   if (previous.current && previous.current !== 'language') instance.flyTo(previous.current, 1050);
  }).catch(() => { if (alive) setUnavailable(true); });
  return () => { alive = false; if (engine.current) {engine.current.dispose(); engine.current = null;} };
 }, []);
 useEffect(() => {
  const first = previous.current === null;
  previous.current = cue;
  if (!first && engine.current) engine.current.flyTo(cue, cue === 'portal' ? 1050 : 1050);
 }, [cue]);
 return <div className={`ler-cinematic-backdrop${unavailable?' is-fallback':''}`} aria-hidden="true">
  {!unavailable && <canvas ref={canvas} className="ler-cinematic-canvas" />}
  <div className="ler-cinematic-vignette"/>
  <div className="ler-cinematic-scan"/>
 </div>;
}

function LanguageGate({lang,choose}){
 const t=COPY[lang];
 return <section className="ler-language-gate" aria-labelledby="ler-language-title">
  <div className="ler-language-art" aria-hidden="true"><div className="ler-language-halo"/><div className="ler-language-column one"/><div className="ler-language-column two"/><div className="ler-language-column three"/><div className="ler-language-shape"/></div>
  <div className="ler-language-inner"><div className="ler-mono">LER / PROFESSIONAL UNIVERSE <span>001</span></div>
   <span className="ler-kicker">WELCOME · BIENVENIDO</span><h1 id="ler-language-title">Choose your language<span className="ler-language-spanish">Elige tu idioma</span></h1>
   <p>{t.chooseSub}</p><div className="ler-language-actions"><button type="button" className="ler-primary" lang="en" onClick={()=>choose('en')}><span>01</span> CONTINUE IN ENGLISH <b aria-hidden="true">↗</b></button><button type="button" className="ler-secondary" lang="es" onClick={()=>choose('es')}><span>02</span> CONTINUAR EN ESPAÑOL <b aria-hidden="true">↗</b></button></div>
   <div className="ler-language-footer"><span>LUIS EMILIO ROJAS</span><span>PROFESSIONAL PORTFOLIO / 2026</span></div>
  </div>
 </section>;
}
/* Separate lightweight WebGL scene. The campus only loads after ENTER MY WORLD. */
function IntroArchitecture({t}){
 const canvas=useRef(null),instance=useRef(null);
 const [feature,setFeature]=useState(null),[noWebGL,setNoWebGL]=useState(false);
 useEffect(()=>{
  let active=true;
  import('./createIntroBuilding').then(m=>{
   if(!active||!canvas.current)return;
   instance.current=m.default({canvas:canvas.current,onFeature:index=>active&&setFeature(index),onError:()=>active&&setNoWebGL(true)});
   if(!instance.current)setNoWebGL(true);
  }).catch(()=>{if(active)setNoWebGL(true);});
  return ()=>{active=false;if(instance.current){instance.current.dispose();instance.current=null;}};
 },[]);
 const titles=t.monumentPoints;
 return <div className="ler-intro-architecture">
   <div className="ler-intro-architecture-head"><span className="ler-kicker">{t.conceptLabel}</span><span className="ler-architecture-live"><i/>{t.animatedModel}</span></div>
   <div className="ler-architecture-stage">
    {!noWebGL?<canvas ref={canvas} className="ler-architecture-canvas" tabIndex={0} aria-label={`${t.conceptAria}. ${t.modelControls}`}/>:<div className="ler-architecture-fallback" role="img" aria-label={t.conceptAria}><svg className="ler-eiffel-fallback" viewBox="0 0 160 260" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M33 239 L57 176 L72 101 L77 42 L80 13 L83 42 L88 101 L103 176 L127 239" strokeWidth="6"/><path d="M29 238 H131 M40 216 H120 M49 179 H111 M63 115 H97 M69 99 H91 M73 50 H87 M77 13 V3" strokeWidth="5"/><path d="M49 179 L111 216 M111 179 L49 216 M60 147 L100 177 M100 147 L60 177 M70 105 L90 139 M90 105 L70 139 M80 41 L91 101 M80 41 L69 101" strokeWidth="3"/><path d="M52 239 Q80 174 108 239" strokeWidth="4"/></svg><span>{t.modelType}</span></div>}
    <div className="ler-architecture-orbit" aria-hidden="true"><span>360°</span><LifeWorldIcon name="rotate" size={19}/></div>
   </div>
   <div className="ler-architecture-bottom"><div><span className="ler-kicker">{t.modelType}</span><p>{t.modelTruth}</p></div><div className="ler-architecture-tip"><LifeWorldIcon name="rotate" size={17}/>{t.modelControls}</div></div>
   <div className="ler-feature-readout" role="status" aria-live="polite">{feature===null?<><LifeWorldIcon name="location" size={18}/>{t.modelPrompt}</>:<><b>{String(feature+1).padStart(2,'0')}</b><span>{titles[feature]}</span><button type="button" onClick={()=>setFeature(null)} aria-label={t.close}>×</button></>}</div>
 </div>;
}
function FilmIntro({t,lang,onGame,onPortfolio,onSection,onQuick,onLanguage}){
 const [sectionsOpen,setSectionsOpen]=useState(false);
 const navRef=useRef(null);
 useEffect(()=>{
  if(!sectionsOpen)return undefined;
  const onEscape=e=>{if(e.key==='Escape')setSectionsOpen(false);};
  const onOutside=e=>{if(navRef.current&&!navRef.current.contains(e.target))setSectionsOpen(false);};
  document.addEventListener('keydown',onEscape);
  document.addEventListener('pointerdown',onOutside);
  return ()=>{document.removeEventListener('keydown',onEscape);document.removeEventListener('pointerdown',onOutside);};
 },[sectionsOpen]);
 const jump=index=>{setSectionsOpen(false);onSection(index);};
 return <section className="ler-intro ler-intro-vivid" aria-labelledby="ler-intro-title">
   <div className="ler-vivid-aurora" aria-hidden="true"/><div className="ler-intro-lines" aria-hidden="true"/>
   <div className="ler-intro-copy"><p className="ler-kicker ler-intro-animate" style={{'--seq':0}}>{t.identity}</p>
    <nav className="ler-intro-direct ler-intro-animate" ref={navRef} aria-label={t.directNavLabel} style={{'--seq':1}}>
      <div className="ler-intro-direct-bar">
        <button type="button" className="ler-intro-index-trigger" aria-expanded={sectionsOpen} aria-controls="ler-intro-index" onClick={()=>setSectionsOpen(open=>!open)}><span aria-hidden="true">☰</span> {t.sectionsMenu} <span aria-hidden="true">▾</span></button>
        <button type="button" className="ler-intro-spotlight" onClick={()=>jump(5)}>✦ {t.direct3dgs} <span aria-hidden="true">↗</span></button>
        <button type="button" onClick={()=>jump(1)}>{t.directOshlix} <span aria-hidden="true">↗</span></button>
        <button type="button" onClick={()=>jump(9)}>{t.directContact} <span aria-hidden="true">↗</span></button>
      </div>
      {sectionsOpen&&<div className="ler-intro-index" id="ler-intro-index">
       <div className="ler-intro-index-head"><strong>{t.sectionsMenu}</strong><button type="button" onClick={()=>setSectionsOpen(false)} aria-label={t.close}>×</button></div>
       <div className="ler-intro-index-grid">{JOURNEY_SECTIONS.map((section,index)=><button type="button" key={section.id} onClick={()=>jump(index)}><b>{section.number}</b><span>{section[lang].nav}</span><span aria-hidden="true">↗</span></button>)}</div>
      </div>}
    </nav>
    <h1 id="ler-intro-title"><small className="ler-intro-animate" style={{'--seq':2}}>{t.hello}</small><span className="ler-intro-full-name ler-intro-animate" style={{'--seq':3}}>{t.first} <em>{t.last}</em></span></h1>
    <div className="ler-intro-role-list ler-intro-animate" style={{'--seq':4}}><div><b>01</b><span>{t.profession1}</span></div><div><b>02</b><span>{t.profession2}</span></div><div><b>03</b><span>{t.profession3}</span></div><div><b>04</b><span>{t.profession4}</span></div></div>
    <p className="ler-intro-statement ler-intro-animate" style={{'--seq':5}}>{t.proposition}</p><p className="ler-intro-purpose ler-intro-animate" style={{'--seq':6}}>{t.mission}</p>
    <div className="ler-intro-actions ler-intro-animate" style={{'--seq':7}}>
      <button className="ler-primary ler-enter" type="button" onClick={onPortfolio}><LifeWorldIcon name="arrow" size={19}/>{t.professionalTour}<span aria-hidden="true">↗</span></button>
      <button type="button" className="ler-contact-cta" onClick={()=>jump(9)}><LifeWorldIcon name="mail" size={19}/>{t.quickContact} <span aria-hidden="true">↗</span></button>
      <a className="ler-whatsapp-cta" href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer"><LifeWorldIcon name="whatsapp" size={19}/>WHATSAPP <span aria-hidden="true">↗</span></a>
    </div>
    <div className="ler-intro-secondary-actions"><button className="ler-secondary ler-game-optional" type="button" onClick={onGame}><LifeWorldIcon name="play" size={18}/>{t.optionalGame}</button><button className="ler-text-button" type="button" onClick={onQuick}>{t.quick} <LifeWorldIcon name="external" size={16}/></button></div>
    <p className="ler-intro-detail">{t.detail}</p>
   </div>
   <IntroArchitecture t={t}/>
   <button className="ler-real-splat-link" type="button" onClick={()=>jump(5)}>{t.real3dgsLink} <span aria-hidden="true">↗</span></button>
   <div className="ler-intro-meta"><span>{t.subtitle}</span><button type="button" onClick={onLanguage}>{t.lang}: EN / ES</button><span className="ler-hint">{t.modelControls}</span></div>
 </section>;
}

function MapPanel({t,lang,onGo,onClose,position}){
 const X=x=>160+x*1.62,Z=z=>170+z*1.58;
 return <div className="ler-scrim ler-panel-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
  <section className="ler-world-map" role="dialog" aria-modal="true" aria-label={t.mapTitle}>
   <div className="ler-panel-top"><span className="ler-kicker">{t.mapMeta}</span><button type="button" onClick={onClose} aria-label={t.close}>✕ {t.close}</button></div>
   <h2>{t.mapTitle}</h2><p>{t.mapDescription}</p>
   <div className="ler-map-layout"><div className="ler-map-sketch">
     <svg viewBox="0 0 320 340" role="img" aria-label={lang==='es'?'Plano del campus conectado, con las ocho zonas y tu posición':'Connected campus plan with eight areas and your location'}>
      <rect x="1" y="1" width="318" height="338" rx="12" fill="#b4c7bc" />
      <g stroke="#f3f0e7" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round">
       {CAMPUS_PATHS.map(([a,b],i)=><path key={i} d={`M${X(a[0])} ${Z(a[1])} L${X(b[0])} ${Z(b[1])}`}/>)}
      </g>
      <g stroke="#409fa9" strokeWidth="1.5" fill="none" opacity=".55">
       {CAMPUS_PATHS.map(([a,b],i)=><path key={i} d={`M${X(a[0])} ${Z(a[1])} L${X(b[0])} ${Z(b[1])}`}/>)}
      </g>
      <circle cx={160} cy={170} r={14} fill="#20607a" stroke="#ffffff" strokeWidth="2" />
      {PLACES.map(p=><g key={p.id} transform={`translate(${X(p.x)} ${Z(p.z)}) rotate(${-(p.yaw||0)*180/Math.PI})`}>
        {p.kind==='outdoor' ? <circle r="14" fill="#377b83" stroke="#f8f0dd" strokeWidth="2" />:
        <rect x={-p.width*.85} y={-p.depth*.85} width={p.width*1.7} height={p.depth*1.7} rx="3" fill={p.id==='osh'?'#154a68':'#315f75'} stroke={p.id==='osh'?'#f3b26c':'#f8f0dd'} strokeWidth={p.id==='osh'?2.3:1.4}/>}
        <rect x="-5" y={p.depth*.75} width="10" height="2.5" fill="#20bad5" />
        <g transform={`rotate(${(p.yaw||0)*180/Math.PI})`}><text y="4" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">{p.index}</text></g>
       </g>)}
      <g transform={`translate(${X(position.x)} ${Z(position.z)})`}>
       <circle r="8" fill="#ffbb68" opacity=".34"/><circle r="4.5" fill="#fffefa" stroke="#005674" strokeWidth="1.5" />
      </g>
      <text x="12" y="18" fontSize="10" fontWeight="700" fill="#18435a">LER / CAMPUS</text>
      <text x="307" y="18" textAnchor="end" fontSize="9" fill="#18435a">N ↑</text>
     </svg>
    </div>
    <div className="ler-map-locations">{PLACES.map(p=><button type="button" key={p.id} onClick={()=>onGo(p.id)}><span>{p.index}</span><strong>{p.label[lang]}</strong><b aria-hidden="true">↗</b></button>)}</div>
   </div><p className="ler-panel-fine">{t.position} · {position.x.toFixed(1)} / {position.z.toFixed(1)}</p>
  </section>
 </div>;
}

function Overview({t,lang,onClose,onZoneSelect}){
 // This dialog is SELF-CONTAINED. Its area buttons do not start the 3D world.
 const [selected,setSelected]=useState('osh');
 const descriptions={capabilities:t.capabilityDescription,osh:t.oshDescription,projects:t.projectsDescription,credentials:t.credentialsDescription,drones:t.dronesDescription,studio:t.studioDescription,heritage:t.heritageDescription,contact:t.contactDescription};
 const links={capabilities:[['github',LINKS.github,t.github]],osh:[['oshlix',LINKS.oshlix,'OSHLIX']],projects:[['project',LINKS.arepas,t.project1],['project',LINKS.catacafe,t.project2],['github',LINKS.github,t.github]],credentials:[['resume',LINKS.resume,t.resume]],drones:[],studio:[['youtube',LINKS.youtube,t.video]],heritage:[['heritage',LINKS.trailer,t.trailer],['external',LINKS.laGaitana,t.open3d]],contact:[['whatsapp',LINKS.whatsapp,'WHATSAPP'],['mail',`mailto:${LINKS.email}`,t.email]]};
 const current=PLACES.find(p=>p.id===selected);
 return <div className="ler-scrim ler-profile-scrim" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="ler-overview ler-profile-reimagined" role="dialog" aria-modal="true" aria-label={t.quickTitle}>
   <div className="ler-panel-top"><span className="ler-kicker">LER / {t.profileMeta}</span><button type="button" onClick={onClose}>✕ {t.close}</button></div>
   <div className="ler-profile-hero"><div className="ler-profile-emblem" aria-hidden="true"><span>LER.</span><i/></div><div><span className="ler-kicker">{t.professionalIdentity}</span><h2>LUIS EMILIO ROJAS</h2><p>{t.profile}</p><p>{t.introQuick}</p></div></div>
   <div className="ler-profile-links">
    {[['resume',LINKS.resume,t.resume],['oshlix',LINKS.oshlix,'OSHLIX'],['github',LINKS.github,t.github],['linkedin',LINKS.linkedin,t.linkedin],['whatsapp',LINKS.whatsapp,'WHATSAPP'],['mail',`mailto:${LINKS.email}`,t.email],['youtube',LINKS.youtube,'YOUTUBE']].map(([icon,url,label])=><a href={url} key={icon} className="ler-profile-link" target={url.startsWith('mailto:')?'_self':'_blank'} rel={url.startsWith('mailto:')?undefined:'noopener noreferrer'}><LifeWorldIcon name={icon} size={19}/><span>{label}</span><LifeWorldIcon name="external" size={14}/></a>)}
   </div>
   <h3>{t.exploreMyAreas}</h3><div className="ler-profile-explorer"><div className="ler-profile-zone-buttons">{PLACES.map(p=><button key={p.id} type="button" className={p.id===selected?'selected':''} aria-pressed={p.id===selected} onClick={()=>{setSelected(p.id);if(onZoneSelect)onZoneSelect(p.id);}}><LifeWorldIcon name={AREA_ICONS[p.id]} size={19}/><span>{p.label[lang]}</span><LifeWorldIcon name="arrow" size={15}/></button>)}</div>
    <div className="ler-profile-zone-preview" key={selected} aria-live="polite"><div className="ler-profile-zone-icon"><LifeWorldIcon name={AREA_ICONS[selected]} size={36}/></div><span className="ler-kicker">{current.index} / {t.areaDetail}</span><h4>{current.label[lang]}</h4><p>{descriptions[selected]}</p><div className="ler-profile-zone-evidence">{links[selected].map(([icon,url,title])=><a key={url} href={url} target={url.startsWith('mailto:')?'_self':'_blank'} rel={url.startsWith('mailto:')?undefined:'noopener noreferrer'}><LifeWorldIcon name={icon} size={16}/>{title}<LifeWorldIcon name="external" size={12}/></a>)}{selected==='drones'&&<span>{t.dronesDescription}</span>}</div></div>
   </div>
 </section></div>;
}

function WorldWelcome({t,onStart,onTutorial,onSkip,onExit}){
 return <div className="ler-scrim ler-welcome-screen"><section className="ler-welcome" role="dialog" aria-modal="true" aria-labelledby="ler-welcome-title">
  <span className="ler-kicker">LER / ARRIVAL POINT · 00</span><h2 id="ler-welcome-title">{t.welcome}</h2><p className="ler-welcome-lead">{t.welcomeLead}</p><p>{t.welcomeBody}</p><div className="ler-welcome-actions"><button type="button" className="ler-primary" onClick={onStart}>{t.explore} →</button><button type="button" className="ler-secondary" onClick={onTutorial}>{t.tutorial} ↗</button><button type="button" className="ler-text-button" onClick={onSkip}>{t.skipTutorial}</button><button type="button" className="ler-welcome-return" onClick={onExit}>← {t.backToPortfolio}</button></div>
 </section></div>;
}
function Tutorial({t,onClose}){
 const rows=[[t.walk,t.walkD],[t.camera,t.cameraD],[t.run,t.runD],[t.act,t.actD],[t.escape,t.escapeD]];
 return <div className="ler-scrim"><section className="ler-tutorial" role="dialog" aria-modal="true" aria-label={t.help}>
  <div className="ler-panel-top"><span className="ler-kicker">{t.controlsMeta}</span><button type="button" onClick={onClose}>✕ {t.close}</button></div><h2>{t.tutorial}</h2><div className="ler-tutorial-grid">{rows.map(([a,b])=><div key={a}><kbd>{a}</kbd><span>{b}</span></div>)}</div><p>{t.mapDescription}</p><button type="button" className="ler-primary" onClick={onClose}>{t.explore} →</button>
 </section></div>;
}
function SafetyMissionGuide({lang,t,done,onInspectRisk}){
 return <div className="ler-safety-guide" aria-label={t.safetyGuideTitle}>
  <div className="ler-safety-guide-head"><div><span className="ler-kicker">{t.safetyGuideLabel}</span><h3>{t.safetyGuideTitle}</h3></div><strong>{done.length} / {RISKS.length}</strong></div>
  <p>{t.safetyGuideIntro}</p>
  <div className="ler-safety-guide-steps">
   {RISKS.map((risk,i)=>{const complete=done.includes(risk.id);return <button type="button" key={risk.id} className={`ler-safety-mission${complete?' is-complete':''}`} onClick={()=>onInspectRisk(risk.id)}>
    <span className="ler-safety-mission-number">{String(i+1).padStart(2,'0')}</span>
    <span><strong>{risk[lang].name}</strong><small>{complete?t.safetyControlDone:t.safetyInspectAction}</small></span>
    <span className="ler-safety-mission-status" aria-hidden="true">{complete?'✓':'↗'}</span>
   </button>;})}
  </div>
  <div className="ler-safety-guide-footer"><LifeWorldIcon name="oshlix" size={17}/><span>{t.concept}</span></div>
 </div>;
}
function PlacePanel({id,lang,t,done,onApply,onInspectRisk,droneFlying,onFly,onSplat,onTravel,onClose,selection,onSelect}){
 const place=PLACES.find(p=>p.id===id),risk=RISKS.find(r=>r.id===id),fixed=risk&&done.includes(id);
 const descriptions={capabilities:t.capabilityDescription,osh:t.oshDescription,projects:t.projectsDescription,credentials:t.credentialsDescription,drones:t.dronesDescription,studio:t.studioDescription,heritage:t.heritageDescription,contact:t.contactDescription};
 const nextRisk=risk&&RISKS.find(r=>r.id!==id&&!done.includes(r.id));
 return <div className="ler-scrim ler-panel-scrim" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className={`ler-detail-panel ler-detail-panel-${risk?'risk':id}`} role="dialog" aria-modal="true" aria-labelledby="ler-detail-title">
   <div className="ler-panel-top"><span className="ler-kicker"><LifeWorldIcon name={risk?'oshlix':(AREA_ICONS[id]||'capabilities')} size={17}/>{risk?t.inspection:(place?place.index:'LER')} / LER WORLD</span><button type="button" onClick={onClose}>✕ {t.close}</button></div>
   <h2 id="ler-detail-title">{labelFor(id,lang)}</h2>
   {risk?<>
    <div className="ler-inspection-steps" aria-label={t.safetyStepsTitle}>
     <span className="is-active">01 · {t.safetyObserve}</span><span>02 · {t.safetyControl}</span><span className={fixed?'is-complete':''}>03 · {t.safetyVerify}</span>
    </div>
    <p className="ler-kicker">{t.risk}</p><p>{risk[lang].description}</p>
    {!fixed&&<div className="ler-risk-before"><LifeWorldIcon name="oshlix" size={23}/><span>{t.safetyBefore}</span></div>}
    {fixed?<div className="ler-panel-result ler-safety-result" role="status"><b>✓ {t.applied}</b><strong>{risk[lang].measure}</strong><p>{risk[lang].result}</p></div>:<button type="button" className="ler-primary ler-safety-apply" onClick={()=>onApply(id)}>{risk[lang].measure} →</button>}
    <p className="ler-panel-fine">{t.concept}</p>
    <div className="ler-safety-next-actions">
     {nextRisk&&fixed&&<button type="button" className="ler-secondary" onClick={()=>onInspectRisk(nextRisk.id)}>{t.safetyNext} ↗</button>}
     {!nextRisk&&fixed&&<div className="ler-safety-all-done">✓ {t.safetyAllDone}</div>}
     <button className="ler-text-button" type="button" onClick={()=>onTravel('osh')}>{t.back} ↗</button>
    </div>
   </>:<>
    {id==='osh'&&<><p>{descriptions[id]}</p><SafetyMissionGuide lang={lang} t={t} done={done} onInspectRisk={onInspectRisk}/><div className="ler-detail-actions"><External href={LINKS.oshlix}>{t.openSite} · OSHLIX</External><p className="ler-panel-fine">{t.safetyOshlixDisclaimer}</p></div></>}
    {id!=='osh'&&<LifeWorldDExhibits id={id} lang={lang} selected={selection[id]||0} onSelect={onSelect} onTravel={onTravel} onSplat={onSplat} droneFlying={droneFlying} onFly={onFly}/>}
   </>}
 </section></div>;
}

function TouchJoystick({label,onMove}){
 const base=useRef(null),pointer=useRef(null);
 const [axis,setAxis]=useState({x:0,y:0});
 const update=e=>{
  if(!base.current)return;
  const b=base.current.getBoundingClientRect(),radius=b.width*.35;
  let x=(e.clientX-(b.left+b.width/2))/radius,y=(e.clientY-(b.top+b.height/2))/radius;
  const length=Math.hypot(x,y);if(length>1){x/=length;y/=length;}
  setAxis({x,y});onMove(x,y);
 };
 const stop=()=>{pointer.current=null;setAxis({x:0,y:0});onMove(0,0);};
 useEffect(()=>()=>onMove(0,0),[onMove]);
 return <div className="ler-joystick-wrap"><span>{label}</span><div className="ler-joystick" ref={base} role="application" aria-label={label}
  onPointerDown={e=>{e.preventDefault();pointer.current=e.pointerId;e.currentTarget.setPointerCapture(e.pointerId);update(e);}}
  onPointerMove={e=>{if(pointer.current===e.pointerId)update(e);}}
  onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}>
  <i className="ler-joystick-center"/><div className="ler-joystick-knob" style={{transform:`translate(${axis.x*36}px,${axis.y*36}px)`}}><LifeWorldIcon name="arrow" size={25}/></div></div></div>;
}
export default function LifeWorld(){
 const lc=useContext(LangContext),lang=lc&&lc.lang==='es'?'es':'en',t=COPY[lang];
 const [phase,setPhase]=useState('language');const [worldReady,setWorldReady]=useState(false);
 const [portfolioIndex,setPortfolioIndex]=useState(0);
 const [cinematicZone,setCinematicZone]=useState(null);
 const [closingModal,setClosingModal]=useState(null);
 const dismissTimeout=useRef(null);
 const journeyTimeout=useRef(null);
 const [failed,setFailed]=useState(false),[welcome,setWelcome]=useState(false),[tutorial,setTutorial]=useState(false);
 const [map,setMap]=useState(false),[overview,setOverview]=useState(false),[changeLang,setChangeLang]=useState(false);
 const [panel,setPanel]=useState(null),[splat,setSplat]=useState(false),[near,setNear]=useState(null),[position,setPosition]=useState({x:0,z:-4});
 const [done,setDone]=useState(readProgress),[droneFlying,setDroneFlying]=useState(false);
 const [exhibitSelection,setExhibitSelection]=useState({});
 const [quality,setQuality]=useState('auto');
 const canvas=useRef(null),world=useRef(null),initializing=useRef(false),onPickRef=useRef(null),onStepRef=useRef(null);
 const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const travelPhase = (next, wait) => {
  if (journeyTimeout.current) clearTimeout(journeyTimeout.current);
  if (reduced() || !wait) { setPhase(next); return; }
  journeyTimeout.current = setTimeout(() => { journeyTimeout.current = null; setPhase(next); }, wait);
 };
 const chooseLanguage=useCallback(l=>{
  if (lc && lc.setLang) lc.setLang(l);
  setChangeLang(false);
  if (phase === 'language') {
   setPhase('language-to-intro');
   if (journeyTimeout.current) clearTimeout(journeyTimeout.current);
   if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPhase('intro');
   else journeyTimeout.current=setTimeout(()=>{journeyTimeout.current=null;setPhase('intro');},1420);
  }
 },[lc,phase]);
 const goPortal=()=>{
  if (phase!=='intro'&&phase!=='portfolio')return;
  setPanel(null);setOverview(false);setChangeLang(false);
  setPhase(phase==='portfolio'?'portfolio-to-world':'intro-to-world');travelPhase('portal',1050);
 };
 const returnToPortfolio=()=>{
  // Leave the playable campus without a page reload, releasing the 3D engine.
  // SST progress is intentionally preserved in localStorage via the existing effect.
  if(journeyTimeout.current){clearTimeout(journeyTimeout.current);journeyTimeout.current=null;}
  if(dismissTimeout.current){clearTimeout(dismissTimeout.current);dismissTimeout.current=null;}
  if(world.current){
   try { if(world.current.clearKeys)world.current.clearKeys();
         if(world.current.setJoystick)world.current.setJoystick(0,0);
         world.current.dispose(); }
   finally {world.current=null;}
  }
  initializing.current=false;
  setWorldReady(false);setFailed(false);setWelcome(false);setTutorial(false);
  setMap(false);setOverview(false);setChangeLang(false);setPanel(null);setSplat(false);
  setClosingModal(null);setCinematicZone(null);setNear(null);setDroneFlying(false);
  setPosition({x:0,z:-4});
  setPhase('portfolio');
 };
 const selectExhibit=useCallback((zone,index)=>{
  const opts=EXHIBITS[zone]||[];
  if(!opts[index])return;
  setExhibitSelection(previous=>({...previous,[zone]:index}));
  if(world.current&&world.current.setExhibit)world.current.setExhibit(zone,index);
 },[]);
 const openPanel=useCallback(id=>{
  if(String(id).startsWith('exhibit:')){
   const parts=id.split(':');const index=Number(parts[2]);
   if((EXHIBITS[parts[1]]||[])[index]){
    selectExhibit(parts[1],index);setPanel(parts[1]);setMap(false);return;
   }
  }
  setPanel(id);setMap(false);
 },[selectExhibit]);onPickRef.current=openPanel;
 onStepRef.current=setPosition;
 const closeWithCamera = useCallback(kind => {
  if (dismissTimeout.current) clearTimeout(dismissTimeout.current);
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
   if (kind==='overview') {setOverview(false);setCinematicZone(null);}
   if (kind==='map')setMap(false);
   if (kind==='panel')setPanel(null);
   if (kind==='language')setChangeLang(false);
   if (kind==='splat')setSplat(false);
   if (kind==='tutorial')setTutorial(false);
   return;
  }
  setClosingModal(kind);
  dismissTimeout.current=setTimeout(()=>{
   dismissTimeout.current=null;
   if (kind==='overview') {setOverview(false);setCinematicZone(null);}
   if (kind==='map')setMap(false);
   if (kind==='panel')setPanel(null);
   if (kind==='language')setChangeLang(false);
   if (kind==='splat')setSplat(false);
   if (kind==='tutorial')setTutorial(false);
   setClosingModal(null);
  },440);
 },[]);
 useEffect(()=>()=>{
  if(journeyTimeout.current)clearTimeout(journeyTimeout.current);
  if(dismissTimeout.current)clearTimeout(dismissTimeout.current);
 },[]);
 useEffect(()=>{const previous=document.body.style.overflow;document.body.style.overflow='hidden';document.title='Luis Emilio Rojas — Professional Universe';return ()=>{document.body.style.overflow=previous;};},[]);
 useEffect(()=>{try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(done));}catch{}if(world.current)world.current.moveControls(done);},[done]);
 useEffect(()=>{if(world.current)world.current.setLanguage(lang);},[lang]);
 useEffect(()=>{if(world.current)world.current.flyDrone(droneFlying);},[droneFlying]);
 // In-game dialogs get a physical camera dolly before their 3D foreground panel arrives.
 useEffect(()=>{
  if (!world.current || phase !== 'world' || failed) return;
  const focus = closingModal ? null : overview ? 'profile' : map ? 'map' : changeLang ? 'language' : splat ? 'splat' : panel ? 'detail' : tutorial ? 'tutorial' : welcome ? 'welcome' : null;
  if (world.current.focusOverlay) world.current.focusOverlay(focus);
 },[phase,overview,map,changeLang,splat,panel,tutorial,welcome,failed,closingModal]);
 useEffect(()=>{if(world.current)world.current.pause(phase!=='world'||welcome||tutorial||map||overview||changeLang||!!panel||splat||failed);},[phase,welcome,tutorial,map,overview,changeLang,panel,splat,failed]);
 useEffect(()=>{
  if(phase!=='portal'||initializing.current||world.current||!canvas.current)return undefined;
  initializing.current=true;let cancelled=false;
  import('./createLifeWorld').then(m=>{
   if(cancelled)return;
   const instance=m.default({canvas:canvas.current,language:lang,onNear:setNear,onPick:id=>onPickRef.current&&onPickRef.current(id),onStep:loc=>onStepRef.current&&onStepRef.current(loc),onFail:()=>{setFailed(true);setPhase('world');}});
   if(!instance){setFailed(true);setPhase('world');return;}
   world.current=instance;instance.setQuality(quality);setWorldReady(true);
   instance.moveControls(done);instance.setLanguage(lang);instance.transition(()=>{if(!cancelled){setPhase('world');setWelcome(true);}});
  }).catch(()=>{if(!cancelled){setFailed(true);setPhase('world');}});
  return ()=>{cancelled=true;};
 // Entering portal only happens once per mounted experience.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[phase]);
 useEffect(()=>()=>{if(world.current){world.current.dispose();world.current=null;}},[]);
 // Keep keyboard focus inside the currently opened dialog. Escape remains global.
 useEffect(()=>{
   const nodes=Array.from(document.querySelectorAll('.ler-universe [role="dialog"]'));
   const dialog=nodes[nodes.length-1];if(!dialog)return undefined;
   const previous=document.activeElement;
   const getFocusables=()=>Array.from(dialog.querySelectorAll('button:not([disabled]),a[href],input,select,[tabindex]:not([tabindex="-1"])')).filter(el=>el.getClientRects().length>0);
   const first=getFocusables()[0];if(first)first.focus();else{dialog.setAttribute('tabindex','-1');dialog.focus();}
   function keepFocus(e){if(e.key!=='Tab')return;const items=getFocusables();if(!items.length){e.preventDefault();dialog.focus();return;}
     const a=items[0],b=items[items.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus();}else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus();}}
   document.addEventListener('keydown',keepFocus);
   return ()=>{document.removeEventListener('keydown',keepFocus);if(previous&&typeof previous.focus==='function')previous.focus();};
 },[phase,welcome,tutorial,map,overview,changeLang,panel,splat,failed]);
 const blocked=phase!=='world'||welcome||tutorial||map||overview||changeLang||!!panel||splat||failed;
 useEffect(()=>{
   const down=e=>{if(e.key==='Escape'){if(closingModal)return;if(splat)closeWithCamera('splat');else if(panel)closeWithCamera('panel');else if(tutorial)closeWithCamera('tutorial');else if(map)closeWithCamera('map');else if(overview)closeWithCamera('overview');else if(changeLang)closeWithCamera('language');return;}
    if(blocked)return;
    const key=e.key.toLowerCase();
    if(key==='r'){e.preventDefault();if(world.current&&world.current.resetCamera)world.current.resetCamera();return;}if(key==='e'){e.preventDefault();const item=world.current&&world.current.getNear();if(item)openPanel(item.id);return;}
    if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','shift'].includes(key)){e.preventDefault();if(world.current)world.current.keys(key,true);}
   };
   const up=e=>{if(world.current)world.current.keys(e.key,false);};
   const blur=()=>{if(world.current)world.current.clearKeys();};
   window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',blur);document.addEventListener('visibilitychange',blur);
   return ()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',blur);document.removeEventListener('visibilitychange',blur);};
 },[blocked,openPanel,closingModal,splat,panel,tutorial,map,overview,changeLang,closeWithCamera]);
 const travel=id=>{setWelcome(false);setTutorial(false);setPanel(null);setOverview(false);setMap(false);setSplat(false);if(phase==='world'&&world.current){world.current.clearKeys();world.current.teleport(id);}};
 const start=()=>{setWelcome(false);setTutorial(false);if(world.current)world.current.enter();};
 const showTutorial=()=>{setWelcome(false);setTutorial(true);};
 const apply=id=>{setDone(old=>old.includes(id)?old:old.concat(id));};
 const inspectRisk=id=>{
  if(!RISKS.some(r=>r.id===id))return;
  // The 3D scene places the visitor next to the chosen hazard. The window closes
  // to encourage inspection of the physical scene before pressing E again.
  if(world.current&&world.current.teleportToRisk)world.current.teleportToRisk(id);
  setPanel(null);setMap(false);setOverview(false);
 };
 const cycleQuality=()=>setQuality(previous=>{const next=previous==='auto'?'eco':previous==='eco'?'high':'auto';if(world.current&&world.current.setQuality)world.current.setQuality(next);return next;});
 const reset=()=>{setDone([]);setDroneFlying(false);setPanel(null);if(world.current)world.current.reset();};
 const press=(key,yes)=>{if(world.current)world.current.keys(key,yes);};
 const onJoystick=useCallback((x,y)=>{if(world.current)world.current.setJoystick(x,y);},[]);
 const pointerButton=(k,symbol,description)=> <button type="button" aria-label={description} onPointerDown={e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);press(k,true);}} onPointerUp={e=>{press(k,false);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}} onPointerCancel={()=>press(k,false)} onLostPointerCapture={()=>press(k,false)}>{symbol}</button>;
 const mainOverlay=welcome||tutorial||map||overview||changeLang||!!panel||splat||failed;
 const inFilm=['language','language-to-intro','intro','portfolio','intro-to-world','portfolio-to-world'].includes(phase);
 const cameraCue = closingModal ? (phase==='portfolio'?`folio:${JOURNEY_SECTIONS[portfolioIndex].id}`:(phase==='language'?'language':'intro')) : overview ? `profile:${cinematicZone||'osh'}` : changeLang ? 'languageModal' : (phase==='intro-to-world'||phase==='portfolio-to-world') ? 'portal' : phase==='portfolio' ? `folio:${JOURNEY_SECTIONS[portfolioIndex].id}` : (phase==='intro'||phase==='language-to-intro' ? 'intro' : 'language');
 return <main className={`ler-universe ler-phase-${phase}${mainOverlay?' ler-dialog-is-open':''}${closingModal?' ler-dialog-closing':''}`} lang={lang}>
  {inFilm&&<CinematicBackdrop cue={cameraCue}/>}
  {(phase==='language'||phase==='language-to-intro')&&<LanguageGate key="language-gate" lang={lang} choose={chooseLanguage}/>}
  {(phase==='intro'||phase==='language-to-intro'||phase==='intro-to-world')&&<FilmIntro key="film-intro" t={t} lang={lang} onGame={goPortal} onPortfolio={()=>{setPortfolioIndex(0);setPhase('portfolio');}} onSection={index=>{setPortfolioIndex(index);setPhase('portfolio');}} onQuick={()=>setOverview(true)} onLanguage={()=>setChangeLang(true)}/>}
  {phase==='portfolio'&&<ProfessionalJourney lang={lang} active={portfolioIndex} onChange={setPortfolioIndex} onBack={()=>setPhase('intro')} onGame={goPortal} onLanguage={()=>setChangeLang(true)}/>}
  {phase==='portfolio-to-world'&&<div className="ler-portfolio-portal-transition" role="status" aria-live="polite"><span className="ler-kicker">LER / LIFE WORLD</span><strong>{t.enter}</strong><p>{t.transition}</p></div>}
  {(phase==='portal'||phase==='world')&&<canvas className="ler-world-canvas" ref={canvas} aria-label={lang==='es'?'Mundo interactivo tridimensional':'Interactive three-dimensional world'}/>}
  {phase==='portal'&&<div className="ler-portal" role="status" aria-live="polite"><div className="ler-portal-ring" aria-hidden="true"><i/><i/><i/></div><p className="ler-kicker">{t.transition}</p><strong>{t.loading}</strong><span>{t.loadingHint}</span><span className="ler-portal-status">{worldReady?t.ready:t.initializing}</span></div>}
  {phase!=='language'&&phase!=='language-to-intro'&&phase!=='intro-to-world'&&phase!=='portfolio-to-world'&&phase!=='portfolio'&&phase!=='portal'&&<header className="ler-nav"><button type="button" className="ler-brand" aria-label="Luis Emilio Rojas" onClick={()=>setOverview(true)}><b>LER.</b><span>{t.hud}</span></button><nav aria-label={t.quickTitle}>
   {phase==='world'&&<button type="button" onClick={()=>setMap(true)}>{t.map}</button>}
   <button type="button" onClick={()=>setOverview(true)}>{t.quick}</button><button type="button" onClick={()=>setChangeLang(true)}>{lang.toUpperCase()} <span aria-hidden="true">⌄</span></button>
   {phase==='world'&&<button className="ler-exit-game" type="button" onClick={returnToPortfolio}>← {lang==='es'?'VOLVER AL PORTAFOLIO':'BACK TO PORTFOLIO'}</button>}
  </nav></header>}
  {phase==='world'&&!failed&&<>
   <div className="ler-hud-id"><span className="ler-hud-line"/>{t.scene}<small>{t.position} {position.x.toFixed(0)} / {position.z.toFixed(0)}</small></div>
   <div className="ler-hud-status"><span>{t.safety}</span><b>{done.length} / 03</b></div>
   {!mainOverlay&&<div className={`ler-proximity ${near?'ler-proximity-active':'ler-proximity-idle'}`} role="status"><div className="ler-proximity-mark" aria-hidden="true"><LifeWorldIcon name={near&&RISKS.some(r=>r.id===near.id)?'oshlix':(AREA_ICONS[near&&near.id&&near.id.startsWith('exhibit:')?near.id.split(':')[1]:(near&&near.id)]||'location')} size={23}/></div><div className="ler-proximity-copy"><small>{near?t.near:t.worldTitle}</small><strong>{near?(exhibitLabel(near.id,lang)||labelFor(near.id,lang)):t.scene}</strong></div>{near&&<button type="button" onClick={()=>openPanel(near.id)}><span>{t.interact}</span><kbd>E</kbd><LifeWorldIcon name="arrow" size={16}/></button>}</div>}
   <div className="ler-hud-bottom"><button type="button" onClick={()=>world.current&&world.current.resetCamera()} aria-label={lang==='es'?'Restablecer cámara':'Reset camera'} title={lang==='es'?'Restablecer cámara (R)':'Reset camera (R)'}>◎ {lang==='es'?'CÁMARA':'CAMERA'} · R</button><button type="button" onClick={cycleQuality} title={lang==='es'?'Alternar calidad gráfica':'Cycle graphics quality'}>◈ {lang==='es'?'CALIDAD':'QUALITY'}: {quality.toUpperCase()}</button><button type="button" onClick={()=>setTutorial(true)}>ⓘ {t.helpLater}</button><button type="button" onClick={()=>setMap(true)}>⌘ {t.map}</button><button type="button" onClick={reset}>↺ {t.restart}</button></div>
   {!mainOverlay&&<><TouchJoystick label={t.touchMove} onMove={onJoystick}/>
    <div className="ler-touch-actions"><button className="ler-touch-action" type="button" disabled={!near} onClick={()=>near&&openPanel(near.id)}>{t.interact} · E</button>{pointerButton('shift',t.runMobile,t.runD)}</div></>}
  </>}
  {welcome&&phase==='world'&&!failed&&<WorldWelcome t={t} onStart={start} onSkip={start} onTutorial={showTutorial} onExit={returnToPortfolio}/>}
  {tutorial&&phase==='world'&&!failed&&<Tutorial t={t} onClose={start}/>}
  {map&&phase==='world'&&!failed&&<MapPanel t={t} lang={lang} position={position} onGo={travel} onClose={()=>closeWithCamera('map')}/>}
  {overview&&<Overview t={t} lang={lang} onClose={()=>{setOverview(false);setCinematicZone(null);}} onZoneSelect={setCinematicZone}/>}
  {changeLang&&<div className="ler-scrim"><section className="ler-language-modal" role="dialog" aria-modal="true" aria-label={t.language}><div className="ler-panel-top"><span className="ler-kicker">EN / ES</span><button type="button" onClick={()=>closeWithCamera('language')}>✕ {t.close}</button></div><h2>{t.choose}</h2><p>{t.chooseSub}</p><button className="ler-secondary" type="button" onClick={()=>{if(lc&&lc.setLang)lc.setLang('en');closeWithCamera('language');}}>CONTINUE IN ENGLISH</button><button className="ler-secondary" type="button" onClick={()=>{if(lc&&lc.setLang)lc.setLang('es');closeWithCamera('language');}}>CONTINUAR EN ESPAÑOL</button></section></div>}
  {panel&&phase==='world'&&<PlacePanel id={panel} t={t} lang={lang} done={done} onApply={apply} onInspectRisk={inspectRisk} droneFlying={droneFlying} onFly={()=>setDroneFlying(v=>!v)} onSplat={()=>{setPanel(null);setSplat(true);}} onTravel={travel} onClose={()=>closeWithCamera('panel')} selection={exhibitSelection} onSelect={selectExhibit}/>}
  {splat&&phase==='world'&&<div className="ler-scrim ler-splat-scrim"><section className="ler-splat-window" role="dialog" aria-modal="true" aria-label="La Gaitana 3DGS"><div className="ler-panel-top"><b>LA GAITANA / 3DGS</b><button type="button" onClick={()=>closeWithCamera('splat')}>✕ {t.close3d}</button></div><iframe src={LINKS.laGaitanaEmbed} title="La Gaitana — Real 3D Gaussian Splatting" loading="lazy" allow="fullscreen; accelerometer; gyroscope" allowFullScreen/><footer><span>{t.real3d}</span><External href={LINKS.laGaitana}>{t.openSite}</External></footer></section></div>}
  {failed&&phase==='world'&&<div className="ler-fallback" role="alert"><span className="ler-kicker">{t.webglMeta}</span><h2>{t.noWebgl}</h2><p>{t.introQuick}</p><div className="ler-fallback-places">{PLACES.map(p=><button type="button" key={p.id} onClick={()=>openPanel(p.id)}>{p.label[lang]} ↗</button>)}</div><div className="ler-overview-links"><External href={LINKS.resume}>{t.resume}</External><External href={LINKS.oshlix}>OSHLIX</External><External href={LINKS.github}>GITHUB</External><a href={`mailto:${LINKS.email}`}>{t.email}</a></div></div>}
 </main>;
}
