import React from 'react';
import CartProductList from '../../components/cart/CartProductList/CartProductList';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import PageTitle from '../../components/common/PageTitle/PageTitle';

function ShoppingCart() {
  return (
    <PageTemplate>
      <PageTitle>장바구니</PageTitle>
      <CartProductList />
    </PageTemplate>
  );
}

export default ShoppingCart;
