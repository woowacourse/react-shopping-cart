import React from 'react';
import ShoppingCart from './components/common/Icon/ShoppingCart';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { HEADER } from './constants/appInfo';

const App = () => {
  return (
    <div>
      <Header logo={<ShoppingCart />} title={HEADER.APP_TITLE}>
        <Navigation navList={HEADER.NAV_LIST} />
      </Header>
    </div>
  );
};

export default App;
