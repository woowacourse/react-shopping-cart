import { css } from "@emotion/css";
import Header from "./components/@common/Header/Header";
import CartItemPage from "./pages/CartItemPage";

function App() {
  return (
    <div className={AppStyles}>
      <Header />
      <CartItemPage />
    </div>
  );
}

export default App;

const AppStyles = css`
  min-height: 100dvh;
  background-color: #ffffff;
`;
