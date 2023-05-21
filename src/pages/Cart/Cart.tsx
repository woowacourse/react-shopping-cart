import { Suspense } from 'react';
import CartItemListContainer from '../../components/CartItemListContainer/CartItemListContainer';
import PayingContainer from '../../components/PayingContainer/PayingContainer';
import { FlexWrapper } from './Cart.style';

function Cart() {
  return (
    <FlexWrapper>
      <Suspense fallback={<h2>로딩중...</h2>}>
        <CartItemListContainer />
        <PayingContainer />
      </Suspense>
    </FlexWrapper>
  );
}

export default Cart;
