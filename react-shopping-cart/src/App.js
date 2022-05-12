import Header from "./component/@shared/Header/Header";
import PageTitle from "./component/@shared/PageTitle/PageTitle";
import { ReactComponent as Cart } from "./assets/cart.svg";
import { ColumnFlexWrapper, RowFlexWrapper } from "./styles/Wrapper";
import NavigateButton from "./component/@shared/NavigateButton/NavigateButton";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";

function App() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateShoppingCart = () => {
    navigate("/shopping-cart");
  };

  return (
    <>
      <Header>
        <PageTitle onClick={handleNavigateHome}>
          <Cart />
          <div>WOOWA SHOP</div>
        </PageTitle>
        <RowFlexWrapper gap="20px">
          <NavigateButton onClick={handleNavigateShoppingCart}>
            장바구니
          </NavigateButton>
          <NavigateButton>주문목록</NavigateButton>
        </RowFlexWrapper>
      </Header>
      <Routes>
        <Route
          element={
            <RowFlexWrapper>
              <ProductListPage />
            </RowFlexWrapper>
          }
          path="/"
        />
        <Route
          element={
            <ColumnFlexWrapper gap="60px">
              <ProductListPage />
            </ColumnFlexWrapper>
          }
          path="/:idx"
        />
        <Route path="/detail/:idx" element={<ProductDetailPage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
      </Routes>
    </>
  );
}

export default App;
