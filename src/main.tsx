import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DebugObserver from "./recoil/DebugObserver.tsx";
import { CartPage, OrderConfirmPage } from "./pages/index.ts";
import GlobalStyle from "./styles/GlobalStyle.tsx";
import { ENVIRONMENT } from "./constants/cart.ts";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CartPage />,
  },
  {
    path: "/cart-confirm",
    element: <OrderConfirmPage />,
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
