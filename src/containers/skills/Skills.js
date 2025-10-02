import React, {useContext} from "react";
import {Fade} from "react-reveal";
import "./Skills.css";

import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { getContent } from "../../portfolio";
import codingPerson from "../../assets/lottie/codingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/styleContext";
import LangContext from "../../contexts/langContext";

const Skills = () => {
  const {isDark} = useContext(StyleContext);
  const {lang} = useContext(LangContext);
  const { skillsSection } = getContent(lang);

  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div">
        <Fade left duration={1200}>
          <div className="skills-image-div">
            { <DisplayLottie animationData={codingPerson} /> }
          </div>
        </Fade>
        <Fade right duration={1200}>
          <div className="skills-text-div">
            <h1 className={isDark ? "dark-mode skills-heading" : "skills-heading"}>
              {skillsSection.title}{" "}
            </h1>
            <p className={isDark ? "dark-mode subTitle skills-text-subtitle" : "subTitle skills-text-subtitle"}>
              {skillsSection.subTitle}
            </p>
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map((skills, i) => (
                <p
                  key={i}
                  className={isDark ? "dark-mode subTitle skills-text" : "subTitle skills-text"}
                >
                  {skills}
                </p>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Skills;
