import React, { Suspense, lazy } from "react";
import "./App.css";
import { LangProvider } from "./contexts/langContext";

// LER V3 / LIFE WORLD is the official homepage at /.
// Keep the direct ?v3demo=life-world link as an alias for existing bookmarks.
// Older experiences are preserved as optional, lazily loaded routes:
//   ?v3demo=portfolio     = previous cinematic V3 homepage (backup)
//   ?v3demo=v2            = original V2 portfolio
//   ?v3demo=control-room  = experimental control room
//   ?v3demo=life-lab      = experimental safety world
// This is intentionally a change of routing only: it does not modify LIFE WORLD.
const LifeWorld = lazy(() => import("./v3-lab/life-world/LifeWorld"));
const V3Portfolio = lazy(() => import("./v3-site/V3Portfolio"));
const Main = lazy(() => import("./containers/Main"));
const ControlRoomDemo = lazy(() => import("./v3-lab/control-room/ControlRoomDemo"));
const SafetyWorldDemo = lazy(() => import("./v3-lab/safety-world/SafetyWorldDemo"));

export default function App() {
  const demo = new URLSearchParams(window.location.search).get("v3demo");

  // Default route and the explicit "life-world" alias render exactly the same page.
  let page = <LifeWorld />;
  if (demo === "portfolio") page = <V3Portfolio />;
  if (demo === "v2") page = <Main />;
  if (demo === "control-room") page = <ControlRoomDemo />;
  if (demo === "life-lab") page = <SafetyWorldDemo />;

  return (
    <LangProvider>
      <div className="App">
        <Suspense fallback={<div role="status" style={{ padding: 40 }}>Loading experience…</div>}>
          {page}
        </Suspense>
      </div>
    </LangProvider>
  );
}
