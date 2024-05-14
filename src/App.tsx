import "./App.css";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/reset";
import { theme } from "@/styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
