import { css } from "@emotion/react";
import Header from "./components/header/Header";
import SS from "./components/styled";
import ProductList from "./pages/home/components/product-list/ProductList";

function App() {
  return (
    <div css={style}>
      <Header />
      <SS.Wrapper>
        <ProductList />
      </SS.Wrapper>
    </div>
  );
}

const style = css`
  .header {
    position: sticky;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0;
  }
`;

export default App;
