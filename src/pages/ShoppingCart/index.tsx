import { useRecoilValue } from 'recoil';

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
    return <div>오류</div>;
  }

  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      {!shoppingCart?.length ? (
        <EmptyCart />
      ) : (
        <>
          <S.ShoppingCartSubHeader>
            <S.ProductAmount>든든배송 상품 ({shoppingCartAmount}개)</S.ProductAmount>
            <ShoppingCartControl shoppingCart={shoppingCart} updateShoppingCart={updateShoppingCart} />
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
