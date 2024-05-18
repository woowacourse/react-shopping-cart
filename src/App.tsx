import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import GlobalStyle from "@/styles/reset";
import { Suspense } from "react";
import router from "./router";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Suspense fallback={<div>loading....</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
