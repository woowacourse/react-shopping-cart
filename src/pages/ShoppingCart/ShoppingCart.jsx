import React from 'react';

import CartProductList from 'components/cart/CartProductList/CartProductList';
import OrderContainer from 'components/cart/OrderContainer/OrderContainer';
import PageTemplate from 'components/common/PageTemplate/PageTemplate';
import PageTitle from 'components/common/PageTitle/PageTitle';

import * as Styled from 'pages/ShoppingCart/ShoppingCart.style';

function ShoppingCart() {
  return (
    <PageTemplate>
      <PageTitle>장바구니</PageTitle>
      <Styled.ContentContainer>
        <CartProductList />
        <OrderContainer />
      </Styled.ContentContainer>
    </PageTemplate>
  );
}

export default ShoppingCart;
