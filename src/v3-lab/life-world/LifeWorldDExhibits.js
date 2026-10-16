import React,{useEffect,useState} from 'react';
import {EXHIBITS,videoPage,videoThumbnail} from './LifeWorldExhibitData';
import {LINKS} from './LifeWorldContent';
import LifeWorldIcon from './LifeWorldIcons';
import './LifeWorldDExhibits.css';

/* Delivery D: every option changes real content (and selected 3D screens).
 * Embeds are deliberately opt-in. Illustrative interfaces are not product screenshots.
 */
const TEXT={
 es:{catalog:'ESTACIONES INTERACTIVAS',choice:'Selecciona una exhibición',explore:'Explorar',open:'Abrir trabajo real',watch:'Reproducir video',stop:'Cerrar reproductor',gallery:'Trabajos publicados',original:'Ver en YouTube',illustration:'Visualización conceptual creada para este portafolio; no es una captura del software.',studio:'Estudio de edición',studioDesc:'Elige un clip en la línea de tiempo. Se actualizarán la selección en la sala y la vista previa.',heritage:'Atlas documental',heritageDesc:'Selecciona un destino para ver su vuelo publicado. Los recorridos 360° y splats solo aparecen si hay un enlace real.', credentials:'Formación y evidencia',credentialsDesc:'Mi trayectoria se presenta con acceso directo al CV y al perfil profesional. No se generan diplomas ficticios.',safety:'Seguridad + tecnología',capDesc:'Tres rutas para entender la relación entre SST, software y captura espacial. La simulación del laboratorio no es una función comercial de Oshlix.',visit:'Visitar espacio',splat:'Abrir La Gaitana en 3DGS real',drone:'Simulador de operaciones UAS',droneDesc:'La aeronave de esta escena es virtual. Puedes despegarla o aterrizarla y observar el cambio físico en el helipuerto.',launch:'Despegar dron virtual',land:'Aterrizar dron virtual',aerocivil:'Piloto profesional de drones UAS con licencia vigente (Aerocivil Colombia)',sms:'SMS aeronáutico y SG-SST comparten un enfoque preventivo, pero son sistemas distintos.',note:'Contenido ilustrativo; no reemplaza planificación ni requisitos de un vuelo real.',real3d:'Reconstrucción real: La Gaitana, Neiva',view360:'Recorrido 360° real de Neiva',pending:'Otros recorridos 360° y splats permanecen en preparación.',contact:'Contacto directo',contactDesc:'Puedes contactar directamente sin completar misiones ni salir del mundo.',email:'Correo electrónico',resume:'Ver mi CV',linked:'Perfil LinkedIn',code:'Repositorio GitHub',project:'Proyecto verificado',verify:'Abrir referencia',first:'Comienza por Oshlix y la prevención',intro:'Seleccionar estaciones cambia las pantallas físicas en el campus.',clip:'CLIP',of:'de',close:'Cerrar',training:'Esta experiencia es una demostración del portafolio, no una evaluación profesional real.'},
 en:{catalog:'INTERACTIVE STATIONS',choice:'Select an exhibit',explore:'Explore',open:'Open real project',watch:'Play video',stop:'Close player',gallery:'Published work',original:'Watch on YouTube',illustration:'Conceptual interface created for this portfolio; not an application screenshot.',studio:'Editing studio',studioDesc:'Pick a clip in the timeline. The studio screens and preview selection will update.',heritage:'Documentary atlas',heritageDesc:'Select a destination to view its published flight. 360° tours and splats are only linked when genuinely available.',credentials:'Credentials & evidence',credentialsDesc:'My education is presented with direct access to my resume and professional profile. No fictional certificates are generated.',safety:'Safety + technology',capDesc:'Three pathways illustrate the connection between OHS, software and spatial capture. The laboratory simulation is not a commercial Oshlix feature.',visit:'Visit space',splat:'Open real La Gaitana 3DGS',drone:'UAS operations simulator',droneDesc:'The aircraft in this scene is virtual. Launch or land it and observe the physical change over the landing pad.',launch:'Launch virtual drone',land:'Land virtual drone',aerocivil:'Licensed professional UAS drone pilot with a valid license (Aerocivil Colombia)',sms:'Aviation SMS and occupational OHS management share preventive principles, but are different systems.',note:'Illustrative content, not a substitute for real flight planning or legal requirements.',real3d:'Authentic reconstruction: La Gaitana, Neiva',view360:'Authentic Neiva 360° tour',pending:'Other 360° tours and splats are still in preparation.',contact:'Get in touch',contactDesc:'Contact me directly without completing missions or leaving the world.',email:'Email',resume:'View resume',linked:'LinkedIn profile',code:'GitHub repository',project:'Verified project',verify:'Open reference',first:'Start with Oshlix and safety',intro:'Selecting stations changes the actual screens inside the campus.',clip:'CLIP',of:'of',close:'Close',training:'This is a portfolio demonstration, not a professional risk assessment.'}
};
const Icon=({name})=><LifeWorldIcon name={name} size={18}/>;
function LinkTile({href,icon,title,sub}){return <a className="ler-d-link" target="_blank" rel="noopener noreferrer" href={href}><Icon name={icon}/><span><b>{title}</b>{sub&&<small>{sub}</small>}</span><b aria-hidden="true">↗</b></a>;}
function ClipPlayer({clip,lang,t}){
 const [playing,setPlaying]=useState(false);
 useEffect(()=>setPlaying(false),[clip&&clip.youtubeId]);
 if(!clip)return null;
 return <div className="ler-d-player">
  <div className="ler-d-player-frame">
   {playing?<iframe key={clip.youtubeId} src={`https://www.youtube-nocookie.com/embed/${clip.youtubeId}?autoplay=1&rel=0`} title={clip.name[lang]} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"/>:
    <button className="ler-d-thumb" type="button" onClick={()=>setPlaying(true)} aria-label={`${t.watch}: ${clip.name[lang]}`}><img src={videoThumbnail(clip.youtubeId)} alt="" loading="lazy" onError={e=>{e.currentTarget.style.opacity='0';}}/><span><Icon name="youtube"/>{t.watch}</span></button>}
  </div>
  <div className="ler-d-player-foot"><span>{clip.name[lang]}</span><div>{playing&&<button type="button" onClick={()=>setPlaying(false)}>{t.stop}</button>}<a href={videoPage(clip.youtubeId)} target="_blank" rel="noopener noreferrer">{t.original} ↗</a></div></div>
 </div>;
}
function ShowcaseChooser({items,lang,selected,onSelect,kind='grid'}){return <div className={`ler-d-chooser ler-d-chooser-${kind}`} role="group" aria-label={lang==='es'?'Elige una exhibición':'Choose an exhibit'}>{items.map((item,i)=><button key={item.id} type="button" className={i===selected?'is-active':''} onClick={()=>onSelect(i)} aria-pressed={i===selected}><span className="ler-d-choice-index">{String(i+1).padStart(2,'0')}</span><span>{item.name[lang]}</span><span className="ler-d-choice-arrow">↗</span></button>)}</div>;}
function ShowcaseCard({item,lang}){return <div className="ler-d-feature-card"><div className="ler-d-graphic" aria-hidden="true"><div className="ler-d-graphic-top"><span>LER / DEMO</span><i/><i/><i/></div><div className="ler-d-bars"><i/><i/><i/><i/></div><div className="ler-d-mini-grid"><i/><i/><i/></div></div><div className="ler-d-feature-title"><b>{item.name[lang]}</b><span>{item.subtitle&&item.subtitle[lang]}</span></div></div>;}
export default function LifeWorldDExhibits({id,lang,selected,onSelect,onTravel,onSplat,droneFlying,onFly}){
 const t=TEXT[lang]||TEXT.en,items=EXHIBITS[id]||[],safeSelected=Math.min(Math.max(selected||0,0),Math.max(0,items.length-1)),current=items[safeSelected];
 const choose=index=>onSelect(id,index);
 if(id==='drones')return <section className="ler-d-exhibit">
  <div className="ler-d-kicker"><Icon name="drone"/>{t.drone}</div><p>{t.droneDesc}</p>
  <div className="ler-d-flight"><div className={`ler-d-flight-led ${droneFlying?'is-active':''}`}/><div><span>UAS / THREE.JS</span><strong>{droneFlying?(lang==='es'?'EN VUELO · SIMULADO':'AIRBORNE · SIMULATED'):(lang==='es'?'EN PLATAFORMA · SIMULADO':'ON PAD · SIMULATED')}</strong></div></div>
  <button type="button" className="ler-d-action" onClick={onFly}><Icon name="drone"/>{droneFlying?t.land:t.launch}<span>↗</span></button>
  <div className="ler-d-facts"><div><Icon name="credentials"/>{t.aerocivil}</div><div><Icon name="oshlix"/>{t.sms}</div></div>
  <button className="ler-d-secondary" type="button" onClick={onSplat}><Icon name="rotate"/>{t.splat} ↗</button><p className="ler-d-caution">{t.note}</p>
 </section>;
 if(id==='contact')return <section className="ler-d-exhibit"><div className="ler-d-kicker"><Icon name="contact"/>{t.contact}</div><p>{t.contactDesc}</p><div className="ler-d-links"><LinkTile icon="whatsapp" title="WHATSAPP" href={LINKS.whatsapp}/><a className="ler-d-link" href={`mailto:${LINKS.email}`}><Icon name="mail"/><span><b>{t.email}</b><small>{LINKS.email}</small></span><b aria-hidden="true">↗</b></a><LinkTile icon="linkedin" title={t.linked} href={LINKS.linkedin}/><LinkTile icon="github" title="GITHUB" href={LINKS.github}/></div></section>;
 if(!items.length)return null;
 return <section className="ler-d-exhibit">
  <div className="ler-d-kicker"><Icon name={id==='studio'?'youtube':id==='heritage'?'heritage':id==='projects'?'software':id==='credentials'?'credentials':'capabilities'}/>{id==='studio'?t.studio:id==='heritage'?t.heritage:id==='credentials'?t.credentials:id==='capabilities'?t.safety:t.catalog}</div>
  <p>{id==='studio'?t.studioDesc:id==='heritage'?t.heritageDesc:id==='credentials'?t.credentialsDesc:id==='capabilities'?t.capDesc:t.intro}</p>
  <ShowcaseChooser items={items} lang={lang} selected={safeSelected} onSelect={choose} kind={id==='heritage'?'destinations':id==='studio'?'timeline':'grid'}/>
  {id==='studio'||id==='heritage'?<>
   <div className="ler-d-selection-meta">{t.clip} {String(safeSelected+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</div>
   <ClipPlayer clip={current} lang={lang} t={t}/>
   {id==='heritage'&&<><div className="ler-d-related"><button type="button" className="ler-d-secondary" onClick={onSplat}><Icon name="rotate"/>{t.real3d} ↗</button><LinkTile icon="youtube" title={t.view360} href={videoPage('I27aUEYO0G4')}/></div><p className="ler-d-caution">{t.pending}</p></>}
  </>:<>
   {current&&<ShowcaseCard item={current} lang={lang}/>}
   {id==='projects'&&current&&<><LinkTile icon="external" href={current.url} title={t.open} sub={current.name[lang]}/><p className="ler-d-caution">{t.illustration}</p></>}
   {id==='credentials'&&<><div className="ler-d-links"><LinkTile icon="resume" title={t.resume} href={LINKS.resume}/><LinkTile icon="linkedin" title={t.linked} href={LINKS.linkedin}/></div><p className="ler-d-caution">{t.credentialsDesc}</p></>}
   {id==='capabilities'&&<><div className="ler-d-links"><button type="button" className="ler-d-action" onClick={()=>onTravel(current&&current.id==='software'?'projects':current&&current.id==='spatial'?'drones':'osh')}><Icon name="arrow"/>{t.visit} · {current&&current.name[lang]} ↗</button>{current&&current.id==='spatial'&&<button type="button" className="ler-d-secondary" onClick={onSplat}><Icon name="rotate"/>{t.splat} ↗</button>}</div><p className="ler-d-caution">{t.training}</p></>}
  </>}
 </section>;
}
