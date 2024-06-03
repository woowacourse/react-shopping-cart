import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CartPage />,
    },
    {
      path: "/order",
      element: <OrderPage />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
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
