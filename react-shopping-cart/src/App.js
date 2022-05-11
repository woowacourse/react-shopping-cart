import Header from "./component/@shared/Header/Header";
import PageTitle from "./component/@shared/PageTitle/PageTitle";
import { ReactComponent as Cart } from "./assets/cart.svg";
import { RowFlexWrapper } from "./styles/Wrapper";
import NavigateButton from "./component/@shared/NavigateButton/NavigateButton";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";

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
        <Route path="/:idx" element={<ProductDetailPage />} />
        <Route path="/shopping-cart" element={<div>장바구니</div>} />
      </Routes>
    </>
  );
}

export default App;
