import { ThemeProvider } from "@emotion/react";
import * as S from "./App.styles";
import { ToastProvider } from "./modules";
import { ShoppingCartPage } from "./pages";
import { theme } from "./styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <S.AppWrapper>
        <ToastProvider>
          <ShoppingCartPage />
        </ToastProvider>
      </S.AppWrapper>
    </ThemeProvider>
  );
}

export default App;
