import "./App.css";

import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useLocation,
} from "react-router";

import Header from "./components/layout/Header/Header";
import BackButton from "./components/layout/Header/BackButton";

import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import OrderCheckPage from "./pages/OrderCheckPage/OrderCheckPage";

import { CartItemListProvider } from "./contexts/CartItemListContext";

function Layout() {
  const location = useLocation();

  const isShoppingCartPage = location.pathname === "/";

  return (
    <CartItemListProvider>
      <Header>{isShoppingCartPage ? "SHOP" : <BackButton />}</Header>
      <Outlet />
    </CartItemListProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ShoppingCartPage />,
      },
      {
        path: "/order-check",
        element: <OrderCheckPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
