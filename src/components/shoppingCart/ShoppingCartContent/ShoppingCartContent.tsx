import { UpsideDownExclamation } from '@assets/index';
import { OrderPrice, ShippingFeeInfo } from '@components/common';
import { CartItemCount, CartList } from '@components/shoppingCart';
import { cartItemsAtom } from '@recoil/shoppingCart';
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
            <ShippingFeeInfo />
          </Styled.CartInfoBanner>
          <OrderPrice />
        </>
      )}
    </>
  );
};

export default ShoppingCartContent;
