import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DebugObserver from "./recoil/DebugObserver.tsx";
import { MainPage, OrderPage, PaymentPage } from "./pages/index.ts";
import GlobalStyle from "./styles/GlobalStyle.tsx";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.ts";
import { ENVIRONMENT } from "./constants/cart.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/payment/",
    element: <PaymentPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      {ENVIRONMENT === "development" && <DebugObserver />}
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <GlobalStyle />
    </RecoilRoot>
  </React.StrictMode>
);
