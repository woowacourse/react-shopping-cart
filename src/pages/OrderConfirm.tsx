import { FlexCenter, FlexColumn } from "@/style/common.style";
import {
  orderedItemState,
  recipeState,
} from "@/store/selectors/recipeSelector";

import FullWidthButton from "@/components/common/Button/FullWidthButton";
import Header from "@/components/Header";
import { ORDER_CONFIRM_MESSAGE } from "@/constants/message";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";

const OrderConfirm = () => {
  const { totalPrice } = useRecoilValue(recipeState);
  const { itemCount, totalQuantity } = useRecoilValue(orderedItemState);

  return (
    <>
      <StyledFixedTop>
        <Header type="ArrowBack" />
      </StyledFixedTop>
      <StyledCenterBox>
        <StyledTextTitle>주문 확인</StyledTextTitle>

        <StyledTextBody>
          {ORDER_CONFIRM_MESSAGE.confirmOrder(itemCount, totalQuantity)}
        </StyledTextBody>
        <StyledTextBody> {ORDER_CONFIRM_MESSAGE.confirmPrice}</StyledTextBody>

        <StyledTextSubTitle>총 결제 금액</StyledTextSubTitle>
        <StyledTextPrice>
          {totalPrice.toLocaleString("ko-KR")}원
        </StyledTextPrice>
      </StyledCenterBox>

      <StyledFixedBottom>
        <FullWidthButton onClick={() => {}} disabled>
          결제하기
        </FullWidthButton>
      </StyledFixedBottom>
    </>
  );
};

export default OrderConfirm;

const StyledFixedTop = styled.div`
  width: 430px;
  position: fixed;
  top: 0;
`;

const StyledFixedBottom = styled.div`
  width: 430px;
  position: fixed;
  bottom: 0;
`;

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
