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
] as const;

const paths = routes.map((route) => route.path);
export type RoutePaths = (typeof paths)[number];
export type RoutesObject<T> = Record<RoutePaths, T>;

function App() {
  // 튜플을 배열로 사용하기 위해서 얕은복사를 사용.
  const router = createBrowserRouter([...routes]);

  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
