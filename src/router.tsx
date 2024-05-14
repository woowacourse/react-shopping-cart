import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

import CartPage from "@/pages/CardPage/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
