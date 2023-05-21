import { Suspense } from 'react';
import CartItemListContainer from '../../components/CartItemListContainer/CartItemListContainer';
import PayingContainer from '../../components/PayingContainer/PayingContainer';
import { CartPageWrapper } from './Cart.style';

function Cart() {
  return (
    <CartPageWrapper>
      <Suspense fallback={<h2>로딩중...</h2>}>
        <CartItemListContainer />
        <PayingContainer />
      </Suspense>
    </CartPageWrapper>
  );
}

export default Cart;
