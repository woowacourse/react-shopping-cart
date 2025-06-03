import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/reset.css";
import MobileLayout from "@shared/components/MobileLayout/MobileLayout.tsx";
import Toast from "./shared/components/Toast/Toast.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MobileLayout>
        <App />
        <Toast limit={5} duration={3000} />
      </MobileLayout>
    </BrowserRouter>
  </React.StrictMode>
);
