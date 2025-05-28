import GlobalStyle from "./styles/GlobalStyles";
import { Global } from "@emotion/react";
import Layout from "./pages/layout/Layout";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <RouterProvider router={router} />
      <Layout />
    </>
  );
}

export default App;
