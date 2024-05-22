import * as Styled from './style';
import Header from '../../common/Header/Header';

import { Suspense } from 'react';
import CartItemContainer from '../../CartItemContainer/CartItemContainer';

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
