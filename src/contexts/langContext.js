// src/contexts/langContext.js
import React, { createContext, useEffect, useMemo, useState } from "react";

const LangContext = createContext({ lang: "en", setLang: () => {} });

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  useEffect(() => localStorage.setItem("lang", lang), [lang]);
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export default LangContext;
