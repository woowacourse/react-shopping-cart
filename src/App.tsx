import { Global } from "@emotion/react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { MobileLayout } from "./components/common";
import { APIDataProvider } from "./context/APIDataProvider";
import reset from "./global/style/reset";
import { theme } from "./global/style/theme";
import ShoppingCartPage from "./pages/shopping-cart/ShoppingCartPage";
import { ToastProvider } from "./context/ToastProvider";
import { OrderListProvider } from "./pages/shopping-cart/context/OrderListProvider";

function App() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={theme}>
        <MobileLayout>
          <ToastProvider>
            <APIDataProvider>
              <OrderListProvider>
                <ShoppingCartPage />
              </OrderListProvider>
            </APIDataProvider>
          </ToastProvider>
        </MobileLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
