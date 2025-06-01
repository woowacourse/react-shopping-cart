import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { CLIENT_BASE_PATH } from "./apis/config.ts";
import MobileLayout from "./components/MobileLayout/MobileLayout.tsx";
import { ROUTES } from "./constants/routes.ts";
import { CartProvider } from "./contexts/CartContext.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";
import CartPage from "./pages/CartPage/CartPage.tsx";
import OrderPage from "./pages/OrderPage/OrderPage.tsx";

const Layout = () => {
  return (
    <MobileLayout>
      <ToastProvider>
        <CartProvider>
          <Outlet />
        </CartProvider>
      </ToastProvider>
    </MobileLayout>
  );
};

const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: <Layout />,
      children: [
        { path: ROUTES.HOME, element: <CartPage /> },
        { path: ROUTES.ORDER, element: <OrderPage /> },
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
