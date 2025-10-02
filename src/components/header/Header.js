import React, { useContext } from "react";
import Headroom from "react-headroom";
import "./Header.css";
import StyleContext from "../../contexts/styleContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { getContent } from "../../portfolio";
import LangContext from "../../contexts/langContext";

const Header = () => {
  const { isDark } = useContext(StyleContext);
  const { lang, setLang } = useContext(LangContext);
  const { greeting, nav } = getContent(lang);

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        {/* Logo */}
        <div className="logo">
          <span className="grey-color"> &lt;</span>
          <span className={isDark ? 'dark-menu logo-name' : 'logo-name'}>
            {greeting.username}
          </span>
          <span className="grey-color">/&gt;</span>
        </div>

        {/* menu(phone) */}
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn" style={{ color: "white" }}>
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>

        {/* Nav-Bar */}
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          <li><a href="#skills">{nav.skills}</a></li>
          <li><a href="#projects">{nav.projects}</a></li>
          <li><a href="#certs">{nav.certs}</a></li>
          <li><a href="#blogs">{nav.blogs}</a></li>
          <li><a href="#contact">{nav.contact}</a></li>

          {/* Botón de idioma (mantiene look de los links) */}
          <li>
            <button
              type="button"
              className="lang-btn"
              aria-label="Change language"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
          </li>

          <li>
            <a href="# ">
              <ToggleSwitch />
            </a>
          </li>
        </ul>
      </header>
    </Headroom>
  );
};
export default Header;
