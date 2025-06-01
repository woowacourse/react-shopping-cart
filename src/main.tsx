import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ErrorProvider } from "./provider/errorProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorProvider>
      <BrowserRouter basename="/react-shopping-cart/">
        <App />
      </BrowserRouter>
    </ErrorProvider>
  </React.StrictMode>
);
