import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import GlobalStyles from "@/styles/global";
import router from "./router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./pages/Error/ErrorPage";

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
