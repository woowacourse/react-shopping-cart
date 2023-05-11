import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ProductListPage from "./pages/ProductListPage";

export default function Router() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <ProductListPage />,
          },
        ],
      },
    ],
    {}
  );

  return <RouterProvider router={router} />;
}
