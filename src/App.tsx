import * as S from "./App.styles";
import { ErrorPopup } from "./components";
import { ErrorProvider } from "./context";
import { MainPage } from "./pages";

function App() {
  return (
    <S.AppWrapper>
      <ErrorProvider>
        <ErrorPopup />
        <MainPage />
      </ErrorProvider>
    </S.AppWrapper>
  );
}

export default App;
