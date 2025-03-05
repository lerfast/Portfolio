// src/components/cycling/Cycling.js
import React, { useContext } from "react";
import { cyclingSection } from "../../portfolio";
import "./Cycling.css";
import StyleContext from "../../contexts/styleContext";
import montandoImg from "../../assets/images/montando.png";

const Cycling = () => {
  const { isDark } = useContext(StyleContext);

  return (
    <div className={`cycling-section ${isDark ? "dark-mode" : ""}`} id="cycling">
      <div className="cycling-header">
        <h1 className="blog-header-text">{cyclingSection.title}</h1>
        <p
          className={
            isDark
              ? "dark-mode subTitle blog-subtitle"
              : "subTitle blog-subtitle"
          }
        >
          {cyclingSection.description}
        </p>
      </div>

      <div className="cycling-main-div">
        {/* 2) Aquí usas la imagen que acabas de importar */}
        <img
          src={montandoImg}     // <-- montandoImg viene de la import
          alt="Cycling passion"
          className="cycling-image"
        />

        <div className="cycling-video-container">
          <iframe
            width="560"
            height="315"
            src={cyclingSection.videoUrl}
            title="Cycling Journey"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; 
                 encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Cycling;

