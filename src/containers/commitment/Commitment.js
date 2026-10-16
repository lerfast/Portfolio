import React, { useContext } from "react";
import { Fade } from "react-reveal";
import { getContent } from "../../portfolio";
import "./Commitment.css";
import StyleContext from "../../contexts/styleContext";
import LangContext from "../../contexts/langContext";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

// Lotties
import ohsAnimation from "../../assets/lottie/ohs.json";

export default function Commitment() {
  const { isDark } = useContext(StyleContext);
  const { lang } = useContext(LangContext);
  const { commitmentSection } = getContent(lang);

  return (
    <Fade bottom duration={1000} distance="40px">
      <section className={`commitment-main ${isDark ? "dark-mode" : ""}`} id="commitment">
        {/* Block 1 — OHS: text LEFT + lottie RIGHT */}
        <div className="commitment-block">
          <Fade bottom duration={1200} distance="40px">
            <div className="commitment-text-div">
              <h2 className="commitment-block-title">{commitmentSection.title}</h2>
              <p className="commitment-text">{commitmentSection.description}</p>
            </div>
          </Fade>

          <Fade right duration={1200}>
            <div className="commitment-lottie-div">
              <DisplayLottie animationData={ohsAnimation} />
            </div>
          </Fade>
        </div>

      </section>
    </Fade>
  );
}
