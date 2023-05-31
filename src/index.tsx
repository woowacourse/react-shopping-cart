import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./GlobalStyle";
import { HashRouter } from "react-router-dom";

/**
 * 본래 mocking 서버는 배포 상태에서는 실행되어서는 안 되지만,
 * 백엔드 서버가 현재 존재하지 않고, 테스트 목적이므로 mocking 서버로 동작하도록 배포합니다.
 *
 * "false" 부분의 조건문에는 실제로 아래의 조건이 들어가야 합니다:
 * process.env.NODE_ENV !== "development"
 */
const startMSW = async () => {
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
