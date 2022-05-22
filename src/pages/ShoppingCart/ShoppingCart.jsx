import React from 'react';

import { CartProductList, OrderContainer } from 'components/cart';
import { PageTemplate, PageTitle } from 'components/common';

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
