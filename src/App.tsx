import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import GlobalStyles from "@/styles/global";
import router from "./router";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
