import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { globalStyle } from "../global.styled.ts";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={globalStyle} />
    <App />
  </React.StrictMode>
);
