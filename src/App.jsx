import Header from "./components/header/Header";
import ProductItem from "./pages/home/components/product-item/ProductItem";
import SS from "./components/styled";
import S from "./pages/home/styled";

function App() {
  return (
    <div>
      <Header />
      <SS.Wrapper>
        <S.ProductList>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </S.ProductList>
      </SS.Wrapper>
    </div>
  );
}

export default App;
