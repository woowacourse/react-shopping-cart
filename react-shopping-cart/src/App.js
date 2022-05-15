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

  const handleNavigatePage = (path) => () => {
    navigate(path);
  };

  return (
    <>
      <Header>
        <PageTitle onClick={handleNavigatePage('/')}>
          <Cart />
          <div>WOOWA SHOP</div>
        </PageTitle>
        <RowFlexWrapper gap="20px">
          <NavigateButton onClick={handleNavigatePage('/shopping-cart')}>
            장바구니
          </NavigateButton>
          <NavigateButton>주문목록</NavigateButton>
        </RowFlexWrapper>
      </Header>
      <Routes>
        <Route
          element={
            <ColumnFlexWrapper gap="60px">
              <ProductListPage />
            </ColumnFlexWrapper>
          }
          path="/"
        >
          <Route
            element={
              <ColumnFlexWrapper gap="60px">
                <ProductListPage />
              </ColumnFlexWrapper>
            }
            path="/:idx"
          />
          <Route path="/detail/:idx" element={<ProductDetailPage />} />
        </Route>
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
      </Routes>
    </>
  );
}

export default App;
