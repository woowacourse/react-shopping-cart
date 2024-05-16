import { UpsideDownExclamation } from '@assets/index';
import { BottomButton } from '@components/common';
import { CartItemCount, CartList, OrderPrice } from '@components/shoppingCart';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as Styled from './OrderPage.styled';

const OrderPage: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsSelector);
  const selectedIds = useRecoilValue(selectedIdsAtom);

  const isButtonDisabled = cartItems.length === 0 || selectedIds.length === 0;

  const navigate = useNavigate();

  return (
    <Styled.OrderPageContainer>
      <h1 className="cart-item-count">장바구니</h1>
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
      <BottomButton onClick={() => navigate(ROUTE_PATHS.confirm)} disabled={isButtonDisabled}>
        주문 확인
      </BottomButton>
    </Styled.OrderPageContainer>
  );
};

export default OrderPage;
