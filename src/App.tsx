import { css } from "@emotion/css";
import Header from "./components/@common/Header/Header";
import CartItemPage from "./pages/CartItemPage";
import { CartItemProvider } from "./contexts/CartItemProvider";

function App() {
  return (
    <CartItemProvider>
      <div className={AppStyles}>
        <Header />
        <CartItemPage />
      </div>
    </CartItemProvider>
  );
}

export default App;

const AppStyles = css`
  min-height: 100dvh;
  background-color: #ffffff;
`;
