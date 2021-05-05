import React from 'react';
import ShoppingCart from './components/common/Icon/ShoppingCart';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductList from './components/ProductList';
import { HEADER, PAGES } from './constants/appInfo';
import Main from './components/Main';
import { reactFamily } from './mockData';

const App = () => {
  return (
    <div>
      <Header logo={<ShoppingCart />} title={HEADER.APP_TITLE} homeAddress={PAGES.PRODUCT.ADDRESS}>
        <Navigation navList={HEADER.NAV_LIST} />
      </Header>
      <Main>
        <ProductList products={reactFamily} />
      </Main>
    </div>
  );
};

export default App;
