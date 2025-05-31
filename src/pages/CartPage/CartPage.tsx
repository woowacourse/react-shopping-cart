import React, { useEffect, useState, Suspense } from 'react';
import * as S from './CartPage.styles';
import { CartHeader } from '../../features/cart/ui';
import Navbar from '../../shared/ui/Navbar';
import CartPageFooter from '../../features/cart/ui/CartPageFooter';
import { getCartItems } from '../../features/cart/api/getCartItems';
import { useSelectedCartContext } from '../../shared/context/useSelectedCartContext';
import { CartItem } from '../../shared/types/cart';
import EmptyCartItemUI from '../../features/cart/ui/EmptyCartItemUI';
import { ROUTES } from '../../shared/constants/routeConstants';

const CartList = React.lazy(() => import('../../features/cart/ui/CartList'));
const OrderPriceSummary = React.lazy(() => import('../../features/cart/ui/OrderPriceSummary'));
import CartListSkeleton from '../../features/cart/ui/CartListSkeleton';

function CartPage() {
  const { selectedCartItems } = useSelectedCartContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        if (!response) return;

        setCartItems(response.content);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch cart items:', error.message);
          alert('장바구니 아이템을 불러오는 데 실패했습니다. 다시 시도해주세요.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [selectedCartItems]);

  return (
    <S.CartPageContainer>
      <Navbar title={'SHOP'} url={ROUTES.ROOT} />
      <S.CartPageContent>
        <CartHeader cartTypeQuantity={cartItems.length} />
        {loading ? (
          <CartListSkeleton />
        ) : cartItems.length > 0 ? (
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

export default CartPage;
