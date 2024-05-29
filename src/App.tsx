import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider
          router={router}
          fallbackElement={<ErrorPage />}
        />
      </Suspense>
    </>
  );
}

export default App;
