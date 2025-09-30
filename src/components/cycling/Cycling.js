import React, { useContext } from "react";
import { cyclingSection } from "../../portfolio";
import { Fade } from "react-reveal";
import "./Cycling.css";
import StyleContext from "../../contexts/styleContext";
import montandoImg from "../../assets/images/montando.png";
import ridingVideo from "../../assets/images/riding1080p.mp4";

export default function Cycling() {
  const { isDark } = useContext(StyleContext);

  const cyclingParagraphs = [
    "MTB has become an integral part of my life. It started as a simple hobby but quickly transformed into a lasting commitment to better health and personal growth.",
    "With every ride, I challenge myself to go farther, ride faster, and push my limits, discovering new paths both on the road and within myself. Through determination and discipline, I am on a journey to lose weight and improve my overall well-being.",
    "I find cycling to be an extraordinary way to stay active, explore nature, and maintain a balanced mindset. Whether it’s the calm of riding solo at sunrise or the thrill of racing alongside friends, this activity continues to inspire and energize me every day.",
    "Beyond the physical benefits, cycling has taught me resilience and patience. Every uphill climb, every new distance reached, reminds me that true growth often involves embracing challenges rather than avoiding them. By making cycling a central part of my life, I feel stronger, healthier, and more in tune with the world around me."
  ];

  return (
    <div className={`cycling-section ${isDark ? "dark-mode" : ""}`} id="cycling">
      {/* Title */}
      <Fade bottom duration={1200} distance="40px">
        <h1 className="cycling-title">{cyclingSection.title}</h1>
      </Fade>

      {/* Main Row: text + image */}
      <div className="cycling-row">
        <Fade left duration={2000}>
          <div className="cycling-text-col">
            {cyclingParagraphs.map((paragraph, idx) => (
              <p key={idx} className="cycling-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </Fade>

        <Fade right duration={2000}>
          <div className="cycling-image-col">
            <img
              src={montandoImg}
              alt="Cycling passion"
              className="cycling-image"
            />
          </div>
        </Fade>
      </div>

      {/* Local riding video JUST BELOW MTB section */}
      <Fade bottom duration={1200} distance="40px">
        <div className="cycling-video-container">
          <video
            className="cycling-video"
            src={ridingVideo}
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        </div>
      </Fade>

      {/* Video & Drone Work */}
      <Fade bottom duration={1200} distance="40px">
        <section className="vd-section" aria-label="Video & Drone Work">
          <div className="vd-row">
            <div className="vd-copy">
              <h2 className="vd-title">Video & Drone Work</h2>
              <p className="vd-paragraph">
                Besides coding and business, I’m a <b>video editor</b> (DaVinci
                Resolve) and a <b>professional drone pilot</b>. Aerial
                cinematography changed the way I see stories — flying brings a
                new perspective to everyday life, revealing patterns, symmetry,
                and rhythm from above.
              </p>
              <p className="vd-paragraph">
                I enjoy crafting tilt-shift looks, dynamic reveals, clean titles,
                and cinematic color. Below is one of my favorite pieces filmed
                in Colombia — turning a real city into a living miniature.
              </p>

              <div className="vd-ctas">
                <a
                  className="cycling-btn primary"
                  href="https://www.youtube.com/@rojastech1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch on YouTube @rojastech1"
                >
                  Watch on YouTube
                </a>
                <a
                  className="cycling-btn ghost"
                  href="https://youtu.be/8vYlSsoheUw"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Featured: Neiva in Miniature"
                >
                  Featured: Neiva in Miniature
                </a>
              </div>

              <ul className="vd-chips">
                <li>DaVinci Resolve</li>
                <li>Aerial Cinematography</li>
                <li>Color Grading</li>
                <li>Motion Titles</li>
                <li>Licensed Drone Pilot</li>
              </ul>
            </div>

            <div className="vd-media">
              {/* Responsive YouTube embed */}
              <div className="yt-embed">
                <iframe
                  src="https://www.youtube.com/embed/8vYlSsoheUw"
                  title="Neiva in Miniature — Tilt-Shift"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </Fade>
    </div>
  );
}
