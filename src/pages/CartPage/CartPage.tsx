import React, { useEffect, useState, Suspense } from 'react';
import * as S from './CartPage.styles';
import { CartHeader, CartListSkeleton, CartPageFooter, EmptyCartItemUI } from '../../features/cart/ui';
import Navbar from '../../shared/ui/Navbar';
import { getCartItems } from '../../features/cart/api/getCartItems';
import { ROUTES } from '../../shared/constants/routeConstants';
import { useCartContext } from '../../shared/context/useCartContext';
import { saveSelectedCartItemsToLocalStorage } from '../../features/cart/utils/localStorageService';

const CartList = React.lazy(() => import('../../features/cart/ui/CartList'));
const OrderPriceSummary = React.lazy(() => import('../../widgets/ui/OrderPriceSummary'));

function CartPage() {
  const { cartItems, selectedCartItems, updateCartItems, updateSelectedCartItem, removeSelectedCartItem } =
    useCartContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        if (!response) return;
        updateCartItems(response.content);
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

  useEffect(() => {
    selectedCartItems.forEach((item) => {
      const currentItem = cartItems.find((cartItem) => cartItem.id === item.id);
      if (!currentItem) {
        removeSelectedCartItem(item);
        return;
      }

      const currentItemQuantity = currentItem.quantity;
      if (currentItemQuantity !== item.quantity) {
        updateSelectedCartItem(item, currentItemQuantity);
      }
    });

    saveSelectedCartItemsToLocalStorage(selectedCartItems);
  }, [cartItems, selectedCartItems]);

  return (
    <S.CartPageContainer>
      <Navbar title={'SHOP'} url={ROUTES.ROOT} />
      <S.CartPageContent>
        <CartHeader cartTypeQuantity={cartItems.length} />
        {loading ? (
          <CartListSkeleton />
        ) : cartItems.length > 0 ? (
          <Suspense fallback={<CartListSkeleton />}>
            <CartList />
            <OrderPriceSummary />
          </Suspense>
        ) : (
          <EmptyCartItemUI />
        )}
      </S.CartPageContent>
      <CartPageFooter
        title='주문 확인'
        url={ROUTES.REVIEW}
        cartItemQuantity={cartItems.length}
        selectedCartItems={selectedCartItems}
      />
    </S.CartPageContainer>
  );
}

export default CartPage;
