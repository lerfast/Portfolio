import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { StyleProvider } from "../contexts/styleContext";
import LangContext from "../contexts/langContext";
import { getContent } from "../portfolio";
import Skills from "../containers/skills/Skills";
import Projects from "../containers/projects/Projects";
import Commitment from "../containers/commitment/Commitment";
import Certifications from "../containers/certifications/Certifications";
import DroneOperations from "../containers/droneOperations/DroneOperations";
import GaussianSplatting from "../containers/gaussianSplatting/GaussianSplatting";
import Cycling from "../components/cycling/Cycling";
import MissionPatrimonio from "../containers/missionPatrimonio/MissionPatrimonio";
import Blogs from "../containers/blogs/Blogs";
import Profile from "../containers/profile/Profile";
import Footer from "../components/footer/Footer";
import "./V3Portfolio.css";
import "./V3VisualPolish.css";

const GAME_URL = "?v3demo=life-world";

const CONTENT = {
  en: {
    eyebrow: "PORTFOLIO / LUIS EMILIO ROJAS", badge: "Professional portfolio · Experience 03",
    introLine: "Technology with purpose.", introStrong: "People at the center.",
    lead: "I bring business administration, occupational health and safety, and software development together to build solutions with a meaningful purpose: protecting people.",
    prof: ["Business Administrator", "Specialist in Occupational Health and Safety Management", "Software Developer"],
    explore: "Explore my work", world: "Enter the interactive world", worldLabel: "BONUS EXPERIENCE · 3D WORLD",
    worldText: "Prefer to discover my work as a video game? Enter LIFE WORLD, an optional interactive campus.",
    sound: "Cinematic view", motionOff: "Reduce animations", motionOn: "Enable animations", light: "Light theme", dark: "Dark theme",
    nav: ["Introduction", "Capabilities", "Projects & Oshlix", "Safety", "Credentials", "Drones", "3DGS", "Media", "Misión Patrimonio", "Writing", "Contact"],
    menu: "Sections", menuClose: "Close menu", chapter: "CHAPTER", toTop: "Back to top", scroll: "SCROLL TO DISCOVER",
    sections: [
      {number: "01", eyebrow: "THE FOUNDATION", title: "The skills behind the work.", description: "Business perspective, prevention and software engineering working together.", id: "skills", accent: "cyan"},
      {number: "02", eyebrow: "FEATURED WORK", title: "Ideas turned into real projects.", description: "Oshlix leads my technology work. Explore the original project portfolio and its verified links.", id: "projects", accent: "coral"},
      {number: "03", eyebrow: "PURPOSE & IMPACT", title: "Technology should help protect lives.", description: "Occupational health and safety is a central part of my professional identity.", id: "commitment", accent: "green"},
      {number: "04", eyebrow: "PROFESSIONAL EVIDENCE", title: "The preparation behind the practice.", description: "Qualifications, learning and documented credentials.", id: "certs", accent: "gold"},
      {number: "05", eyebrow: "SPECIALTY / UAS", title: "A different perspective, professionally flown.", description: "Professional drone operations, operational safety and spatial capture.", id: "drone-operations", accent: "cyan"},
      {number: "06", eyebrow: "SPATIAL INNOVATION", title: "Reality, reconstructed.", description: "Discover 3D Gaussian Splatting and explore a real reconstruction of La Gaitana.", id: "gaussian-splatting", accent: "purple"},
      {number: "07", eyebrow: "VISUAL STORYTELLING", title: "Stories beyond the screen.", description: "Video editing, aerial cinematography and the Ride & Fly channel.", id: "cycling", accent: "coral"},
      {number: "08", eyebrow: "A DOCUMENTARY JOURNEY", title: "Misión Patrimonio.", description: "Explore Colombia and Ecuador through original videos, 360° experiences and 3D projects.", id: "mission-patrimonio", accent: "gold"},
      {number: "09", eyebrow: "THOUGHTS & IDEAS", title: "The written perspective.", description: "Development, professional learning and lessons from building technology.", id: "blogs", accent: "purple"},
      {number: "10", eyebrow: "LET'S BUILD SOMETHING", title: "Where ideas become conversations.", description: "Find my contact information and professional networks below.", id: "contact", accent: "green"}
    ]
  },
  es: {
    eyebrow: "PORTAFOLIO / LUIS EMILIO ROJAS", badge: "Portafolio profesional · Experiencia 03",
    introLine: "Tecnología con propósito.", introStrong: "Las personas primero.",
    lead: "Conecto la administración de empresas, la seguridad y salud en el trabajo y el desarrollo de software para crear soluciones con un propósito importante: proteger a las personas.",
    prof: ["Administrador de Empresas", "Especialista en Gerencia de Seguridad y Salud en el Trabajo", "Desarrollador de software"],
    explore: "Descubrir mis proyectos", world: "Entrar al mundo interactivo", worldLabel: "EXPERIENCIA EXTRA · MUNDO 3D",
    worldText: "¿Prefieres descubrir mi trabajo como un videojuego? Entra a LIFE WORLD, un campus interactivo opcional.",
    sound: "Vista cinematográfica", motionOff: "Reducir animaciones", motionOn: "Activar animaciones", light: "Modo claro", dark: "Modo oscuro",
    nav: ["Introducción", "Capacidades", "Proyectos y Oshlix", "Seguridad", "Credenciales", "Drones", "3DGS", "Audiovisual", "Misión Patrimonio", "Artículos", "Contacto"],
    menu: "Secciones", menuClose: "Cerrar menú", chapter: "CAPÍTULO", toTop: "Volver arriba", scroll: "DESLIZA PARA DESCUBRIR",
    sections: [
      {number: "01", eyebrow: "LOS FUNDAMENTOS", title: "Las habilidades detrás del trabajo.", description: "Gestión empresarial, prevención e ingeniería de software conectadas.", id: "skills", accent: "cyan"},
      {number: "02", eyebrow: "PROYECTOS DESTACADOS", title: "Ideas convertidas en proyectos reales.", description: "Oshlix lidera mi trabajo tecnológico. Conoce el portafolio original y sus enlaces verificados.", id: "projects", accent: "coral"},
      {number: "03", eyebrow: "PROPÓSITO E IMPACTO", title: "La tecnología debe ayudar a proteger vidas.", description: "La seguridad y salud en el trabajo está en el centro de mi identidad profesional.", id: "commitment", accent: "green"},
      {number: "04", eyebrow: "TRAYECTORIA PROFESIONAL", title: "La formación detrás de la práctica.", description: "Títulos académicos, aprendizaje y credenciales documentadas.", id: "certs", accent: "gold"},
      {number: "05", eyebrow: "ESPECIALIDAD / UAS", title: "Otra perspectiva, con responsabilidad profesional.", description: "Piloto profesional UAS con licencia vigente, seguridad operacional y captura espacial.", id: "drone-operations", accent: "cyan"},
      {number: "06", eyebrow: "INNOVACIÓN ESPACIAL", title: "La realidad, reconstruida.", description: "Descubre Gaussian Splatting 3D y explora una reconstrucción real de La Gaitana.", id: "gaussian-splatting", accent: "purple"},
      {number: "07", eyebrow: "NARRATIVA AUDIOVISUAL", title: "Historias más allá de la pantalla.", description: "Edición de video, cinematografía aérea y el canal Ride & Fly.", id: "cycling", accent: "coral"},
      {number: "08", eyebrow: "UN VIAJE DOCUMENTAL", title: "Misión Patrimonio.", description: "Explora Colombia y Ecuador mediante videos, experiencias 360° y proyectos 3D originales.", id: "mission-patrimonio", accent: "gold"},
      {number: "09", eyebrow: "IDEAS Y REFLEXIONES", title: "La perspectiva escrita.", description: "Desarrollo, aprendizaje profesional y lecciones de construir tecnología.", id: "blogs", accent: "purple"},
      {number: "10", eyebrow: "CONSTRUYAMOS ALGO", title: "De las ideas a las conversaciones.", description: "Encuentra mis datos de contacto y redes profesionales a continuación.", id: "contact", accent: "green"}
    ]
  }
};

const Icon = ({ name, size = 20 }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (name === "arrow") return <svg {...common}><path d="M4 12h16m-7-7 7 7-7 7"/></svg>;
  if (name === "external") return <svg {...common}><path d="M7 17 17 7M8 7h9v9"/></svg>;
  if (name === "globe") return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18"/></svg>;
  if (name === "sun") return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>;
  if (name === "moon") return <svg {...common}><path d="M20.7 14.1A9 9 0 0 1 9.9 3.3 9 9 0 1 0 20.7 14.1Z"/></svg>;
  if (name === "play") return <svg {...common}><path d="m8 5 11 7-11 7V5Z"/></svg>;
  if (name === "menu") return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
  if (name === "close") return <svg {...common}><path d="M5 5l14 14M19 5 5 19"/></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 2 3.5 5v6c0 5 3 8.5 8.5 11 5.5-2.5 8.5-6 8.5-11V5L12 2Z"/><path d="m8 12 3 3 5-6"/></svg>;
  return null;
};

/** Animated Three.js environment. Content stays accessible even if WebGL cannot initialize. */
function CinematicStage({ active, reduced }) {
  const ref = useRef(null);
  const engine = useRef(null);
  useEffect(() => {
    if (reduced || !ref.current) return undefined;
    let disposed = false;
    import("./createCinematicPortfolio").then(({ default: createStage }) => {
      if (disposed || !ref.current) return;
      engine.current = createStage(ref.current);
      if (engine.current) engine.current.setChapter(active);
    }).catch(() => {});
    return () => { disposed = true; if (engine.current) { engine.current.dispose(); engine.current = null; } };
  // Intentional lifecycle: only rebuild when reduced-motion preference changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);
  useEffect(() => { if (engine.current) engine.current.setChapter(active); }, [active]);
  return <div className="v3-cinema" aria-hidden="true"><canvas ref={ref} className="v3-cinema-canvas"/><div className="v3-cinema-glow"/><div className="v3-cinema-grid"/></div>;
}

function V3Hero({ t, lang, data }) {
  const socials = data.socialMediaLinks;
  return <section className="v3-hero" id="greeting" data-v3-scene="hero" aria-labelledby="v3-hero-title">
    <div className="v3-hero-main">
      <div className="v3-hero-copy">
        <div className="v3-hero-meta"><span className="v3-pulse"/><span>{t.badge}</span></div>
        <p className="v3-hero-eyebrow">{t.eyebrow}</p>
        <h1 id="v3-hero-title">{t.introLine}<br/><em>{t.introStrong}</em></h1>
        <p className="v3-hero-lead">{t.lead}</p>
        <div className="v3-professions" aria-label={lang === "es" ? "Perfil profesional" : "Professional qualifications"}>
          {t.prof.map((role, index) => <div key={role}><span>{String(index + 1).padStart(2, "0")}</span>{role}</div>)}
        </div>
        <div className="v3-hero-actions">
          <a className="v3-button v3-button-primary" href="#projects">{t.explore}<Icon name="arrow"/></a>
          <a className="v3-button v3-button-outline" href={GAME_URL}><Icon name="play" size={17}/>{t.world}</a>
        </div>
      </div>
      <div className="v3-hero-visual" aria-label={lang === "es" ? "Visualización tecnológica en movimiento" : "Moving technology visualization"}>
        <div className="v3-visual-orbit v3-visual-orbit-one"/><div className="v3-visual-orbit v3-visual-orbit-two"/>
        <div className="v3-visual-core"><Icon name="shield" size={55}/><span>HUMAN<br/>FIRST</span></div>
        <div className="v3-visual-micro v3-micro-top"><small>01 / PURPOSE</small><strong>{lang === "es" ? "PREVENCIÓN" : "PREVENTION"}</strong></div>
        <div className="v3-visual-micro v3-micro-bottom"><small>02 / TECHNOLOGY</small><strong>OSHLIX + SOFTWARE</strong></div>
        <span className="v3-visual-cross" aria-hidden="true">+</span>
      </div>
    </div>
    <div className="v3-hero-bottom">
      <div className="v3-hero-scroll"><span className="v3-scroll-indicator"/>{t.scroll}</div>
      <div className="v3-hero-links"><a href={socials.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href={socials.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a></div>
    </div>
    <a className="v3-world-teaser" href={GAME_URL}><span className="v3-world-teaser-icon"><Icon name="play" size={20}/></span><span><small>{t.worldLabel}</small><strong>{t.worldText}</strong></span><Icon name="external" size={18}/></a>
  </section>;
}

function Chapter({ item, chapter, children }) {
  return <section className={`v3-chapter v3-accent-${item.accent}`} data-v3-scene={chapter} aria-labelledby={`v3-chapter-heading-${chapter}`}>
    <div className="v3-chapter-mark" aria-hidden="true">{item.number}</div>
    <div className="v3-chapter-header">
      <div className="v3-chapter-index"><span className="v3-chapter-rule"/>{item.eyebrow}<span className="v3-index-end">/ {item.number}</span></div>
      <h2 id={`v3-chapter-heading-${chapter}`}>{item.title}</h2>
      <p>{item.description}</p>
      <span className="v3-chapter-coordinate" aria-hidden="true">LER / {String(chapter + 1).padStart(2, "0")} — 2026</span>
    </div>
    <div className="v3-chapter-content">{children}</div>
  </section>;
}

function PortfolioHeader({ lang, setLang, t, isDark, changeTheme, active, motion, toggleMotion }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = () => setMenuOpen(false);
  useEffect(() => { if (!menuOpen) return undefined; const onKey = e => { if (e.key === "Escape") setMenuOpen(false); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [menuOpen]);
  const items = ["greeting", ...t.sections.map(section => section.id)];
  return <>
    <header className="v3-header">
      <a className="v3-brand" href="#greeting" onClick={go} aria-label="Luis Emilio Rojas — Home"><strong>LER<span>.</span></strong><small>LUIS EMILIO ROJAS<br/>PROFESSIONAL PORTFOLIO</small></a>
      <nav className="v3-desktop-nav" aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}>
        {[0,2,3,5,7,10].map(index => <a key={items[index]} className={active === index ? "is-active" : ""} href={`#${items[index]}`}>{t.nav[index]}</a>)}
      </nav>
      <div className="v3-nav-actions">
        <button type="button" className="v3-icon-button" onClick={changeTheme} aria-label={isDark ? t.light : t.dark} title={isDark ? t.light : t.dark}><Icon name={isDark ? "sun" : "moon"}/></button>
        <button type="button" className="v3-icon-button" onClick={toggleMotion} aria-label={motion ? t.motionOff : t.motionOn} title={motion ? t.motionOff : t.motionOn}>{motion ? "◉" : "◎"}</button>
        <button type="button" className="v3-language" onClick={() => setLang(lang === "en" ? "es" : "en")} aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}><Icon name="globe" size={16}/>{lang.toUpperCase()}</button>
        <button type="button" className="v3-mobile-menu-toggle" aria-expanded={menuOpen} aria-controls="v3-mobile-menu" aria-label={menuOpen ? t.menuClose : t.menu} onClick={() => setMenuOpen(v => !v)}><Icon name={menuOpen ? "close" : "menu"} size={23}/></button>
      </div>
    </header>
    {menuOpen && <nav id="v3-mobile-menu" className="v3-mobile-menu" aria-label={t.menu}>
      {items.map((id, index) => <a key={id} href={`#${id}`} onClick={go}><span>{String(index).padStart(2,"0")}</span>{t.nav[index]}<Icon name="arrow" size={18}/></a>)}
      <a className="v3-menu-game" href={GAME_URL} onClick={go}><Icon name="play"/>{t.world}<Icon name="external"/></a>
    </nav>}
  </>;
}

export default function V3Portfolio() {
  const { lang, setLang } = useContext(LangContext);
  const t = CONTENT[lang] || CONTENT.en;
  const data = getContent(lang);
  const [active, setActive] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("isDark");
    return saved === "false" ? false : true;
  });
  const prefersReduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [motion, setMotion] = useState(() => !prefersReduced.current);
  useEffect(() => { localStorage.setItem("isDark", JSON.stringify(isDark)); }, [isDark]);
  const toggleMotion = useCallback(() => { setMotion(value => !value); }, []);
  const changeTheme = useCallback(() => setIsDark(value => !value), []);
  // In V3, legacy #anchors live inside their chapter, AFTER the cinematic chapter heading.
  // Navigate to the chapter frame instead; preserve the public hashes for bookmarked links.
  const jumpToChapter = useCallback((id, behavior = "auto") => {
    const destination = document.getElementById(id);
    if (!destination) return false;
    const chapter = destination.closest(".v3-chapter");
    const target = chapter || destination;
    target.scrollIntoView({ behavior, block: "start" });
    return true;
  }, []);
  const handleAnchorClick = useCallback((event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link || !event.currentTarget.contains(link)) return;
    const href = link.getAttribute("href");
    const id = href && href.slice(1);
    if (!id || !t.sections.some(section => section.id === id)) return;
    event.preventDefault();
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    jumpToChapter(id, motion ? "smooth" : "auto");
  }, [t.sections, jumpToChapter, motion]);
  useEffect(() => {
    const handleHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && t.sections.some(section => section.id === id)) jumpToChapter(id);
    };
    // Wait for React to paint the scene so deep links can resolve their real geometry.
    const frame = window.requestAnimationFrame(handleHash);
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("popstate", handleHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("popstate", handleHash);
    };
  }, [jumpToChapter, t.sections]);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll("[data-v3-scene]"));
    if (!scenes.length || typeof IntersectionObserver === "undefined") return undefined;
    // Observe chapter centers. Intersection activation drives the persistent Three.js camera.
    const observer = new IntersectionObserver(entries => {
      const candidates = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (candidates.length) { const key = candidates[0].target.getAttribute("data-v3-scene"); setActive(key === "hero" ? 0 : Number(key) + 1); }
    }, { rootMargin: "-24% 0px -37% 0px", threshold: [0, .15, .4, .7] });
    scenes.forEach(scene => observer.observe(scene));
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("v3-is-visible"); reveal.unobserve(entry.target); } }), {threshold: .08});
    document.querySelectorAll(".v3-chapter").forEach(node => reveal.observe(node));
    return () => { observer.disconnect(); reveal.disconnect(); };
  }, []);
  return <div onClick={handleAnchorClick} className={`v3-portfolio ${isDark ? "dark-mode v3-theme-dark" : "v3-theme-light"} ${motion ? "v3-motion-on" : "v3-motion-off"}`}>
    <StyleProvider value={{ isDark, changeTheme }}>
      <a className="v3-skip-link" href="#projects">{lang === "es" ? "Saltar a los proyectos" : "Skip to projects"}</a>
      <CinematicStage active={active} reduced={!motion}/>
      <PortfolioHeader lang={lang} setLang={setLang} t={t} isDark={isDark} changeTheme={changeTheme} active={active} motion={motion} toggleMotion={toggleMotion}/>
      <main className="v3-main">
        <V3Hero t={t} lang={lang} data={data}/>
        <Chapter item={t.sections[0]} chapter={0}><Skills/></Chapter>
        <Chapter item={t.sections[1]} chapter={1}><Projects/></Chapter>
        <Chapter item={t.sections[2]} chapter={2}><Commitment/></Chapter>
        <Chapter item={t.sections[3]} chapter={3}><Certifications/></Chapter>
        <Chapter item={t.sections[4]} chapter={4}><DroneOperations/></Chapter>
        <Chapter item={t.sections[5]} chapter={5}><GaussianSplatting/></Chapter>
        <Chapter item={t.sections[6]} chapter={6}><Cycling/></Chapter>
        <Chapter item={t.sections[7]} chapter={7}><MissionPatrimonio/></Chapter>
        <Chapter item={t.sections[8]} chapter={8}><Blogs/></Chapter>
        <Chapter item={t.sections[9]} chapter={9}><Profile/></Chapter>
      </main>
      <footer className="v3-ending"><div className="v3-ending-cta"><span>LER / 2026</span><a href="#greeting">{t.toTop} ↑</a></div><Footer/></footer>
      <div className="v3-progress-rail" aria-hidden="true"><span className="v3-progress-line"/><span className="v3-progress-dot" style={{top: `${Math.min(100, active / 10 * 100)}%`}}/><small>{String(active).padStart(2,"0")} / 10</small></div>
    </StyleProvider>
  </div>;
}
