import * as S from "./App.styles";
import { ToastProvider } from "./modules";
import { ShoppingCartPage } from "./pages";

function App() {
  return (
    <S.AppWrapper>
      <ToastProvider>
        <ShoppingCartPage />
      </ToastProvider>
    </S.AppWrapper>
  );
}

export default App;
