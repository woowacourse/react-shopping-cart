import { UpsideDownExclamation } from '@assets/index';
import { CartItemCount, CartList, OrderPrice } from '@components/shoppingCart';
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
          <CartItemCount count={cartItems.length} />
          <Styled.CartItemContainer>
            <CartList cartItems={cartItems} />
          </Styled.CartItemContainer>
          <Styled.CartInfoBanner>
            <UpsideDownExclamation />
            <Styled.ShippingFeeInfo>
              총 주문 금액이 {formatKoreanCurrency(PRICE.freeShippingMinAmount)} 이상일 경우 무료 배송됩니다.
            </Styled.ShippingFeeInfo>
          </Styled.CartInfoBanner>
          <OrderPrice />
        </>
      )}
    </>
  );
};

export default ShoppingCartContent;
