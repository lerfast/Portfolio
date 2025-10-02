import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Cycling.css";
import StyleContext from "../../contexts/styleContext";
import { cyclingSection } from "../../portfolio";
import LangContext from "../../contexts/langContext";

export default function Cycling() {
  const { isDark } = useContext(StyleContext);
  const { lang = "en" } = useContext(LangContext) || { lang: "en" };

  const COPY = {
    en: {
      title: cyclingSection?.title || "YouTube, Video & Drone",
      ariaSection: "YouTube, Video & Drone",
      lead:
        "I’m a full-stack developer who also produces cinematic content for YouTube. As a certified drone pilot, I plan flights with airspace checks, weather windows and shot lists; in the air I execute manual arcs, orbits, parallax passes and reveal trajectories to convey scale and rhythm. In DaVinci Resolve I follow a node-based pipeline: ingest & sync, selects, beat-aligned assembly, time-remapping/speed-ramping with eased curves, stabilization (Cropping vs. Lock), optical-flow motion estimation, tilt-shift via gradient power windows, tracked masks, HSL qualifiers and secondary isolations (sky/stone/foliage). I grade under DaVinci YRGB Color Managed / CST, balancing primaries, shaping contrast/pivot, subtle halation and film-grain, plus clean titles and micro lower-thirds. Audio goes through noise reduction, EQ, gentle bus compression and loudness normalization for YouTube delivery. Final exports target 4K high-bitrate H.264/H.265 with two-pass settings tuned for web clarity.",
      ariaCaps: "Capabilities",
      badges: [
        "Certified Drone Pilot",
        "DaVinci Resolve",
        "Color Managed (CST)",
        "Motion Titles",
        "Speed Ramping",
        "Hyperlapse",
      ],
      ctaVisit: "Visit my YouTube Channel",
      ctaAll: "See all videos",
      ariaWorks: "Selected works",
      watch: "Watch",
      openOnYT: (title) => `Open ${title} on YouTube`,
      videos: [
        {
          id: "4j1mb_pBtpw",
          title: "Neiva Épica — City Beats with Cinematic Drone",
          url: "https://youtu.be/4j1mb_pBtpw",
          desc:
            "City portrait driven by music and rhythm. Landmarks, plazas and bridges flow with dynamic aerial coverage and clean editorial pacing.",
          tech: [
            "Beat-synced edits to music (cutting on transients)",
            "Reveal/orbit moves with speed-ramping & motion-blur",
            "Match-cuts between bridges/avenues for visual continuity",
            "Hyperlapse sections for river/traffic progressions",
            "Primary color balance + soft highlight roll-off",
            "Subtle grain & adaptive sharpening for YouTube delivery",
          ],
        },
        {
          id: "8vYlSsoheUw",
          title: "Miniature Neiva — Tilt-Shift City Short",
          url: "https://youtu.be/8vYlSsoheUw",
          desc:
            "Elevated compositions + tilt-shift emulation to shrink the city into a living model. A playful scale illusion supported by time-remapping.",
          tech: [
            "Lens-blur tilt-shift (gradient power windows & depth falloff)",
            "Hyperlapse + speed ramps to accentuate miniature motion",
            "Selective saturation lift & contrast for toy-like palette",
            "Clean micro-titles; minimal motion graphics",
            "Noise-managed highlights to protect fine detail",
          ],
        },
        {
          id: "XyXbs0icyPQ",
          title: "80-Meter Reclining Christ — Aerial Documentary",
          url: "https://youtu.be/XyXbs0icyPQ",
          desc:
            "Monument overview with documentary tone: establishing wides, lateral parallax and gentle dolly-ins to underline scale and context.",
          tech: [
            "Shot design: establish → context → detail (wide → mid → close)",
            "Lateral parallax passes; controlled gimbal-pitch reveals",
            "Primary/secondary grading (HSL isolations for stone/sky)",
            "Lower-third facts; restrained diffusion & clean typography",
            "Deliverable tailored for YouTube compression (2-pass export)",
          ],
        },
      ],
    },
    es: {
      title: "YouTube, Video y Dron",
      ariaSection: "YouTube, Video y Dron",
      lead:
        "Soy desarrollador full-stack y también produzco contenido cinematográfico para YouTube. Como piloto de dron certificado, planifico vuelos con verificación de espacio aéreo, ventanas de clima y listas de toma; en el aire ejecuto arcos, órbitas, pasadas con paralaje y revelados para transmitir escala y ritmo. En DaVinci Resolve sigo un flujo basado en nodos: ingest & sync, selección de tomas, ensamble alineado al ritmo, time-remapping/speed-ramping con curvas suaves, estabilización (Cropping vs. Lock), óptica de flujo para estimación de movimiento, tilt-shift con power windows graduales, máscaras con tracking, calificadores HSL y aislamientos secundarios (cielo/piedra/vegetación). Grado bajo DaVinci YRGB Color Managed / CST, equilibrando primarias, moldeando contraste/pivote, halation sutil y film-grain, más títulos limpios y lower-thirds minimalistas. El audio pasa por reducción de ruido, EQ, compresión suave de bus y normalización de loudness para YouTube. Los masters finales apuntan a 4K H.264/H.265 a alto bitrate con dos pasadas, optimizados para claridad web.",
      ariaCaps: "Capacidades",
      badges: [
        "Piloto de dron certificado",
        "DaVinci Resolve",
        "Color Managed (CST)",
        "Títulos en movimiento",
        "Ramping de velocidad",
        "Hyperlapse",
      ],
      ctaVisit: "Visita mi canal de YouTube",
      ctaAll: "Ver todos los videos",
      ariaWorks: "Trabajos seleccionados",
      watch: "Ver",
      openOnYT: (title) => `Abrir ${title} en YouTube`,
      videos: [
        {
          id: "4j1mb_pBtpw",
          title: "Neiva Épica — Ritmo urbano con dron cinematográfico",
          url: "https://youtu.be/4j1mb_pBtpw",
          desc:
            "Retrato de ciudad guiado por música y ritmo. Plazas, puentes y referentes fluyen con cobertura aérea dinámica y un montaje limpio.",
          tech: [
            "Cortes sincronizados al beat (transitorios musicales)",
            "Revelados y órbitas con speed-ramping y motion-blur",
            "Match-cuts entre puentes/avenidas para continuidad visual",
            "Secciones de hyperlapse para ríos y tráfico en progreso",
            "Balance de color primario + roll-off suave en altas luces",
            "Grano sutil y nitidez adaptativa para entrega en YouTube",
          ],
        },
        {
          id: "8vYlSsoheUw",
          title: "Neiva en miniatura — Corto Tilt-Shift",
          url: "https://youtu.be/8vYlSsoheUw",
          desc:
            "Composiciones elevadas + emulación tilt-shift para convertir la ciudad en una maqueta viva. Ilusión lúdica de escala soportada por time-remapping.",
          tech: [
            "Tilt-shift con desenfoque por lentes (power windows y caída de profundidad)",
            "Hyperlapse + rampas de velocidad para acentuar movimiento miniatura",
            "Levantamiento selectivo de saturación y contraste para paleta “toy-like”",
            "Micro-títulos limpios; motion graphics mínimos",
            "Altas luces controladas para proteger detalle fino",
          ],
        },
        {
          id: "XyXbs0icyPQ",
          title: "Cristo Yacente de 80 metros — Documental aéreo",
          url: "https://youtu.be/XyXbs0icyPQ",
          desc:
            "Visión del monumento con tono documental: planos generales, paralaje lateral y suaves acercamientos para subrayar escala y contexto.",
          tech: [
            "Diseño de plano: establecer → contexto → detalle (general → medio → close)",
            "Pasadas con paralaje lateral; revelados con pitch del gimbal controlado",
            "Grading primario/secundario (aislamientos HSL para piedra/cielo)",
            "Lower-thirds informativos; difusión contenida y tipografía limpia",
            "Exportación optimizada para compresión de YouTube (2 pasadas)",
          ],
        },
      ],
    },
  };

  const t = COPY[lang] || COPY.en;

  return (
    <section
      className={`cycling-section ${isDark ? "dark-mode" : ""}`}
      id="cycling"
      aria-label={t.ariaSection}
    >
      <Fade bottom duration={900} distance="28px">
        <h1 className="cycling-title">{t.title}</h1>
      </Fade>

      <Fade bottom duration={1100} distance="36px">
        <div className="vd-hero">
          <div className="vd-hero-copy">
            <p className="lead">{t.lead}</p>

            <ul className="vd-badges" aria-label={t.ariaCaps}>
              {t.badges.map((b, i) => <li key={i}>{b}</li>)}
            </ul>

            <div className="vd-ctas">
              <a
                className="cycling-btn primary"
                href="https://www.youtube.com/@rojastech1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit YouTube channel @rojastech1"
              >
                {t.ctaVisit}
              </a>
              <a
                className="cycling-btn ghost"
                href="https://www.youtube.com/@rojastech1/videos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "es" ? "Ver todos los videos" : "See all videos"}
              >
                {t.ctaAll}
              </a>
            </div>
          </div>
        </div>
      </Fade>

      <Fade bottom duration={1100} distance="32px">
        <div className="vd-cases" aria-label={t.ariaWorks}>
          {t.videos.map((v) => (
            <article className="vd-card aura hover-lift" key={v.id}>
              <div className="vd-card-inner">
                <a
                  className="vd-thumb"
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.openOnYT(v.title)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                  />
                  <span className="vd-play" aria-hidden="true"></span>
                </a>

                <header className="vd-card-head">
                  <h3 className="vd-card-title">{v.title}</h3>
                  <a className="vd-card-link" href={v.url} target="_blank" rel="noopener noreferrer">
                    {t.watch}
                  </a>
                </header>

                <p className="vd-card-desc">{v.desc}</p>
                <ul className="vd-tech">
                  {v.tech.map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Fade>
    </section>
  );
}
