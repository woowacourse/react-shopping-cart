import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./routes/Cart";
import Order from "./routes/Order";

const routes = [
  {
    path: "/",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
