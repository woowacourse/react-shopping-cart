import Header from './components/common/header/Header';
import { useEffect, useState } from 'react';
import { baseAPI } from './api/baseAPI';
import { PaginationResponse } from './api/type';
import CartContents from './components/features/cart/cartContents/CartContents';

function App() {
  return (
    <>
      <Header title="SHOP" showBackButton={true} />
      <CartContents />
    </>
  );
}

export default App;
