import React, { useContext, useState } from "react";
import PortfolioReveal from "../../components/motion/PortfolioReveal";
import LangContext from "../../contexts/langContext";
import { gaitanaDemo } from "../../data/missionPatrimonio";
import "./GaussianSplatting.css";

const COPY = {
  en: {
    eyebrow: "Spatial visualization · 3D Gaussian Splatting",
    title: "Spaces you can explore, not just look at",
    lead: "Imagine showing a real place to someone thousands of miles away and letting them choose where to look. That is the idea behind my work with 3D Gaussian Splatting.",
    details: "3D Gaussian Splatting (3DGS) is a technique for creating photorealistic, navigable representations of real scenes from images captured at different viewpoints. I combine drone and 360° imaging, dataset preparation, camera alignment, 3D training, and web publication to turn visual documentation into interactive experiences.",
    caution: "These visual reconstructions complement photography and video; they are not, by themselves, survey-grade measurements or a substitute for certified plans.",
    applicationsTitle: "Where this technology can make a difference",
    applications: [
      { title: "Real estate and architecture", text: "Present spatial context, finishes, and the experience of exploring a property or built environment remotely." },
      { title: "Tourism and heritage", text: "Offer interactive visits and visual documentation of landmarks and places with cultural value." },
      { title: "Businesses and project presentations", text: "Help clients understand spaces, installations, and locations without relying on a single fixed viewpoint." },
    ],
    caseEyebrow: "Interactive case study · Neiva, Colombia",
    caseTitle: "Monument to La Gaitana: a place with history",
    caseText1: "In Neiva, capital of the department of Huila in southern Colombia, the Monument to La Gaitana commemorates an Indigenous leader remembered for resistance during the Spanish conquest. Located near the Magdalena River, this monument is part of the city's cultural and historical identity.",
    caseText2: "My digital reconstruction invites visitors to approach the monument from different perspectives. More than a static photo, it is an example of how spatial capture and 3DGS can open a new way to experience cultural heritage.",
    loadingLabel: "Launch interactive 3D experience",
    previewLabel: "Interactive scene ready to explore",
    instructions: "Once loaded: drag to orbit, scroll or pinch to zoom. You can also use fullscreen.",
    openScene: "View original on SuperSplat",
    open360: "Explore Neiva in narrated 360° video",
    thirdParty: "The viewer loads content from SuperSplat only when you choose to launch it.",
  },
  es: {
    eyebrow: "Visualización espacial · 3D Gaussian Splatting",
    title: "Espacios que puedes recorrer, no solo observar",
    lead: "Imagina mostrarle un lugar real a alguien que está a miles de kilómetros y permitirle decidir hacia dónde mirar. Esa es la idea detrás de mi trabajo con 3D Gaussian Splatting.",
    details: "3D Gaussian Splatting (3DGS) es una técnica que permite crear representaciones tridimensionales navegables y de gran realismo visual a partir de imágenes tomadas desde distintas perspectivas. Combino captura con drones y cámaras 360°, preparación de datasets, alineación de cámaras, entrenamiento 3D y publicación web para convertir registros visuales en experiencias interactivas.",
    caution: "Estas reconstrucciones visuales complementan la fotografía y el video; por sí solas no equivalen a mediciones topográficas certificadas ni reemplazan los planos técnicos.",
    applicationsTitle: "Dónde puede aportar esta tecnología",
    applications: [
      { title: "Inmuebles y arquitectura", text: "Mostrar el contexto espacial, los acabados y la experiencia de explorar remotamente una propiedad o un espacio construido." },
      { title: "Turismo y patrimonio", text: "Ofrecer recorridos interactivos y documentación visual de lugares emblemáticos y sitios de valor cultural." },
      { title: "Empresas y presentación de proyectos", text: "Ayudar a comprender espacios, instalaciones y ubicaciones sin depender de una única perspectiva fija." },
    ],
    caseEyebrow: "Caso interactivo · Neiva, Colombia",
    caseTitle: "Monumento a La Gaitana: un lugar con historia",
    caseText1: "En Neiva, capital del departamento del Huila, en el sur de Colombia, el Monumento a La Gaitana rinde homenaje a una líder indígena recordada por su resistencia durante la conquista española. Ubicado cerca del río Magdalena, es parte de la identidad cultural e histórica de la ciudad.",
    caseText2: "Mi reconstrucción digital permite acercarse al monumento desde distintas perspectivas. Más que una fotografía estática, es un ejemplo de cómo la captura espacial y el 3DGS pueden abrir nuevas maneras de explorar el patrimonio cultural.",
    loadingLabel: "Iniciar experiencia 3D interactiva",
    previewLabel: "Escena interactiva lista para explorar",
    instructions: "Una vez cargada: arrastra para girar, desplaza o pellizca para acercarte. También puedes usar pantalla completa.",
    openScene: "Ver escena original en SuperSplat",
    open360: "Ver recorrido narrado de Neiva en 360°",
    thirdParty: "El visor carga contenido de SuperSplat solamente cuando eliges iniciarlo.",
  },
};

export default function GaussianSplatting() {
  const { lang = "en" } = useContext(LangContext) || {};
  const language = lang === "es" ? "es" : "en";
  const t = COPY[language];
  const [showViewer, setShowViewer] = useState(false);

  return (
    <section className="gs-section" id="gaussian-splatting" aria-labelledby="gs-heading">
      <PortfolioReveal duration={960}>
        <div className="gs-hero">
          <header className="gs-intro">
            <span className="gs-eyebrow">{t.eyebrow}</span>
            <h2 id="gs-heading">{t.title}</h2>
            <p className="gs-lead">{t.lead}</p>
            <p>{t.details}</p>
            <div className="gs-pipeline" aria-hidden="true">
              <span>{language === "es" ? "CAPTURA" : "CAPTURE"}</span><b>→</b>
              <span>{language === "es" ? "RECONSTRUCCIÓN" : "RECONSTRUCTION"}</span><b>→</b>
              <span>{language === "es" ? "EXPLORACIÓN" : "EXPLORATION"}</span>
            </div>
          </header>
          <div className="gs-hero-art" aria-hidden="true">
            <span className="gs-art-grid" />
            <span className="gs-art-orbit gs-art-orbit--a" />
            <span className="gs-art-orbit gs-art-orbit--b" />
            <span className="gs-art-core"><strong>3D</strong><small>GAUSSIAN<br />SPLATTING</small></span>
            <span className="gs-art-node gs-art-node--a" />
            <span className="gs-art-node gs-art-node--b" />
            <span className="gs-art-label">SPATIAL / WEB</span>
          </div>
        </div>
      </PortfolioReveal>

      <div className="gs-uses">
        <PortfolioReveal>
          <div className="gs-uses-heading">
            <span className="gs-eyebrow">{language === "es" ? "APLICACIONES REALES" : "REAL-WORLD APPLICATIONS"}</span>
            <h3>{t.applicationsTitle}</h3>
          </div>
        </PortfolioReveal>
        <div className="gs-use-grid">
          {t.applications.map((item, index) => (
            <PortfolioReveal key={item.title} delay={index * 105} duration={770} distance="22px">
              <article className="gs-use-card">
                <span className="gs-use-number" aria-hidden="true">0{index + 1}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            </PortfolioReveal>
          ))}
        </div>
        <p className="gs-disclaimer">{t.caution}</p>
      </div>

      <article className="gs-case" aria-labelledby="gs-case-title">
        <PortfolioReveal>
          <div className="gs-case-heading">
            <div>
              <span className="gs-eyebrow">{t.caseEyebrow}</span>
              <h3 id="gs-case-title">{t.caseTitle}</h3>
            </div>
            <span className="gs-case-mark" aria-hidden="true">3D<span> / </span>01</span>
          </div>
        </PortfolioReveal>
        <PortfolioReveal delay={110}>
          <div className="gs-case-story">
            <p>{t.caseText1}</p>
            <p>{t.caseText2}</p>
          </div>
        </PortfolioReveal>
        <PortfolioReveal delay={130} duration={1000} distance="16px">
          <div className="gs-viewer">
            {showViewer ? (
              <iframe
                title={gaitanaDemo.title[language]}
                src={gaitanaDemo.embedUrl}
                allow="fullscreen; xr-spatial-tracking"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="gs-viewer-preview">
                <div className="gs-preview-text">
                  <span aria-hidden="true" className="gs-preview-symbol">✦</span>
                  <strong>La Gaitana · Neiva, Huila</strong>
                  <p>{t.previewLabel}</p>
                  <button type="button" className="gs-start" onClick={() => setShowViewer(true)}>
                    <span aria-hidden="true">▶</span> {t.loadingLabel}
                  </button>
                  <small>{t.thirdParty}</small>
                </div>
              </div>
            )}
          </div>
        </PortfolioReveal>
        <div className="gs-case-bottom">
          <p>{t.instructions}</p>
          <div className="gs-case-links">
            <a href={gaitanaDemo.sceneUrl} target="_blank" rel="noopener noreferrer">
              {t.openScene} <span aria-hidden="true">↗</span>
            </a>
            <a href={gaitanaDemo.tour360Url} target="_blank" rel="noopener noreferrer">
              {t.open360} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
