import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CartPage from "../pages/CartPage";
import ConfirmOrderPage from "../pages/ConfirmOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/confirm",
    element: <ConfirmOrderPage />,
  },
  {
    path: "*",
    // element: <NotFoundPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
