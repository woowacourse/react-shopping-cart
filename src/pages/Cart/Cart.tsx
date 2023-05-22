import { Suspense } from 'react';
import CartItemListContainer from '../../components/CartItemListContainer/CartItemListContainer';
import PayingContainer from '../../components/PayingContainer/PayingContainer';
import { CartPageWrapper } from './Cart.style';
import SkeletonCart from './SkeletonCart';

function Cart() {
  return (
    <CartPageWrapper>
      <Suspense fallback={<SkeletonCart />}>
        <CartItemListContainer />
        <PayingContainer />
      </Suspense>
    </CartPageWrapper>
  );
}

export default Cart;
