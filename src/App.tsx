import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./routes/Cart";
import Order from "./routes/Order";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
    { basename: "/react-shopping-cart/dist/" }
  );
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
