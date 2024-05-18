import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import GlobalStyle from "@/styles/reset";
import router from "./router";

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
