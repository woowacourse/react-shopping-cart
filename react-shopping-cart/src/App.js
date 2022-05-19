import { Routes, Route } from 'react-router-dom';

import ProductDetailPage from 'pages/ProductDetailPage/ProductDetailPage';
import ProductListPage from 'pages/ProductListPage/ProductListPage';
import ShoppingCartPage from 'pages/ShoppingCartPage/ShoppingCartPage';

import Header from 'components/@shared/Header/Header';

import HomeButton from 'components/HomeButton/HomeButton';
import NavigationButtonList from 'components/NavigationButtonGroup/NavigationButtonGroup';

import { ReactComponent as Cart } from 'assets/cart.svg';
import PATH from 'constants/path';

function App() {
  // TODO: 개행 손보기
  return (
    <>
      <Header
        left={<HomeButton title="WOOWA SHOP" emoji={<Cart />} />}
        right={<NavigationButtonList />}
      />
      <Routes>
        <Route element={<ProductListPage />} path={PATH.HOME}>
          <Route element={<ProductListPage />} path={PATH.PAGING_HOME} />
        </Route>
        <Route path={PATH.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={PATH.SHOPPING_CART} element={<ShoppingCartPage />} />
      </Routes>
    </>
  );
}

export default App;
