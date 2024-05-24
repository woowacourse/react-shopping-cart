import { FlexCenter, FlexColumn } from '@/style/common.style';
import {
  orderedItemQuantityState,
  recipeState,
} from '@/store/selectors/recipeSelector';

import FullWidthButton from '@/components/Button/FullWidthButton';
import Header from '@/components/Header';
import { ORDER_CONFIRM_MESSAGE } from '@/constants/message';
import { ROUTE_PATH } from '@/constants/routePath';
import { StyledFixedBottom } from '@/style/styledBox.style';
import { StyledFixedTop } from '../style/styledBox.style';
import { selectedCouponListState } from '@/store/atoms';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useTotalCouponDiscount from '@/hooks/useTotalCouponDiscount';

const OrderConfirm = () => {
  const navigator = useNavigate();

  const { totalPrice } = useRecoilValue(recipeState);

  const selectedCoupon = useRecoilValue(selectedCouponListState);
  const totalDiscountPrice = useTotalCouponDiscount({
    coupons: selectedCoupon,
  });

  const { itemCount, totalQuantity } = useRecoilValue(orderedItemQuantityState);

  return (
    <>
      <StyledFixedTop>
        <Header type="nothing" navigatePath={ROUTE_PATH.cart} />
      </StyledFixedTop>
      <StyledCenterBox>
        <StyledTextTitle>주문 확인</StyledTextTitle>

        <StyledTextBody>
          {ORDER_CONFIRM_MESSAGE.confirmOrder(itemCount, totalQuantity)}
        </StyledTextBody>
        <StyledTextBody> {ORDER_CONFIRM_MESSAGE.confirmPrice}</StyledTextBody>

        <StyledTextSubTitle>총 결제 금액</StyledTextSubTitle>
        <StyledTextPrice>
          {(totalPrice - totalDiscountPrice).toLocaleString('ko-KR')}원
        </StyledTextPrice>
      </StyledCenterBox>

      <StyledFixedBottom>
        <FullWidthButton
          onClick={() => {
            navigator(ROUTE_PATH.cart);
          }}
        >
          장바구니로 돌아가기
        </FullWidthButton>
      </StyledFixedBottom>
    </>
  );
};

export default OrderConfirm;

const StyledCenterBox = styled.div`
  ${FlexColumn}
  ${FlexCenter}
  height: 100vh;
`;

const StyledTextTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const StyledTextBody = styled.p`
  font-size: 12px;
  margin: 0;
`;
const StyledTextSubTitle = styled.h2`
  font-size: 16px;
  margin: 0;
  margin-top: 24px;
`;
const StyledTextPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin: 10px;
`;
