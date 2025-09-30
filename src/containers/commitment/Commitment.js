import React, { useContext } from "react";
import { Fade } from "react-reveal";
import { commitmentSection } from "../../portfolio";
import "./Commitment.css";
import StyleContext from "../../contexts/styleContext";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

// Lotties
import ohsAnimation from "../../assets/lottie/ohs.json";
import droneAnimation from "../../assets/lottie/dronepilot.json";

export default function Commitment() {
  const { isDark } = useContext(StyleContext);

  return (
    <Fade bottom duration={1000} distance="40px">
      <section
        className={`commitment-main ${isDark ? "dark-mode" : ""}`}
        id="commitment"
      >
        {/* Block 1 — OHS: text LEFT + lottie RIGHT */}
        <div className="commitment-block">
          <Fade bottom duration={1200} distance="40px">
            <div className="commitment-text-div">
              <h2 className="commitment-block-title">
                {commitmentSection.title}
              </h2>
              <p className="commitment-text">{commitmentSection.description}</p>
            </div>
          </Fade>

          <Fade right duration={1200}>
            <div className="commitment-lottie-div">
              <DisplayLottie animationData={ohsAnimation} />
            </div>
          </Fade>
        </div>

        {/* Block 2 — Drone: lottie LEFT + text RIGHT */}
        <div className="commitment-block commitment-block--invert">
          <Fade left duration={1200}>
            <div className="commitment-lottie-div">
              <DisplayLottie animationData={droneAnimation} />
            </div>
          </Fade>

          <Fade bottom duration={1200} distance="40px">
            <div className="commitment-text-div">
              <h2 className="commitment-block-title">
                {commitmentSection.droneTitle}
              </h2>
              <p className="commitment-text">
                {commitmentSection.droneDescription}
              </p>
            </div>
          </Fade>
        </div>
      </section>
    </Fade>
  );
}
