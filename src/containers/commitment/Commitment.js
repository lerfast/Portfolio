// src/containers/commitment/Commitment.js
import React, { useContext } from "react";
import { Fade } from "react-reveal";
import { commitmentSection } from "../../portfolio"; 
import "./Commitment.css";
import StyleContext from "../../contexts/styleContext";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
// ↑ Este componente ya existe en tu proyecto, 
//   sirve para mostrar animaciones Lottie

import ohsAnimation from "../../assets/lottie/ohs.json"; 
// ↑ Ajusta la ruta/nombre a tu archivo real de Lottie

export default function Commitment() {
  const { isDark } = useContext(StyleContext);

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="commitment-main" id="commitment">
        <div className="commitment-text-div">
          {/* Texto a la izquierda */}
          <h1 className={isDark ? "dark-mode heading commitment-title" : "heading commitment-title"}>
            {commitmentSection.title}
          </h1>

          <h2 className={isDark ? "dark-mode subTitle commitment-subtitle" : "subTitle commitment-subtitle"}>
            {commitmentSection.subtitle}
          </h2>

          <p className={isDark ? "dark-mode commitment-text" : "commitment-text"}>
            {commitmentSection.description}
          </p>
        </div>

        {/* Lottie a la derecha */}
        <div className="commitment-lottie-div">
          <DisplayLottie 
            animationData={ohsAnimation}
            width="500px"
            height="500px"
          />
        </div>
      </div>
    </Fade>
  );
}
