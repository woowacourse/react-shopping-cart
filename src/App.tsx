import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./Providers/RouteInfoProvider";

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
