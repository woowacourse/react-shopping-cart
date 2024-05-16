import { Global, ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./index.css";
import AppRouter from "./router/AppRouter.tsx";
import globalStyles from "./styles/GlobalStyle.tsx";
import theme from "./styles/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles(theme)} />
        <AppRouter />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
