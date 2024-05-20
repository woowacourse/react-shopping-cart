import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyles from "./styles/globalStyles";
import "./index.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyles />
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
