import React from "react";

const CartPage = React.lazy(() => import("../pages/CartPage"));
const OrderConfirmationPage = React.lazy(() => import("../pages/OrderConfirmationPage"));
const PaymentConfirmationPage = React.lazy(() => import("../pages/PaymentConfirmationPage"));

export const routes = [
  { path: "/", element: <CartPage /> },
  { path: "/orderConfirmation", element: <OrderConfirmationPage /> },
  { path: "/paymentConfirmation", element: <PaymentConfirmationPage /> },
];
