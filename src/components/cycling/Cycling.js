// src/components/cycling/Cycling.js

import React, { useContext } from "react";
import { cyclingSection } from "../../portfolio";
import "./Cycling.css";
import StyleContext from "../../contexts/styleContext";
import montandoImg from "../../assets/images/montando.png";

// Suppose you also have a local .mp4 for the video:
import ridingVideo from "../../assets/images/riding1080p.mp4";

export default function Cycling() {
  const { isDark } = useContext(StyleContext);

  // Here’s an array of paragraphs, each item is a separate paragraph:
  const cyclingParagraphs = [
    "MTB has become an integral part of my life. It started as a simple hobby but quickly transformed into a lasting commitment to better health and personal growth.",
    "With every ride, I challenge myself to go farther, ride faster, and push my limits, discovering new paths both on the road and within myself. Through determination and discipline, I am on a journey to lose weight and improve my overall well-being.",
    "I find cycling to be an extraordinary way to stay active, explore nature, and maintain a balanced mindset. Whether it’s the calm of riding solo at sunrise or the thrill of racing alongside friends, this activity continues to inspire and energize me every day.",
    "Beyond the physical benefits, cycling has taught me resilience and patience. Every uphill climb, every new distance reached, reminds me that true growth often involves embracing challenges rather than avoiding them. By making cycling a central part of my life, I feel stronger, healthier, and more in tune with the world around me."
  ];

  return (
    <div className={`cycling-section ${isDark ? "dark-mode" : ""}`} id="cycling">

      {/* Title */}
      <h1 className="cycling-title">
        {cyclingSection.title}
      </h1>

      {/* Main Row: left text + right image */}
      <div className="cycling-row">
        {/* Left Column: multiple paragraphs */}
        <div className="cycling-text-col">
          {cyclingParagraphs.map((paragraph, idx) => (
            <p key={idx} className="cycling-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Right Column: cycling image */}
        <div className="cycling-image-col">
          <img
            src={montandoImg}
            alt="Cycling passion"
            className="cycling-image"
          />
        </div>
      </div>

      {/* Video below (auto-play, loop, etc.) */}
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
    </div>
  );
}
