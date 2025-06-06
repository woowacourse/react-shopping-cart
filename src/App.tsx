import * as S from "./App.styles";
import { ErrorPopup } from "./components";
import { ErrorProvider } from "./context";
import { ShoppingCartPage } from "./pages";

function App() {
  return (
    <S.AppWrapper>
      <ErrorProvider>
        <ErrorPopup />
        <ShoppingCartPage />
      </ErrorProvider>
    </S.AppWrapper>
  );
}

export default App;
