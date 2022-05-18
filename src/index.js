import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

import GlobalStyle from "./GlobalStyle";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="react-shopping-cart">
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
