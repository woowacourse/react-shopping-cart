import Header from "./components/header/Header";
import SS from "./components/styled";
import ProductList from "./pages/home/components/product-list/ProductList";

function App() {
  return (
    <div>
      <Header />
      <SS.Wrapper>
        <ProductList />
      </SS.Wrapper>
    </div>
  );
}

export default App;
