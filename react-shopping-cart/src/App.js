import { Routes, Route, useNavigate } from 'react-router-dom';

import ProductDetailPage from 'pages/ProductDetailPage/ProductDetailPage';
import ProductListPage from 'pages/ProductListPage/ProductListPage';
import ShoppingCartPage from 'pages/ShoppingCartPage/ShoppingCartPage';

import Header from 'components/@shared/Header/Header';
import NavigateButton from 'components/@shared/NavigateButton/NavigateButton';
import PageTitle from 'components/@shared/PageTitle/PageTitle';

import { ColumnFlexWrapper, RowFlexWrapper } from 'styles/Wrapper';

import { ReactComponent as Cart } from 'assets/cart.svg';

function App() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateShoppingCart = () => {
    navigate('/shopping-cart');
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
