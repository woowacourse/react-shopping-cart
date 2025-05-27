import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  const { worker } = await import("./mock/browser.ts");

  const isLocalHost = process.env.NODE_ENV === "development";

  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: isLocalHost
        ? "/mockServiceWorker.js"
        : "/react-shopping-cart/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
