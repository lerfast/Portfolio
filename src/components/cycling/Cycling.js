import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Cycling.css";
import StyleContext from "../../contexts/styleContext";
import { cyclingSection } from "../../portfolio";

export default function Cycling() {
  const { isDark } = useContext(StyleContext);

  // Video data (ID, title, url, technical bullets, short description)
  const videos = [
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
  ];

  return (
    <section
      className={`cycling-section ${isDark ? "dark-mode" : ""}`}
      id="cycling"
      aria-label="YouTube, Video & Drone"
    >
      {/* Title */}
      <Fade bottom duration={900} distance="28px">
        <h1 className="cycling-title">
          {cyclingSection?.title || "YouTube, Video & Drone"}
        </h1>
      </Fade>

      {/* Hero copy (expanded paragraph, no video) */}
      <Fade bottom duration={1100} distance="36px">
        <div className="vd-hero">
          <div className="vd-hero-copy">
            <p className="lead">
              I’m a <b>full-stack developer</b> who also produces cinematic content for YouTube.
              As a <b>certified drone pilot</b>, I plan flights with airspace checks, weather windows
              and shot lists; in the air I execute manual arcs, orbits, parallax passes and reveal
              trajectories to convey scale and rhythm. In <b>DaVinci Resolve</b> I follow a node-based
              pipeline: ingest & sync, selects, beat-aligned assembly, time-remapping/speed-ramping
              with eased curves, stabilization (Cropping vs. Lock), optical-flow motion estimation,
              tilt-shift via gradient power windows, tracked masks, HSL qualifiers and secondary
              isolations (sky/stone/foliage). I grade under DaVinci YRGB Color Managed / CST,
              balancing primaries, shaping contrast/pivot, subtle halation and film-grain,
              plus clean titles and micro lower-thirds. Audio goes through noise reduction, EQ,
              gentle bus compression and loudness normalization for YouTube delivery. Final exports
              target 4K high-bitrate H.264/H.265 with two-pass settings tuned for web clarity.
            </p>

            <ul className="vd-badges" aria-label="Capabilities">
              <li>Certified Drone Pilot</li>
              <li>DaVinci Resolve</li>
              <li>Color Managed (CST)</li>
              <li>Motion Titles</li>
              <li>Speed Ramping</li>
              <li>Hyperlapse</li>
            </ul>

            <div className="vd-ctas">
              <a
                className="cycling-btn primary"
                href="https://www.youtube.com/@rojastech1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit YouTube channel @rojastech1"
              >
                Visit my YouTube Channel
              </a>
              <a
                className="cycling-btn ghost"
                href="https://www.youtube.com/@rojastech1/videos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="See all videos"
              >
                See all videos
              </a>
            </div>
          </div>
        </div>
      </Fade>

      {/* Case studies with animated micro-gradient border + thumbnails */}
      <Fade bottom duration={1100} distance="32px">
        <div className="vd-cases" aria-label="Selected works">
          {videos.map((v) => (
            <article className="vd-card aura hover-lift" key={v.id}>
              <div className="vd-card-inner">
                {/* Clickable thumbnail (opens YouTube) */}
                <a
                  className="vd-thumb"
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${v.title} on YouTube`}
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
                  <a
                    className="vd-card-link"
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch
                  </a>
                </header>

                <p className="vd-card-desc">{v.desc}</p>

                <ul className="vd-tech">
                  {v.tech.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Fade>
    </section>
  );
}
