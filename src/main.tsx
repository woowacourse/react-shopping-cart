import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("./test/mock/browser.ts");
  return worker.start();
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>
  )
);
