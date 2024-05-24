import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouteInfoProvider, { routes } from "./Providers/RouteInfoProvider";

function App() {
  // 튜플을 배열로 사용하기 위해서 얕은복사를 사용.
  const router = createBrowserRouter([...routes]);

  return (
    <RouteInfoProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </RouteInfoProvider>
  );
}

export default App;
