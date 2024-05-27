import { UpsideDownExclamation } from '@assets/index';
import { CartItemCount, CartList, OrderPrice } from '@components/shoppingCart';
import { PRICE } from '@constants/shippingCart';
import useOrderCosts from '@hooks/shoppingCart/useOrderCosts';
import { cartItemsAtom } from '@recoil/shoppingCart';
import { formatKoreanCurrency } from '@utils/currency';
import { useRecoilValue } from 'recoil';

import * as Styled from './ShoppingCardContent.styled';

const ShoppingCartContent = () => {
  const cartItems = useRecoilValue(cartItemsAtom);
  const { orderPrice, shippingPrice, totalPrice } = useOrderCosts();

  return (
    <>
      {cartItems.length === 0 ? (
        <Styled.Fallback>장바구니에 담은 상품이 없습니다.</Styled.Fallback>
      ) : (
        <>
          <CartItemCount count={cartItems.length} />
          <div>
            <Styled.CartItemContainer>
              <CartList cartItems={cartItems} />
            </Styled.CartItemContainer>
          </div>
          <Styled.CartInfoBanner>
            <UpsideDownExclamation />
            <Styled.CartInfoBannerText>
              총 주문 금액이 {formatKoreanCurrency(PRICE.freeShippingMinAmount)} 이상일 경우 무료 배송됩니다.
            </Styled.CartInfoBannerText>
          </Styled.CartInfoBanner>
          <OrderPrice orderPrice={orderPrice} shippingPrice={shippingPrice} totalPrice={totalPrice} />
        </>
      )}
    </>
  );
};

export default ShoppingCartContent;
