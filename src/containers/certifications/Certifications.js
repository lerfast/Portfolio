import React, { useEffect } from "react";
import "./Certifications.css";
import { Fade } from "react-reveal";
import { certifications } from "../../portfolio";
import CertificationCard from "../../components/certificationCard/CertificationCard";

const Certifications = () => {
  // Tilt 3D (solo desktop)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    let cleanups = [];

    const attachTilt = () => {
      // Limpia bindings previos
      cleanups.forEach((fn) => fn());
      cleanups = [];

      if (!mq.matches) return;

      const cards = document.querySelectorAll(".cert-tilt");
      cards.forEach((card) => {
        card.style.willChange = "transform";

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;

          const max = 10; // grados
          const rotY = (px - 0.5) * (max * 2);
          const rotX = -(py - 0.5) * (max * 2);

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

        cleanups.push(() => {
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
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <Fade bottom duration={1200} distance="40px">
      <section className="certs-section" id="certs">
        <header className="certs-header">
          <h1 className="certs-title">Certifications</h1>
          <p className="certs-sub">
            Degrees, diplomas & professional credentials
          </p>
        </header>

        <div className="certs-grid">
          {certifications.certifications.map((cert, idx) => (
            <article className="cert-tilt" key={`${cert.title}-${idx}`}>
              {/* No tocamos tu tarjeta, solo la envolvemos para efectos */}
              <CertificationCard certificate={cert} id={cert.id} />
            </article>
          ))}
        </div>
      </section>
    </Fade>
  );
};

export default Certifications;
