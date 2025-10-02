import React, { useContext } from "react";
import "./Contact.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/styleContext";

import LangContext from "../../contexts/langContext";
import { getContent } from "../../portfolio";

export default function Contact() {
  const { isDark } = useContext(StyleContext);
  const { lang } = useContext(LangContext);
  const { contactInfo, nav } = getContent(lang);

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            {/* Usamos el texto del menú como título de sección */}
            <h1 className="heading contact-title">{nav.contact}</h1>
            <p
              className={
                isDark
                  ? "dark-mode contact-subtitle"
                  : "subTitle contact-subtitle"
              }
            >
              {contactInfo.subtitle}
            </p>
            <div
              className={
                isDark ? "dark-mode contact-text-div" : "contact-text-div"
              }
            >
              <a
                className="contact-detail-email"
                href={"mailto:" + contactInfo.email_address}
              >
                {contactInfo.email_address}
              </a>
              <div className="contact-socialMedia">
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
