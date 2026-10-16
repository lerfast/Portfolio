// src/containers/Main.js
import React, { useState, useEffect } from "react";
import { StyleProvider } from "../contexts/styleContext";
import "./Main.css";

import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import Commitment from "./commitment/Commitment";
import Projects from "./projects/Projects";
import Certifications from "./certifications/Certifications";
import Blogs from "./blogs/Blogs";
import Profile from "./profile/Profile";
import Footer from "../components/footer/Footer";
import Top from "./topbutton/Top";
import Cycling from "../components/cycling/Cycling";
import MissionPatrimonio from "./missionPatrimonio/MissionPatrimonio";
import DroneOperations from "./droneOperations/DroneOperations";
import GaussianSplatting from "./gaussianSplatting/GaussianSplatting";

const Main = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDark");
    if (savedTheme === "true" || savedTheme === "false") {
      return savedTheme === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const changeTheme = () => {
    setIsDark(previousIsDark => !previousIsDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{ isDark: isDark, changeTheme: changeTheme }}>
        <Header />
        {/* Identidad profesional, desarrollo y Oshlix */}
        <Greeting />
        <Skills />
        <Projects />

        {/* Seguridad y Salud en el Trabajo y credenciales */}
        <Commitment />
        <Certifications />

        {/* Segunda especialidad: operaciones aéreas profesionales */}
        <DroneOperations />

        {/* Innovación y demostración interactiva 3DGS */}
        <GaussianSplatting />

        {/* Producción audiovisual, serie y destinos documentados */}
        <Cycling />
        <MissionPatrimonio />

        {/* Artículos y contacto */}
        <Blogs />
        <Profile />
        <Footer />
        <Top />
      </StyleProvider>
    </div>
  );
};

export default Main;
