import { UpsideDownExclamation } from '@assets/index';
import { BottomButton } from '@components/common';
import { CartItemCount, CartList, OrderPrice } from '@components/shoppingCart';
import { useRecoilValue } from 'recoil';

import { cartItemsSelector } from '../../recoil/shoppingCart';

import * as Styled from './OrderPage.styled';

const OrderPage: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsSelector);

  return (
    <Styled.OrderPageContainer>
      <h1 className="cart-item-count">장바구니</h1>
      <CartItemCount count={2} />
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
      <BottomButton>주문 확인</BottomButton>
    </Styled.OrderPageContainer>
  );
};

export default OrderPage;
