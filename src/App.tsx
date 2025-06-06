import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { CLIENT_BASE_PATH } from "./apis/config.ts";
import MobileLayout from "./components/MobileLayout/MobileLayout.tsx";
import { ROUTES } from "./constants/routes.ts";
import { CartProvider } from "./contexts/CartContext.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";
import CartPage from "./pages/CartPage/CartPage.tsx";
import OrderPage from "./pages/OrderPage/OrderPage.tsx";
import PaymentPage from "./pages/PaymentPage/PaymentPage.tsx";
import { ModalProvider } from "./contexts/ModalContext.tsx";

const Layout = () => {
  return (
    <MobileLayout>
      <ToastProvider>
        <CartProvider>
          <ModalProvider>
            <Outlet />
          </ModalProvider>
        </CartProvider>
      </ToastProvider>
    </MobileLayout>
  );
};

const router = createBrowserRouter(
  [
    {
      path: ROUTES.CART,
      element: <Layout />,
      children: [
        { path: ROUTES.CART, element: <CartPage /> },
        { path: ROUTES.ORDER, element: <OrderPage /> },
        { path: ROUTES.PAYMENT, element: <PaymentPage /> },
      ],
    },
  ],
  {
    basename: CLIENT_BASE_PATH,
  }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
