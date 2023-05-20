import { useRecoilValue } from 'recoil';

import NotFound from '@Pages/NotFound';

import useShoppingCart from '@Hooks/useShoppingCart';

import shoppingCartAmountState from '@Selector/shoppingCartAmountState';

import EmptyCart from './EmptyCart';
import PaymentAmount from './PaymentAmount';
import ShoppingCartControl from './ShoppingCartControl';
import ShoppingList from './ShoppingList';
import * as S from './style';

function ShoppingCart() {
  const shoppingCartAmount = useRecoilValue(shoppingCartAmountState);
  const { shoppingCart, status, updateShoppingCart } = useShoppingCart();

  if (status === 'error') {
    return <NotFound />;
  }

  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      {status === 'success' && shoppingCart?.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <S.ShoppingCartSubHeader>
            <S.ProductAmount>든든배송 상품 ({shoppingCartAmount}개)</S.ProductAmount>
            <ShoppingCartControl cartItems={shoppingCart} updateShoppingCart={updateShoppingCart} />
          </S.ShoppingCartSubHeader>
          <S.ShoppingCartContentsLayout>
            <ShoppingList
              cartItems={shoppingCart}
              isLoading={status === 'loading'}
              updateShoppingCart={updateShoppingCart}
            />
            <PaymentAmount />
          </S.ShoppingCartContentsLayout>
        </>
      )}
    </S.Container>
  );
}

export default ShoppingCart;
