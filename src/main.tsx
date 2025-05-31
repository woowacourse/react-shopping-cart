import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./route/index.tsx";
import { ErrorProvider } from "./provider/errorProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorProvider>
      <Router />
    </ErrorProvider>
  </React.StrictMode>
);
