import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MobileLayout from "./components/MobileLayout/MobileLayout.tsx";
import { BASE_URL } from "./constants/config.ts";
import "./styles/reset.css";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  return worker.start({
    serviceWorker: {
      url: `${window.location.origin}${BASE_URL}mockServiceWorker.js`,
      options: { scope: BASE_URL },
    },
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <MobileLayout>
        <App />
      </MobileLayout>
    </React.StrictMode>
  )
);
