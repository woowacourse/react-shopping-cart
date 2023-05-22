import { Suspense } from 'react';
import CartItemListContainer from '../../components/CartItemListContainer/CartItemListContainer';
import ExpectedPayment from '../../components/ExpectedPayment/ExpectedPayment';
import { CartPageWrapper } from './Cart.style';
import SkeletonCart from './SkeletonCart';

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
