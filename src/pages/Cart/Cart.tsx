import { Suspense } from 'react';

import ExpectedPayment from '../../views/Payment/components/ExpectedPayment/ExpectedPayment';
import { CartPageWrapper } from './Cart.style';
import SkeletonCart from '../../views/CartItemList/components/SkeletonCartItemList/SkeletonCart';
import CartItemListContainer from '../../views/CartItemList/components/CartItemListContainer/CartItemListContainer';

function Cart() {
  return (
    <CartPageWrapper>
      <Suspense fallback={<SkeletonCart />}>
        <CartItemListContainer />
        <ExpectedPayment />
      </Suspense>
    </CartPageWrapper>
  );
}

export default Cart;
