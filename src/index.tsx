import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { worker } from "./mocks/browser";
import GlobalStyle from "./styles/GlobalStyle";

const ProductPage = lazy(() => import("./pages/ProductPage"));
const ShoppingCartPage = lazy(() => import("./pages/ShoppingCartPage"));

const main = async () => {
  if (window.location.pathname === "/react-shopping-cart") {
    window.location.pathname = "/react-shopping-cart/";
    return;
  }

  await worker.start({
    serviceWorker: {
      url: "/react-shopping-cart/mockServiceWorker.js",
    },
  });
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <ProductPage />,
        },
        {
          path: "shopping-cart",
          element: <ShoppingCartPage />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);

main();
