import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MobileLayout from "./components/MobileLayout/MobileLayout.tsx";
import "./styles/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MobileLayout>
      <App />
    </MobileLayout>
  </React.StrictMode>
);
