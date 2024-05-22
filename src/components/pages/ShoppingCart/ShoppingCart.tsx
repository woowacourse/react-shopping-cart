import * as Styled from './style';
import Header from '../../Header/Header';

import CartItemContainer from '../../CartItemContainer/CartItemContainer';
import { Suspense } from 'react';

const ShoppingCart = () => {
  return (
    <Styled.ShoppingCart>
      <Header />
      <Suspense>
        <CartItemContainer />
      </Suspense>
    </Styled.ShoppingCart>
  );
};

export default ShoppingCart;
