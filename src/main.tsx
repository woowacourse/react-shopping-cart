import React from "react";
import ReactDOM from "react-dom/client";
import { CLIENT_BASE_PATH } from "./apis/config.ts";
import MobileLayout from "./components/MobileLayout/MobileLayout.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import "./styles/reset.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage.tsx";

const Layout = () => {
  return (
    <MobileLayout>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </MobileLayout>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <CartPage /> },
        // { path: "/order", element: <OrderPage /> },
      ],
    },
  ],
  {
    basename: CLIENT_BASE_PATH,
  }
);

async function enableMocking() {
  if (!import.meta.env.VITE_USE_MOCK) return;

  const { worker } = await import("./mocks/browser");

  return worker.start({
    serviceWorker: {
      url: `${window.location.origin}${CLIENT_BASE_PATH}mockServiceWorker.js`,
      options: { scope: CLIENT_BASE_PATH },
    },
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
);
