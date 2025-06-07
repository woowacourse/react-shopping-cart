import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { CLIENT_BASE_PATH } from "./apis/config.ts";
import MobileLayout from "./components/@common/MobileLayout/MobileLayout.tsx";
import { ROUTES } from "./constants/routes.ts";
import { CartProvider } from "./domains/cart/contexts/CartContext.tsx";
import { ModalProvider } from "./features/modal/ModalContext.tsx";
import { ToastProvider } from "./features/toast/ToastContext.tsx";
import CartPage from "./pages/CartPage/CartPage.tsx";
import OrderPage from "./pages/OrderPage/OrderPage.tsx";
import PaymentPage from "./pages/PaymentPage/PaymentPage.tsx";

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
