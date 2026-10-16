import React, { Suspense, lazy } from "react";
import "./App.css";
import Main from "./containers/Main";
import V3Portfolio from "./v3-site/V3Portfolio";
import { LangProvider } from "./contexts/langContext";

// The V3 professional portfolio is now the primary experience at /.
// Original V2 remains viewable at ?v3demo=v2.
// Interactive prototypes are optional and lazy-loaded only when visited.
const ControlRoomDemo = lazy(() => import("./v3-lab/control-room/ControlRoomDemo"));
const SafetyWorldDemo = lazy(() => import("./v3-lab/safety-world/SafetyWorldDemo"));
const LifeWorld = lazy(() => import("./v3-lab/life-world/LifeWorld"));

export default function App() {
  const demo = new URLSearchParams(window.location.search).get("v3demo");
  let page = <V3Portfolio />;
  if (demo === "v2") page = <Main />;
  if (demo === "control-room") page = <ControlRoomDemo />;
  if (demo === "life-lab") page = <SafetyWorldDemo />;
  if (demo === "life-world") page = <LifeWorld />;
  return (
    <LangProvider>
      <div className="App">
        <Suspense fallback={<div role="status" style={{padding:40}}>Loading experience…</div>}>{page}</Suspense>
      </div>
    </LangProvider>
  );
}
