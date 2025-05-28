import React from "react";
import ReactDOM from "react-dom/client";
import { CLIENT_BASE_PATH } from "./apis/config.ts";
import App from "./App.tsx";
import MobileLayout from "./components/MobileLayout/MobileLayout.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import "./styles/reset.css";

async function enableMocking() {
  if (!import.meta.env.VITE_USE_MOCK) return;

  const { worker } = await import("./mocks/browser");

  return worker.start({
    serviceWorker: {
      url: `${window.location.origin}${CLIENT_BASE_PATH}mockServiceWorker.js`,
      options: { scope: CLIENT_BASE_PATH },
    },
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <MobileLayout>
        <CartProvider>
          <App />
        </CartProvider>
      </MobileLayout>
    </React.StrictMode>
  )
);
