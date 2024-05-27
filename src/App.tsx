import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import GlobalStyles from "@/styles/global";
import router from "./routes/router.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/pages/Error/ErrorPage";

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
