import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { App } from "./App";
import { GlobalStyle } from "./GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
