import React, { useState, Suspense } from 'react';
import * as S from '../src/pages/CartPage/CartPage.styles';
import CartListSkeleton from '../src/features/cart/ui/CartListSkeleton';
import Navbar from '../src/shared/ui/Navbar';
import { ROUTES } from '../src/shared/constants/routeConstants';
import { CartHeader } from '../src/features/cart/ui';
import EmptyCartItemUI from '../src/features/cart/ui/EmptyCartItemUI';
import { CartItem } from '../src/shared/types/cart';
import CartPageFooter from '../src/features/cart/ui/CartPageFooter';

const CartList = React.lazy(() => import('../src/features/cart/ui/CartList'));
const OrderPriceSummary = React.lazy(() => import('../src/features/cart/ui/OrderPriceSummary'));
function CartPageWithEmptySelectedItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <S.CartPageContainer>
      <Navbar title={'SHOP'} url={ROUTES.ROOT} />
      <S.CartPageContent>
        <CartHeader cartTypeQuantity={cartItems.length} />
        {cartItems.length > 0 ? (
          <Suspense fallback={<CartListSkeleton />}>
            <CartList cartItems={cartItems} setCartItems={setCartItems} />
            <OrderPriceSummary />
          </Suspense>
        ) : (
          <EmptyCartItemUI />
        )}
      </S.CartPageContent>
      <CartPageFooter cartItemQuantity={cartItems.length} />
    </S.CartPageContainer>
  );
}

export default CartPageWithEmptySelectedItems;
