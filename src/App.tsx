import { Global } from "@emotion/react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { MobileLayout } from "./components/common";
import { APIDataProvider } from "./context/APIDataProvider";
import reset from "./global/style/reset";
import { theme } from "./global/style/theme";
import ShoppingCartPage from "./pages/shopping-cart/ShoppingCartPage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <MobileLayout>
          <APIDataProvider>
            <ShoppingCartPage />
          </APIDataProvider>
        </MobileLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
