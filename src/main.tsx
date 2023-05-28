import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./style/globalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { RecoilRoot } from "recoil";
import "./configs/recoil";
import { worker } from "./mocks/browser";

async function main() {
  await worker.start({
    serviceWorker: {
      url: "/react-shopping-cart/mockServiceWorker.js",
    },
  });

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

main();
