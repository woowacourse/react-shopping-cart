import { useRecoilValue } from 'recoil';

import NotFound from '@Pages/NotFound';

import useCartItems from '@Hooks/useCartItems';

import shoppingCartAmountState from '@Selector/cartItemsAmountState';

import CartItems from './CartItems';
import CartListController from './CartListController';
import EmptyCart from './EmptyCart';
import PaymentAmount from './PaymentAmount';
import * as S from './style';

function CartList() {
  const shoppingCartAmount = useRecoilValue(shoppingCartAmountState);
  const { cartItems, status, errorMessage, updateCartItem } = useCartItems();

  if (status === 'error') {
    return <NotFound errorMessage={errorMessage} />;
  }

  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      {status === 'success' && cartItems?.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <S.ShoppingCartSubHeader>
            <S.ProductAmount>든든배송 상품 ({shoppingCartAmount}개)</S.ProductAmount>
            <CartListController />
          </S.ShoppingCartSubHeader>
          <S.ShoppingCartContentsLayout>
            <CartItems cartItems={cartItems} isLoading={status === 'loading'} updateCartItem={updateCartItem} />
            <PaymentAmount />
          </S.ShoppingCartContentsLayout>
        </>
      )}
    </S.Container>
  );
}

export default CartList;
