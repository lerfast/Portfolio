/* LER V3 — Professional cinematic journey. Reuses the original production components
 * and their existing data, links, media and translations. No duplicated project data. */
import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { StyleProvider } from '../../contexts/styleContext';
import '../../v3-site/V3Portfolio.css';
import '../../v3-site/V3VisualPolish.css';
import './ProfessionalJourney.css';

const Skills = lazy(() => import('../../containers/skills/Skills'));
const Projects = lazy(() => import('../../containers/projects/Projects'));
const Commitment = lazy(() => import('../../containers/commitment/Commitment'));
const Certifications = lazy(() => import('../../containers/certifications/Certifications'));
const DroneOperations = lazy(() => import('../../containers/droneOperations/DroneOperations'));
const GaussianSplatting = lazy(() => import('../../containers/gaussianSplatting/GaussianSplatting'));
const Cycling = lazy(() => import('../../components/cycling/Cycling'));
const MissionPatrimonio = lazy(() => import('../../containers/missionPatrimonio/MissionPatrimonio'));
const Blogs = lazy(() => import('../../containers/blogs/Blogs'));
const Profile = lazy(() => import('../../containers/profile/Profile'));
const Footer = lazy(() => import('../../components/footer/Footer'));

export const JOURNEY_SECTIONS = [
  { id:'skills', component:Skills, number:'01', accent:'cyan',
    en:{nav:'Capabilities', eyebrow:'THE FOUNDATION', title:'The skills behind the work.', description:'Business perspective, prevention and software engineering working together.'},
    es:{nav:'Habilidades', eyebrow:'LOS FUNDAMENTOS', title:'Las habilidades detrás del trabajo.', description:'Gestión empresarial, prevención e ingeniería de software conectadas.'}},
  { id:'projects', component:Projects, number:'02', accent:'coral',
    en:{nav:'Projects & Oshlix', eyebrow:'FEATURED WORK', title:'Ideas turned into real projects.', description:'Oshlix leads my technology work. Explore the original portfolio and its verified links.'},
    es:{nav:'Proyectos y Oshlix', eyebrow:'PROYECTOS DESTACADOS', title:'Ideas convertidas en proyectos reales.', description:'Oshlix lidera mi trabajo tecnológico. Conoce mis proyectos reales y sus enlaces.'}},
  { id:'commitment', component:Commitment, number:'03', accent:'green',
    en:{nav:'Safety & purpose', eyebrow:'PURPOSE & IMPACT', title:'Technology should help protect lives.', description:'Occupational health and safety is central to my professional identity.'},
    es:{nav:'Seguridad y propósito', eyebrow:'PROPÓSITO E IMPACTO', title:'La tecnología debe ayudar a proteger vidas.', description:'La seguridad y salud en el trabajo está en el centro de mi identidad profesional.'}},
  { id:'certs', component:Certifications, number:'04', accent:'gold',
    en:{nav:'Credentials', eyebrow:'PROFESSIONAL EVIDENCE', title:'The preparation behind the practice.', description:'Qualifications, learning and documented credentials.'},
    es:{nav:'Certificaciones', eyebrow:'TRAYECTORIA PROFESIONAL', title:'La formación detrás de la práctica.', description:'Títulos académicos, aprendizaje y credenciales documentadas.'}},
  { id:'drone-operations', component:DroneOperations, number:'05', accent:'cyan',
    en:{nav:'Drone operations', eyebrow:'SPECIALTY / UAS', title:'A different perspective, professionally flown.', description:'Licensed professional drone pilot (valid license), operational safety and spatial capture.'},
    es:{nav:'Operaciones con drones', eyebrow:'ESPECIALIDAD / UAS', title:'Otra perspectiva, con responsabilidad profesional.', description:'Piloto profesional de drones con licencia vigente, seguridad operacional y captura espacial.'}},
  { id:'gaussian-splatting', component:GaussianSplatting, number:'06', accent:'purple',
    en:{nav:'3D Gaussian Splatting', eyebrow:'SPATIAL INNOVATION', title:'Reality, reconstructed.', description:'Discover 3D Gaussian Splatting and explore a real reconstruction of La Gaitana.'},
    es:{nav:'Gaussian Splatting 3D', eyebrow:'INNOVACIÓN ESPACIAL', title:'La realidad, reconstruida.', description:'Descubre 3D Gaussian Splatting y explora una reconstrucción real de La Gaitana.'}},
  { id:'cycling', component:Cycling, number:'07', accent:'coral',
    en:{nav:'Audiovisual', eyebrow:'VISUAL STORYTELLING', title:'Stories beyond the screen.', description:'Video editing, aerial cinematography and the Ride & Fly channel.'},
    es:{nav:'Audiovisual', eyebrow:'NARRATIVA AUDIOVISUAL', title:'Historias más allá de la pantalla.', description:'Edición de video, cinematografía aérea y el canal Ride & Fly.'}},
  { id:'mission-patrimonio', component:MissionPatrimonio, number:'08', accent:'gold',
    en:{nav:'Misión Patrimonio', eyebrow:'A DOCUMENTARY JOURNEY', title:'Misión Patrimonio.', description:'Explore Colombia and Ecuador through original videos, 360° experiences and 3D projects.'},
    es:{nav:'Misión Patrimonio', eyebrow:'UN VIAJE DOCUMENTAL', title:'Misión Patrimonio.', description:'Explora Colombia y Ecuador mediante videos, experiencias 360° y proyectos 3D originales.'}},
  { id:'blogs', component:Blogs, number:'09', accent:'purple',
    en:{nav:'Writing', eyebrow:'THOUGHTS & IDEAS', title:'The written perspective.', description:'Development, professional learning and lessons from building technology.'},
    es:{nav:'Artículos', eyebrow:'IDEAS Y REFLEXIONES', title:'La perspectiva escrita.', description:'Desarrollo, aprendizaje profesional y lecciones de construir tecnología.'}},
  { id:'contact', component:Profile, number:'10', accent:'green',
    en:{nav:'Contact', eyebrow:"LET'S BUILD SOMETHING", title:'Where ideas become conversations.', description:'Find my contact information and professional networks below.'},
    es:{nav:'Contacto', eyebrow:'CONSTRUYAMOS ALGO', title:'De las ideas a las conversaciones.', description:'Encuentra mis datos de contacto y redes profesionales a continuación.'}}
];

function readStoredTheme(){
  try { return localStorage.getItem('isDark') !== 'false'; } catch (_) { return true; }
}

export default function ProfessionalJourney({lang='en', active=0, onChange, onBack, onGame, onLanguage}) {
  const [dark, setDark] = useState(readStoredTheme);
  const [menu, setMenu] = useState(false);
  const viewport = useRef(null);
  const item = JOURNEY_SECTIONS[active] || JOURNEY_SECTIONS[0];
  const i = Math.max(0, JOURNEY_SECTIONS.indexOf(item));
  const copy = item[lang] || item.en;
  const Current = item.component;
  const es = lang === 'es';
  const setTheme = useCallback(()=>setDark(old=>!old), []);
  useEffect(()=>{try{localStorage.setItem('isDark',String(dark));}catch(_){}},[dark]);
  useEffect(()=>{if(viewport.current)viewport.current.scrollTop=0;setMenu(false);},[active]);
  useEffect(()=>{
    const onKey=e=>{
      if(e.key==='Escape' && menu){setMenu(false);return;}
      if(menu || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName))return;
      if(e.key==='ArrowRight' && e.shiftKey){e.preventDefault();onChange(Math.min(i+1,JOURNEY_SECTIONS.length-1));}
      if(e.key==='ArrowLeft' && e.shiftKey){e.preventDefault();onChange(Math.max(i-1,0));}
    };
    window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);
  },[i,onChange,menu]);
  const handleLinks=e=>{
    const link=e.target.closest('a[href^="#"]');
    if(!link)return;
    const id=link.getAttribute('href').slice(1);
    const targetIndex=JOURNEY_SECTIONS.findIndex(section=>section.id===id);
    if(targetIndex>=0){e.preventDefault();onChange(targetIndex);}
  };
  return <section className={`ler-journey v3-portfolio ${dark?'v3-theme-dark dark-mode':'v3-theme-light'}`} aria-label={es?'Portafolio cinematográfico':'Cinematic portfolio'}>
    <StyleProvider value={{isDark:dark,changeTheme:setTheme}}>
     <div className="ler-journey-top">
      <button className="ler-journey-brand" type="button" onClick={onBack} aria-label={es?'Volver a la introducción':'Return to introduction'}><b>LER<span>.</span></b><small>{es?'PORTAFOLIO PROFESIONAL':'PROFESSIONAL PORTFOLIO'}</small></button>
      <div className="ler-journey-top-actions">
       <span className="ler-journey-counter">{item.number} <span>/ 10</span></span>
       <button type="button" onClick={setTheme} aria-label={dark?(es?'Activar modo claro':'Switch to light theme'):(es?'Activar modo oscuro':'Switch to dark theme')}>{dark?'☀':'☾'}</button>
       <button type="button" onClick={onLanguage} aria-label={es?'Cambiar idioma':'Change language'}>{lang.toUpperCase()}</button>
       <button type="button" className="ler-journey-menu-toggle" aria-expanded={menu} onClick={()=>setMenu(value=>!value)}>{menu?(es?'Cerrar':'Close'):(es?'Secciones':'Sections')} <span aria-hidden="true">{menu?'×':'☰'}</span></button>
      </div>
     </div>
     <nav className={`ler-journey-index ${menu?'is-open':''}`} aria-label={es?'Secciones del portafolio':'Portfolio sections'}>
      {JOURNEY_SECTIONS.map((section,n)=><button type="button" key={section.id} onClick={()=>onChange(n)} aria-current={n===i?'step':undefined} className={n===i?'is-current':''}><span>{section.number}</span><span>{(section[lang]||section.en).nav}</span></button>)}
     </nav>
     <div ref={viewport} className="ler-journey-viewport" tabIndex={-1} onClick={handleLinks}>
       <div className={`ler-journey-frame v3-accent-${item.accent}`} key={item.id}>
        <div className="ler-journey-watermark" aria-hidden="true">{item.number}</div>
        <header className="ler-journey-heading">
          <div className="ler-journey-eyebrow"><i/>{copy.eyebrow}<span>/ {item.number}</span></div>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <small>LER / {item.number} — 2026</small>
        </header>
        <div className="v3-chapter-content ler-journey-content" aria-label={copy.nav}>
          <Suspense fallback={<div className="ler-journey-loading" role="status">{es?'Cargando contenido profesional…':'Loading professional content…'}</div>}><Current/>{item.id==='contact'&&<div className="ler-journey-preserved-footer"><Footer/></div>}</Suspense>
        </div>
        <div className="ler-journey-bottom">
         {i>0?<button type="button" className="ler-journey-prev" onClick={()=>onChange(i-1)}>← {es?'Anterior':'Previous'} <span>{(JOURNEY_SECTIONS[i-1][lang]||JOURNEY_SECTIONS[i-1].en).nav}</span></button>:<button type="button" className="ler-journey-prev" onClick={onBack}>← {es?'Introducción':'Introduction'}</button>}
         {i<JOURNEY_SECTIONS.length-1?<button type="button" className="ler-journey-next" onClick={()=>onChange(i+1)}>{es?'Siguiente espacio':'Next space'} <span>{(JOURNEY_SECTIONS[i+1][lang]||JOURNEY_SECTIONS[i+1].en).nav}</span> →</button>:<button type="button" className="ler-journey-next" onClick={onGame}>{es?'Explorar el videojuego (opcional)':'Explore the game (optional)'} →</button>}
        </div>
       </div>
     </div>
     <div className="ler-journey-footerbar"><span>{es?'UNA EXPERIENCIA CINEMATOGRÁFICA':'A CINEMATIC PROFESSIONAL JOURNEY'}</span><button type="button" onClick={onGame}>{es?'JUEGO 3D OPCIONAL':'OPTIONAL 3D GAME'} ↗</button></div>
    </StyleProvider>
  </section>;
}
