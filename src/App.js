import React from "react";
import './App.css';
import Main from "./containers/Main";
import { LangProvider } from "./contexts/langContext";

function App() {
  return (
    <LangProvider>
      <div className="App">
        <Main />
      </div>
    </LangProvider>
  );
}

export default App;
