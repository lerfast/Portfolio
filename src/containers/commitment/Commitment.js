import React, { useContext } from "react";
import { Fade } from "react-reveal";
import { commitmentSection } from "../../portfolio"; 
import "./Commitment.css";
import StyleContext from "../../contexts/styleContext";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import ohsAnimation from "../../assets/lottie/ohs.json"; 

export default function Commitment() {
  const { isDark } = useContext(StyleContext);

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="commitment-main" id="commitment">
        <Fade bottom duration={1200} distance="40px">
        <div className="commitment-text-div">
          <h1 className={isDark ? "dark-mode heading commitment-title" : "heading commitment-title"}>
            {commitmentSection.title}
          </h1>

          

          <p className={isDark ? "dark-mode commitment-text" : "commitment-text"}>
            {commitmentSection.description}
          </p>
        </div>
        </Fade>
        <Fade right duration={1200}>
          <div className="skills-image-div">
            {
              <DisplayLottie animationData={ohsAnimation} />
            }
          </div>
        </Fade>
      </div>
    </Fade>
  );
}