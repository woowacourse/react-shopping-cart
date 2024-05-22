import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import DebugObserver from "./recoil/DebugObserver.tsx";
import { MainPage, PaymentPage, PaymentResultPage } from "./pages/index.ts";
import GlobalStyle from "./styles/GlobalStyle.tsx";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/payment/result",
    element: <PaymentResultPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      {/* {ENVIRONMENT === "development" && <DebugObserver />} */}
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <GlobalStyle />
    </RecoilRoot>
  </React.StrictMode>
);
