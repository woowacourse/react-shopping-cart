import "./App.css";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import OrderCheckPage from "./pages/OrderCheckPage/OrderCheckPage";

function Layout() {
  return (
    <>
      <Header>SHOP</Header>
      <Outlet />
      <Footer text="주문 확인" />
    </>
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
