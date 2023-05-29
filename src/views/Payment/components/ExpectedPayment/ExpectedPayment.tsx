import { FlexWrapper } from '../../../../pages/Cart/Cart.style';
import { useCartTotalPrice } from '../../../../recoil/cart/withTotalPrice';
import {
  StylePayingBox,
  StylePayingDiv,
  StylePayingTitle,
  StyleContentText,
  StylePayingWrapper,
  StyleTotalContainer,
  StyleTotalText,
  PayingButton,
} from './ExpectedPayment.style';

function ExpectedPayment() {
  const { totalPrice } = useCartTotalPrice();
  const deliveryFee = totalPrice ? 3000 : 0;
  const totalPayingPrice = totalPrice + deliveryFee;
  return (
    <StylePayingWrapper>
      <StylePayingBox>
        <StylePayingDiv>
          <StylePayingTitle>결제 예상 금액</StylePayingTitle>
        </StylePayingDiv>
        <StylePayingDiv>
          <FlexWrapper>
            <StyleContentText>총 상품 가격</StyleContentText>
            <StyleContentText> {totalPrice.toLocaleString('ko-KR')}원</StyleContentText>
          </FlexWrapper>
          <FlexWrapper>
            <StyleContentText>총 배송비</StyleContentText>
            <StyleContentText>{deliveryFee.toLocaleString('ko-KR')}원</StyleContentText>
          </FlexWrapper>
          <StyleTotalContainer>
            <StyleTotalText>총 주문금액</StyleTotalText>
            <StyleTotalText>{totalPayingPrice.toLocaleString('ko-KR')}원</StyleTotalText>
          </StyleTotalContainer>
        </StylePayingDiv>
        <PayingButton disabled={totalPrice === 0}>결제하기</PayingButton>
      </StylePayingBox>
    </StylePayingWrapper>
  );
}

export default ExpectedPayment;
