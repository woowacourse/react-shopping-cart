import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./GlobalStyle";
import { HashRouter } from "react-router-dom";

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
