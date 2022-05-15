import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "component/@shared/Header/Header";
import PageTitle from "component/@shared/PageTitle/PageTitle";
import NavigateButton from "component/@shared/NavigateButton/NavigateButton";

import ProductListPage from "pages/ProductListPage/ProductListPage";
import ProductDetailPage from "pages/ProductDetailPage/ProductDetailPage";
import ShoppingCartPage from "pages/ShoppingCartPage/ShoppingCartPage";

import { ReactComponent as Cart } from "assets/cart.svg";
import { ColumnFlexWrapper, RowFlexWrapper } from "styles/Wrapper";
import { ROUTE_PATH } from "constants";

function App() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate(ROUTE_PATH.ROOT);
  };

  const handleNavigateShoppingCart = () => {
    navigate(ROUTE_PATH.SHOPPING_CART);
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
          path={ROUTE_PATH.ROOT}
        />
        <Route
          element={
            <ColumnFlexWrapper gap="60px">
              <ProductListPage />
            </ColumnFlexWrapper>
          }
          path={`${ROUTE_PATH.ROOT}:idx`}
        />
        <Route
          path={`${ROUTE_PATH.DETAIL}/:idx`}
          element={<ProductDetailPage />}
        />
        <Route path={ROUTE_PATH.SHOPPING_CART} element={<ShoppingCartPage />} />
      </Routes>
    </>
  );
}

export default App;
