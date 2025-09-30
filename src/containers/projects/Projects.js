// src/containers/projects/Projects.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { Fade } from "react-reveal";
import "./Project.css";
import Button from "../../components/button/Button";
import { socialMediaLinks } from "../../portfolio";
import StyleContext from "../../contexts/styleContext";

// Import images for your real-world projects
import arepasImage from "../../assets/projectImages/arepas.png";
import coffeeImage from "../../assets/projectImages/coffee.png";
import budgetImage from "../../assets/projectImages/budget.png";

// Oshlix logo (SVG)
import oshlixLogo from "../../assets/images/oshx_lockup.svg";

const Projects = () => {
  const { isDark } = useContext(StyleContext);

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
          Projects in Development
        </h1>
      </Fade>

      {/* Oshlix Intro Container */}
      <div className="oshlix-intro-container">
        {/* Left: copy */}
        <Fade bottom duration={1000} distance="40px">
          <div className="oshlix-text">
            <p className={isDark ? "dark-mode projects-text" : "projects-text"}>
              I’m currently developing an innovative platform called{" "}
              <strong>Oshlix</strong> to elevate workplace safety by combining
              advanced technology with real-time data and predictive analytics.
              Oshlix helps organizations identify and prevent hazards, protect
              employees, and stay compliant with critical regulations. With a{" "}
              <strong>React</strong> frontend, a <strong>Ruby on Rails</strong>{" "}
              API, and AI-driven risk analysis, <strong>Oshlix</strong> detects
              potential issues before they escalate, integrates with existing
              systems, and fosters a culture of proactive risk management—from
              predictive risk analysis and personalized prevention strategies to
              continuous monitoring and education.{" "}
              <strong>Click the Oshlix logo to learn more.</strong>
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
          Real Projects from Real Businesses
        </h1>
      </Fade>

      {/* Showcase: carousel (mobile) + grid (desktop) */}
      <Fade bottom duration={1200} distance="40px">
        <section
          className={`projects-shelf-wrapper ${atStart ? "at-start" : ""} ${
            atEnd ? "at-end" : ""
          }`}
          aria-label="Projects showcase"
        >
          <div className="shelf-gradient left" aria-hidden="true" />
          <div className="shelf-gradient right" aria-hidden="true" />

          <div className="projects-shelf" ref={shelfRef}>
            {/* Arepas y Más */}
            <article className="snap-card">
              <div className="snap-media">
                <img src={arepasImage} alt="Arepas y Más website preview" />
              </div>
              <div className="snap-body">
                <h3 className="snap-title">Arepas y Más</h3>
                <p className="snap-desc">
                  A real business in Miami, Florida. Built in <strong>React</strong>,
                  it provides basic e-commerce to order arepas. On checkout, an email
                  with the order is sent to the company.
                </p>
                <div className="snap-actions">
                  <a
                    className="snap-btn primary"
                    href="https://lerfast.github.io/arepas-mas-corp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Site
                  </a>
                  <ul className="snap-tags">
                    <li>React</li>
                    <li>SPA</li>
                    <li>Email Order</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Cata Café Landing Page */}
            <article className="snap-card">
              <div className="snap-media">
                <img src={coffeeImage} alt="Cata Café landing page preview" />
              </div>
              <div className="snap-body">
                <h3 className="snap-title">Cata Café Landing Page</h3>
                <p className="snap-desc">
                  A React landing page for a café in Neiva, Huila-Colombia.
                  Customers scan a QR code at their table and land on a welcome
                  page with a CTA to see the menu.
                </p>
                <div className="snap-actions">
                  <a
                    className="snap-btn primary"
                    href="https://lerfast.github.io/cata-cafe/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Site
                  </a>
                  <ul className="snap-tags">
                    <li>React</li>
                    <li>QR Flow</li>
                    <li>Landing</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Personal Budget App */}
            <article className="snap-card">
              <div className="snap-media">
                <img src={budgetImage} alt="Personal Budget App preview" />
              </div>
              <div className="snap-body">
                <h3 className="snap-title">Personal Budget App</h3>
                <p className="snap-desc">
                  Track expenses and manage budgets. Capstone at Microverse,
                  built with <strong>Ruby on Rails</strong>.
                </p>
                <div className="snap-actions">
                  <a
                    className="snap-btn ghost"
                    href="https://github.com/lerfast/Module5-Capstone-budget-app?tab=readme-ov-file"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source
                  </a>
                  <a
                    className="snap-btn primary"
                    href="https://www.youtube.com/watch?v=IR-94sy8DNQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video
                  </a>
                  <ul className="snap-tags">
                    <li>Ruby on Rails</li>
                    <li>Capstone</li>
                    <li>CRUD</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>
      </Fade>

      {/* More Projects — matches blue style, sin franja detrás y con aire inferior */}
      <Fade bottom duration={1200} distance="40px">
        <Button
          text="More Projects"
          className="project-button"
          href={socialMediaLinks.github}
          newTab={true}
        />
      </Fade>
    </div>
  );
};

export default Projects;
