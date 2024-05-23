import { InfoBanner, PageExplanation } from '@components/common';
import { AmountsList, CartList } from '@components/shoppingCart';
import { PRICE } from '@constants/shippingCart';
import { cartItemsAtom } from '@recoil/shoppingCart';
import { formatKoreanCurrency } from '@utils/currency';
import { useRecoilValue } from 'recoil';

import * as Styled from './ShoppingCardContent.styled';

const ShoppingCartContent = () => {
  const cartItems = useRecoilValue(cartItemsAtom);

  return (
    <>
      {cartItems.length === 0 ? (
        <Styled.EmptyCart>장바구니에 담은 상품이 없습니다.</Styled.EmptyCart>
      ) : (
        <>
          <PageExplanation>
            <PageExplanation.Row>현재 {cartItems.length}종류의 상품이 담겨 있습니다.</PageExplanation.Row>
          </PageExplanation>
          <Styled.CartItemContainer>
            <CartList cartItems={cartItems} />
          </Styled.CartItemContainer>
          <InfoBanner>
            총 주문 금액이 {formatKoreanCurrency(PRICE.freeShippingMinAmount)} 이상일 경우 무료 배송됩니다.
          </InfoBanner>
          <AmountsList />
        </>
      )}
    </>
  );
};

export default ShoppingCartContent;
