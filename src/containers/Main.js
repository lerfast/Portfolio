// src/containers/Main.js
import React, { useState, useEffect } from "react";
import { StyleProvider } from "../contexts/styleContext";
import "./Main.css";

import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
// 1) Importa Commitment
import Commitment from "./commitment/Commitment"; 
import Projects from "./projects/Projects";
import Certifications from "./certifications/Certifications";
import Blogs from "./blogs/Blogs";
import Profile from "./profile/Profile";
import Footer from "../components/footer/Footer";
import Top from "./topbutton/Top";
import Cycling from "../components/cycling/Cycling";

const Main = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("isDark") === null) {
      const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
      localStorage.setItem("isDark", darkPref.matches);
    }
    setIsDark({ isDark: JSON.parse(localStorage.getItem("isDark")) });
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark, () => {
      localStorage.setItem("isDark", isDark);
    });
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{ isDark: isDark, changeTheme: changeTheme }}>
        <Header />
        <Greeting />
        <Skills />

        {/* 2) Añadimos la nueva sección de Commitment justo aquí */}
        <Commitment />

        <Projects />
        <Certifications />
        <Blogs />
        <Cycling />
        <Profile />
        <Footer />
        <Top />
      </StyleProvider>
    </div>
  );
};

export default Main;
