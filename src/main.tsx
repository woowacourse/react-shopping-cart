import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./reset.css";
import { QueryProvider } from "./modules/index.ts";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  return worker.start({
    serviceWorker: {
      url:
        process.env.NODE_ENV === "production"
          ? "/react-shopping-products/mockServiceWorker.js"
          : "/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryProvider>
        <App />
      </QueryProvider>
    </React.StrictMode>,
  );
});
