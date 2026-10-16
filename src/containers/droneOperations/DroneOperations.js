import React, { useContext, useState } from "react";
import LangContext from "../../contexts/langContext";
import { getContent } from "../../portfolio";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import PortfolioReveal from "../../components/motion/PortfolioReveal";
import droneAnimation from "../../assets/lottie/dronepilot.json";
import "./DroneOperations.css";

// Original portfolio copy and verified professional claims are preserved.
const COPY = {
  en: {
    eyebrow: "Second professional specialty",
    heading: "Professional drone operations",
    lead: "Aerial perspective supported by operational planning, situational awareness, and responsibility.",
    credential: "Certified UAS pilot · Civil Aviation Authority of Colombia (Aerocivil)",
    servicesHeading: "Capabilities and applications",
    services: [
      { title: "Aerial photography and video", description: "Visual documentation for architecture, landscapes, buildings, and audiovisual projects." },
      { title: "Mission planning", description: "Preparation that considers airspace, weather, the operating environment, and the objectives of each flight." },
      { title: "Photogrammetry and mapping", description: "Aerial image capture to support orthophotos, site visualization, and geospatial workflows when technically suitable." },
      { title: "360° and spatial capture", description: "Complementary ground and aerial footage for immersive storytelling and 3D reconstruction projects." },
    ],
    smsLabel: "AVIATION SAFETY · SMS",
    smsTitle: "Safety Management System (SMS) in UAS operations",
    smsDescription: "The aviation Safety Management System (SMS) provides a preventive framework for identifying hazards, assessing operational risks, applying mitigation measures, and learning from operations. My background in Occupational Health and Safety (OHS) strengthens this risk-prevention perspective, while aviation SMS and workplace OHS management remain distinct systems.",
    smsStepsLabel: "Safety management principles",
    smsSteps: ["Hazard identification", "Risk assessment and mitigation", "Continuous improvement"],
    smsLink: "Explore my Occupational Health and Safety approach",
    work: "See aerial productions",
    filmEyebrow: "From the field · Selected aerial work",
    filmTitle: "A different perspective on Colombia",
    filmCta: "Watch the aerial film",
    filmAlt: "Aerial video thumbnail from Ride & Fly: Santiago de Cali, Colombia",
    filmBadge: "AERIAL FILM",
    process: "PLAN / CAPTURE / DOCUMENT",
    index: "Professional fieldwork · Aerial imaging",
  },
  es: {
    eyebrow: "Segunda especialidad profesional",
    heading: "Operaciones profesionales con drones",
    lead: "Una perspectiva aérea respaldada por planeación, conciencia situacional y responsabilidad operacional.",
    credential: "Piloto profesional UAS certificado por la Aeronáutica Civil de Colombia (Aerocivil)",
    servicesHeading: "Capacidades y aplicaciones",
    services: [
      { title: "Fotografía y video aéreo", description: "Documentación visual de arquitectura, paisajes, edificaciones y proyectos audiovisuales." },
      { title: "Planeación de operaciones", description: "Preparación considerando espacio aéreo, meteorología, entorno y objetivos de cada vuelo." },
      { title: "Fotogrametría y cartografía", description: "Captura de imágenes aéreas para ortofotos, visualización de terrenos y procesos geoespaciales cuando resulte técnicamente adecuado." },
      { title: "Captura espacial y 360°", description: "Material desde tierra y desde el aire para narrativas inmersivas y proyectos de reconstrucción tridimensional." },
    ],
    smsLabel: "SEGURIDAD OPERACIONAL · SMS",
    smsTitle: "Sistema de Gestión de la Seguridad Operacional (SMS) en UAS",
    smsDescription: "El Sistema de Gestión de la Seguridad Operacional (SMS) aporta a la aviación un enfoque preventivo para identificar peligros, evaluar riesgos operacionales, establecer medidas de mitigación y aprender de cada operación. Mi formación en Seguridad y Salud en el Trabajo (SST) fortalece esta visión de prevención, aunque el SMS aeronáutico y el SG-SST son sistemas diferentes.",
    smsStepsLabel: "Principios de gestión de la seguridad operacional",
    smsSteps: ["Identificación de peligros", "Evaluación y mitigación de riesgos", "Mejora continua"],
    smsLink: "Conoce mi enfoque de Seguridad y Salud en el Trabajo",
    work: "Ver producciones aéreas",
    filmEyebrow: "Desde el terreno · Trabajo aéreo seleccionado",
    filmTitle: "Otra perspectiva de Colombia",
    filmCta: "Ver producción aérea",
    filmAlt: "Miniatura del video aéreo de Ride & Fly sobre Santiago de Cali, Colombia",
    filmBadge: "PRODUCCIÓN AÉREA",
    process: "PLANEAR / CAPTURAR / DOCUMENTAR",
    index: "Trabajo profesional · Captura aérea",
  },
};

const FEATURE_VIDEO = "https://www.youtube.com/watch?v=9Do3RMFLCfk";
const FEATURE_THUMBNAIL = "https://i.ytimg.com/vi/9Do3RMFLCfk/maxresdefault.jpg";
const FEATURE_THUMBNAIL_FALLBACK = "https://i.ytimg.com/vi/9Do3RMFLCfk/hqdefault.jpg";

export default function DroneOperations() {
  const { lang = "en" } = useContext(LangContext) || {};
  const language = lang === "es" ? "es" : "en";
  const { commitmentSection } = getContent(language);
  const t = COPY[language];
  const [aerialThumbnail, setAerialThumbnail] = useState(FEATURE_THUMBNAIL);

  return (
    <section className="drone-operations" id="drone-operations" aria-labelledby="drone-title">
      <PortfolioReveal>
        <div className="drone-stage">
          <div className="drone-stage-copy">
            <span className="drone-eyebrow"><span className="drone-eyebrow-dash" aria-hidden="true" />{t.eyebrow}</span>
            <h2 id="drone-title">{t.heading}</h2>
            <p className="drone-lead">{t.lead}</p>
            <div className="drone-credential"><span aria-hidden="true">✦</span>{t.credential}</div>
            <a className="drone-cta drone-cta--header" href="#cycling">
              {t.work} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <a className="drone-stage-visual" href={FEATURE_VIDEO} target="_blank" rel="noopener noreferrer" aria-label={t.filmCta}>
            {aerialThumbnail && (
              <img
                src={aerialThumbnail} alt={t.filmAlt} width="1280" height="720"
                loading="lazy" decoding="async"
                onError={() => setAerialThumbnail((previous) => previous === FEATURE_THUMBNAIL ? FEATURE_THUMBNAIL_FALLBACK : "")}
              />
            )}
            <div className="drone-visual-top" aria-hidden="true">
              <span className="drone-live-dot" /> RIDE &amp; FLY <span>—</span> {t.filmBadge}
            </div>
            <div className="drone-visual-bottom">
              <span className="drone-visual-kicker">{t.filmEyebrow}</span>
              <strong>{t.filmTitle}</strong>
              <span className="drone-watch">{t.filmCta} <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </div>
      </PortfolioReveal>

      <PortfolioReveal delay={90}>
        <div className="drone-fieldnote">
          <div className="drone-fieldnote-visual" aria-hidden="true">
            <div className="drone-radar-ring drone-radar-ring--a" />
            <div className="drone-radar-ring drone-radar-ring--b" />
            <div className="drone-operations-animation">
              <DisplayLottie animationData={droneAnimation} />
            </div>
          </div>
          <div className="drone-operations-copy">
            <span className="drone-fieldnote-label">{t.process}</span>
            <h3>{commitmentSection.droneTitle}</h3>
            <p>{commitmentSection.droneDescription}</p>
            <span className="drone-fieldnote-foot">{t.index}</span>
          </div>
        </div>
      </PortfolioReveal>

      <PortfolioReveal delay={80}>
        <div className="drone-services-intro">
          <span className="drone-eyebrow">{t.index}</span>
          <h3 className="drone-services-heading">{t.servicesHeading}</h3>
        </div>
      </PortfolioReveal>
      <div className="drone-services">
        {t.services.map((service, index) => (
          <PortfolioReveal key={service.title} delay={(index % 4) * 90} duration={720} distance="20px">
            <article className="drone-service">
              <span className="drone-service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="drone-service-rule" aria-hidden="true" />
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </article>
          </PortfolioReveal>
        ))}
      </div>

      <PortfolioReveal delay={120} duration={760} distance="22px">
        <aside className="drone-sms" aria-labelledby="drone-sms-title">
          <div className="drone-sms-content">
            <span className="drone-sms-label"><span className="drone-sms-status" aria-hidden="true" />{t.smsLabel}</span>
            <h3 id="drone-sms-title">{t.smsTitle}</h3>
            <p>{t.smsDescription}</p>
            <a className="drone-sms-link" href="#commitment">
              {t.smsLink} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="drone-sms-principles" aria-label={t.smsStepsLabel}>
            {t.smsSteps.map((step, index) => (
              <div className="drone-sms-principle" key={step}>
                <span className="drone-sms-step" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </aside>
      </PortfolioReveal>
    </section>
  );
}
