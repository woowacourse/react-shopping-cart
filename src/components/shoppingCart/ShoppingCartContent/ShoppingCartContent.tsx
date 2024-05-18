import { UpsideDownExclamation } from '@assets/index';
import { CartItemCount, CartList, OrderPrice } from '@components/shoppingCart';
import { cartItemsAtom } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

import * as Styled from './ShoppingCardContent.styled';

const ShoppingCartContent = () => {
  const cartItems = useRecoilValue(cartItemsAtom);

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="fallback">장바구니에 담은 상품이 없습니다.</div>
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
            <span className="label">총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</span>
          </Styled.CartInfoBanner>
          <OrderPrice />
        </>
      )}
    </>
  );
};

export default ShoppingCartContent;
