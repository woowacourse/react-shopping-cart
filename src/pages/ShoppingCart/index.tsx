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
  const { isEmpty } = useShoppingCart();

  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <>
          <S.ShoppingCartSubHeader>
            <S.ProductAmount>든든배송 상품 ({shoppingCartAmount}개)</S.ProductAmount>
            <ShoppingCartControl />
          </S.ShoppingCartSubHeader>
          <S.ShoppingCartContentsLayout>
            <ShoppingList />
            <PaymentAmount />
          </S.ShoppingCartContentsLayout>
        </>
      )}
    </S.Container>
  );
}

export default ShoppingCart;
