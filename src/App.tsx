import "./App.css";

import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useLocation,
} from "react-router";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import OrderCheckPage from "./pages/OrderCheckPage/OrderCheckPage";

import backButton from "/backButton.png";

function Layout() {
  const location = useLocation();

  const isshoppingCartPage = location.pathname === "/";

  return (
    <>
      <Header>
        {isshoppingCartPage ? "SHOP" : <img src={backButton}></img>}
      </Header>
      <Outlet />
      <Footer text={isshoppingCartPage ? "주문 확인" : "결제하기"} />
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
