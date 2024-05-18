import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./styles/globalStyles";
import "./index.css";
import "./App.css";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
      <GlobalStyles />
    </RecoilRoot>
  </React.StrictMode>
);
