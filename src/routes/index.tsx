import React from "react";

const CartPage = React.lazy(() => import("../pages/CartPage"));
const OrderConfirmationPage = React.lazy(() => import("../pages/OrderConfirmationPage"));

export const routes = [
  { path: "/", element: <CartPage /> },
  { path: "/orderConfirmation", element: <OrderConfirmationPage /> },
];
