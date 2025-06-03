import GlobalStyle from "./styles/GlobalStyles";
import { Global } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
