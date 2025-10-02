// src/containers/projects/Projects.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { Fade } from "react-reveal";
import "./Project.css";
import Button from "../../components/button/Button";
import { socialMediaLinks } from "../../portfolio";
import StyleContext from "../../contexts/styleContext";

// Idioma (si ya tienes el provider instalado)
import LangContext from "../../contexts/langContext";

// Import images for your real-world projects
import arepasImage from "../../assets/projectImages/arepas.png";
import coffeeImage from "../../assets/projectImages/coffee.png";
import budgetImage from "../../assets/projectImages/budget.png";

// Oshlix logo (SVG)
import oshlixLogo from "../../assets/images/oshx_lockup.svg";

// ---------- Fallback de textos EN/ES (por si tu portfolio/getContent no trae Projects) ----------
const COPY = {
  en: {
    titleA: "Projects in Development",
    titleB: "Real Projects from Real Businesses",
    oshlixIntro:
      "I’m currently developing an innovative platform called Oshlix to elevate workplace safety by combining advanced technology with real-time data and predictive analytics. Oshlix helps organizations identify and prevent hazards, protect employees, and stay compliant with critical regulations. With a React frontend, a Ruby on Rails API, and AI-driven risk analysis, Oshlix detects potential issues before they escalate, integrates with existing systems, and fosters a culture of proactive risk management—from predictive risk analysis and personalized prevention strategies to continuous monitoring and education. Click the Oshlix logo to learn more.",
    moreProjects: "More Projects",
    ariaShowcase: "Projects showcase",
    cards: [
      {
        key: "arepas",
        title: "Arepas y Más",
        desc:
          "A real business in Miami, Florida. Built in React, it provides basic e-commerce to order arepas. On checkout, an email with the order is sent to the company.",
        image: arepasImage,
        actions: [
          { kind: "primary", label: "View Site", href: "https://lerfast.github.io/arepas-mas-corp/" },
        ],
        tags: ["React", "SPA", "Email Order"],
      },
      {
        key: "cata",
        title: "Cata Café Landing Page",
        desc:
          "A React landing page for a café in Neiva, Huila-Colombia. Customers scan a QR code at their table and land on a welcome page with a CTA to see the menu.",
        image: coffeeImage,
        actions: [
          { kind: "primary", label: "View Site", href: "https://lerfast.github.io/cata-cafe/" },
        ],
        tags: ["React", "QR Flow", "Landing"],
      },
      {
        key: "budget",
        title: "Personal Budget App",
        desc:
          "Track expenses and manage budgets. Capstone at Microverse, built with Ruby on Rails.",
        image: budgetImage,
        actions: [
          { kind: "ghost", label: "Source", href: "https://github.com/lerfast/Module5-Capstone-budget-app?tab=readme-ov-file" },
          { kind: "primary", label: "Video", href: "https://www.youtube.com/watch?v=IR-94sy8DNQ" },
        ],
        tags: ["Ruby on Rails", "Capstone", "CRUD"],
      },
    ],
  },
  es: {
    titleA: "Proyectos en desarrollo",
    titleB: "Proyectos reales de negocios reales",
    oshlixIntro:
      "Actualmente estoy desarrollando una plataforma innovadora llamada Oshlix para elevar la seguridad en el trabajo combinando tecnología avanzada con datos en tiempo real y analítica predictiva. Oshlix ayuda a las organizaciones a identificar y prevenir riesgos, proteger a los colaboradores y cumplir con la normativa. Con un frontend en React, un API en Ruby on Rails y análisis de riesgo con IA, Oshlix detecta problemas antes de que escalen, se integra con sistemas existentes y fomenta una cultura de gestión preventiva—desde análisis predictivo y estrategias personalizadas de prevención hasta monitoreo continuo y educación. Haz clic en el logo de Oshlix para saber más.",
    moreProjects: "Más proyectos",
    ariaShowcase: "Galería de proyectos",
    cards: [
      {
        key: "arepas",
        title: "Arepas y Más",
        desc:
          "Negocio real en Miami, Florida. Desarrollado en React, ofrece e-commerce básico para pedir arepas. Al finalizar la compra, se envía un correo con el pedido a la empresa.",
        image: arepasImage,
        actions: [
          { kind: "primary", label: "Ver sitio", href: "https://lerfast.github.io/arepas-mas-corp/" },
        ],
        tags: ["React", "SPA", "Pedido por email"],
      },
      {
        key: "cata",
        title: "Landing Page Cata Café",
        desc:
          "Landing en React para un café en Neiva, Huila-Colombia. Los clientes escanean un código QR en su mesa y llegan a una página de bienvenida con un CTA para ver el menú.",
        image: coffeeImage,
        actions: [
          { kind: "primary", label: "Ver sitio", href: "https://lerfast.github.io/cata-cafe/" },
        ],
        tags: ["React", "Flujo QR", "Landing"],
      },
      {
        key: "budget",
        title: "App de Presupuesto Personal",
        desc:
          "Registra gastos y administra presupuestos. Proyecto Capstone en Microverse, construido con Ruby on Rails.",
        image: budgetImage,
        actions: [
          { kind: "ghost", label: "Código", href: "https://github.com/lerfast/Module5-Capstone-budget-app?tab=readme-ov-file" },
          { kind: "primary", label: "Video", href: "https://www.youtube.com/watch?v=IR-94sy8DNQ" },
        ],
        tags: ["Ruby on Rails", "Capstone", "CRUD"],
      },
    ],
  },
};
// -----------------------------------------------------------------------------------------------

const Projects = () => {
  const { isDark } = useContext(StyleContext);
  const { lang = "en" } = useContext(LangContext) || { lang: "en" };

  const t = COPY[lang] || COPY.en;

  // --- Scroll-snap shelf state (mobile only) ---
  const shelfRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = shelfRef.current;
    if (!el) return;
    const nearStart = el.scrollLeft <= 2;
    const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setAtStart(nearStart);
    setAtEnd(nearEnd);
  };

  useEffect(() => {
    const el = shelfRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  // --- Tilt 3D only on desktop (≥769px) ---
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    let cleanupFns = [];

    const attachTilt = () => {
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];

      if (!mq.matches) return;

      const cards = document.querySelectorAll(".snap-card");
      cards.forEach((card) => {
        card.style.willChange = "transform";

        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;

          const maxDeg = 10;
          const rotY = (px - 0.5) * (maxDeg * 2);
          const rotX = -(py - 0.5) * (maxDeg * 2);

          card.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
            2
          )}deg) translateY(-4px)`;
          card.style.setProperty("--px", `${(px * 100).toFixed(1)}%`);
          card.style.setProperty("--py", `${(py * 100).toFixed(1)}%`);
        };

        const onEnter = (e) => onMove(e);
        const onLeave = () => {
          card.style.transform = "";
          card.style.removeProperty("--px");
          card.style.removeProperty("--py");
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanupFns.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          card.style.willChange = "";
          card.style.transform = "";
          card.style.removeProperty("--px");
          card.style.removeProperty("--py");
        });
      });
    };

    attachTilt();
    mq.addEventListener?.("change", attachTilt);
    return () => {
      mq.removeEventListener?.("change", attachTilt);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="projects-main" id="projects">
      <Fade bottom duration={1000} distance="40px">
        <h1 className={`${isDark ? "dark-mode " : ""}project-title`}>
          {t.titleA}
        </h1>
      </Fade>

      {/* Oshlix Intro Container */}
      <div className="oshlix-intro-container">
        {/* Left: copy */}
        <Fade bottom duration={1000} distance="40px">
          <div className="oshlix-text">
            <p className={isDark ? "dark-mode projects-text" : "projects-text"}>
              {t.oshlixIntro}
            </p>
          </div>
        </Fade>

        {/* Right: logo */}
        <Fade right duration={1200}>
          <div className="oshlix-logo">
            <a
              href="https://www.oshlix.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={oshlixLogo}
                alt="Oshlix Logo"
                className="oshlix-logo-image"
              />
            </a>
          </div>
        </Fade>
      </div>

      <Fade bottom duration={1200} distance="40px">
        <h1 className={`${isDark ? "dark-mode " : ""}project-title`}>
          {t.titleB}
        </h1>
      </Fade>

      {/* Showcase: carousel (mobile) + grid (desktop) */}
      <Fade bottom duration={1200} distance="40px">
        <section
          className={`projects-shelf-wrapper ${atStart ? "at-start" : ""} ${
            atEnd ? "at-end" : ""
          }`}
          aria-label={t.ariaShowcase}
        >
          <div className="shelf-gradient left" aria-hidden="true" />
          <div className="shelf-gradient right" aria-hidden="true" />

          <div className="projects-shelf" ref={shelfRef}>
            {t.cards.map((card) => (
              <article className="snap-card" key={card.key}>
                <div className="snap-media">
                  <img src={card.image} alt={`${card.title} preview`} />
                </div>
                <div className="snap-body">
                  <h3 className="snap-title">{card.title}</h3>
                  <p className="snap-desc">{card.desc}</p>
                  <div className="snap-actions">
                    {card.actions.map((a, idx) => (
                      <a
                        key={`${card.key}-act-${idx}`}
                        className={`snap-btn ${a.kind}`}
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {a.label}
                      </a>
                    ))}
                    <ul className="snap-tags">
                      {card.tags.map((tg, i) => (
                        <li key={`${card.key}-tag-${i}`}>{tg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Fade>

      {/* More Projects — matches blue style, sin franja detrás y con aire inferior */}
      <Fade bottom duration={1200} distance="40px">
        <Button
          text={t.moreProjects}
          className="project-button"
          href={socialMediaLinks.github}
          newTab={true}
        />
      </Fade>
    </div>
  );
};

export default Projects;
