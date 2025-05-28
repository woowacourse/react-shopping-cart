import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import * as S from "./styles/Layout.styled";

function App() {
  return (
    <S.Layout>
      <Header />
      <CartPage />
    </S.Layout>
  );
}

export default App;
