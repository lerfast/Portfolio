// src/containers/greeting/Greeting.js
import React, { useContext } from "react";
import { Fade } from "react-reveal";
import "./Greeting.css";
import programmerAnimation from "../../assets/lottie/programmer_animation1.json";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";

// 👇 Importa el selector bilingüe
import { getContent } from "../../portfolio";
import LangContext from "../../contexts/langContext";

export default function Greeting() {
  // idioma actual (por defecto 'en')
  const { lang = "en" } = useContext(LangContext) || { lang: "en" };

  // 👇 Obtén el pack según el idioma
  const { greeting: g } = getContent(lang);
  // Keep the translated source of truth, including react-easy-emoji's array.
  const subtitleParts = React.Children.toArray(g.subTitle);
  const roles = subtitleParts.every(part => typeof part === "string")
    ? subtitleParts.join("").split(" | ")
    : [];


  // Textos de los botones (puedes moverlos a portfolio si quieres)
  const contactLabel = lang === "es" ? "Contáctame" : "Contact me";
  const resumeLabel  = lang === "es" ? "Ver mi CV"  : "See my resume";

  // Si algún día tienes un CV distinto para ES:
  const resumeHref = g.resumeLinkEs || g.resumeLink;

  return (
    <Fade bottom duration={1300} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1 className="greeting-text">
                {g.greetingText}
                <span className="glitch">{g.greetingName}</span>
              </h1>

              {roles.length === 5 ? (
                <>
                  <p className="greeting-text-p greeting-desktop-subtitle">{g.subTitle}</p>
                  <div className="greeting-roles">
                  <ul className="greeting-primary-roles">
                    {roles.slice(0, 3).map(role => <li key={role}>{role}</li>)}
                  </ul>
                  <ul className="greeting-complementary-roles">
                    {roles.slice(3).map(role => <li key={role}>{role}</li>)}
                  </ul>
                  </div>
                </>
              ) : (
                <p className="greeting-text-p">{g.subTitle}</p>
              )}

              <SocialMedia />

              <div className="button-greeting-div">
                <Button text={contactLabel} href="#contact" className="cta-button" />
                <Button text={resumeLabel} newTab href={resumeHref} className="cta-button" />
              </div>
            </div>
          </div>

          <div className="greeting-image-div">
            <DisplayLottie animationData={programmerAnimation} />
          </div>
        </div>
      </div>
    </Fade>
  );
}
