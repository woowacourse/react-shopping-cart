import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/cart", element: <Cart /> },
      ],
    },
  ],
  {
    basename: "/react-shopping-cart/",
  }
);

export default router;
