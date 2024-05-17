import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DebugObserver from "./recoil/DebugObserver.tsx";
import { CartPage, OrderConfirmPage } from "./pages/index.ts";
import GlobalStyle from "./GlobalStyle.tsx";
import { ENVIRONMENT } from "./constants/index.ts";

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
      <GlobalStyle />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
