import { useCartTotalPriceReadOnly } from '../../hooks/cartListState/cartListState';
import { FlexWrapper } from '../../pages/Cart/Cart.style';
import {
  StylePayingWrapper,
  StylePayingDiv,
  StylePayingTitle,
  StyleContentText,
  StyleWrapper,
  StyleTotalContainer,
  StyleTotalText,
  PayingButton,
} from './PayingContainer.style';

function PayingContainer() {
  const { totalPriceReadOnly } = useCartTotalPriceReadOnly();
  const deliveryFee = 3000;
  const totalPayingPrice = totalPriceReadOnly + deliveryFee;
  return (
    <StyleWrapper>
      <StylePayingWrapper>
        <StylePayingDiv>
          <StylePayingTitle>결제 예상 금액</StylePayingTitle>
        </StylePayingDiv>
        <StylePayingDiv>
          <FlexWrapper>
            <StyleContentText>총 상품 가격</StyleContentText>
            <StyleContentText> {totalPriceReadOnly.toLocaleString('ko-KR')}원</StyleContentText>
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
        <PayingButton>결제하기</PayingButton>
      </StylePayingWrapper>
    </StyleWrapper>
  );
}

export default PayingContainer;
