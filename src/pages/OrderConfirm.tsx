import { FlexCenter, FlexColumn } from '@/style/common.style';
import {
  orderedItemState,
  recipeState,
} from '@/store/selectors/recipeSelector';

import FullWidthButton from '@/components/Button/FullWidthButton';
import Header from '@/components/Header';
import { ORDER_CONFIRM_MESSAGE } from '@/constants/message';
import { StyledFixedBottom } from '@/style/styledBox.style';
import { StyledFixedTop } from '../style/styledBox.style';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const OrderConfirm = () => {
  const navigator = useNavigate();
  const { totalPrice } = useRecoilValue(recipeState);
  const { itemCount, totalQuantity } = useRecoilValue(orderedItemState);

  return (
    <>
      <StyledFixedTop>
        <Header type="ArrowBack" navigatePath={'/order'} />
      </StyledFixedTop>
      <StyledCenterBox>
        <StyledTextTitle>주문 확인</StyledTextTitle>

        <StyledTextBody>
          {ORDER_CONFIRM_MESSAGE.confirmOrder(itemCount, totalQuantity)}
        </StyledTextBody>
        <StyledTextBody> {ORDER_CONFIRM_MESSAGE.confirmPrice}</StyledTextBody>

        <StyledTextSubTitle>총 결제 금액</StyledTextSubTitle>
        <StyledTextPrice>
          {totalPrice.toLocaleString('ko-KR')}원
        </StyledTextPrice>
      </StyledCenterBox>

      <StyledFixedBottom>
        <FullWidthButton
          onClick={() => {
            navigator('/');
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
