import React from "react";
import ReactDOM from "react-dom/client";
import { CLIENT_BASE_PATH } from "./apis/config.ts";
import App from "./App.tsx";
import "./styles/reset.css";

async function enableMocking() {
  if (import.meta.env.MODE === "mock") {
    const { worker } = await import("./__mocks__/browser.ts");
    return worker.start({
      serviceWorker: {
        url: `${window.location.origin}${CLIENT_BASE_PATH}mockServiceWorker.js`,
        options: { scope: CLIENT_BASE_PATH },
      },
      onUnhandledRequest: "bypass",
    });
  }
  return Promise.resolve();
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
