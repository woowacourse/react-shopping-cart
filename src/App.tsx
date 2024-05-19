import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CartPage />,
    },
    {
      path: "/order",
      element: <OrderConfirmPage />,
    },
  ]);
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
