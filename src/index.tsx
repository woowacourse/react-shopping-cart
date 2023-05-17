import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./GlobalStyle";
import { HashRouter } from "react-router-dom";

const startMSW = async () => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  if (window.location.pathname === "/react-shopping-cart") {
    window.location.pathname = "/react-shopping-cart/";
    return;
  }

  const { worker } = require("./mocks/browser");

  await worker.start({
    serviceWorker: {
      url: "/react-shopping-cart/mockServiceWorker.js",
    },
  });
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <GlobalStyle />
        <App />
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>
);

startMSW();
