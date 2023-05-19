import * as Styled from './CartPriceBox.styles.tsx';

const CartPriceBox = () => {
  return (
    <Styled.CartPriceBoxWrapper>
      <Styled.CartPriceBoxContent>
        <Styled.CartPriceBoxContentTitle>결제예상금액</Styled.CartPriceBoxContentTitle>
        <Styled.CartPriceBoxDivider />
        <Styled.CartPriceTextWrapper>
          <Styled.PriceTextWrapper>
            <Styled.CartPriceText>총 상품가격</Styled.CartPriceText>
            <Styled.CartPriceText>21,700원</Styled.CartPriceText>
          </Styled.PriceTextWrapper>
          <Styled.PriceTextWrapper>
            <Styled.CartPriceText>총 배송비</Styled.CartPriceText>
            <Styled.CartPriceText>3,000원</Styled.CartPriceText>
          </Styled.PriceTextWrapper>
          <Styled.PriceTextWrapper>
            <Styled.CartPriceText>총 주문금액</Styled.CartPriceText>
            <Styled.CartPriceText>24,700원</Styled.CartPriceText>
          </Styled.PriceTextWrapper>
          <Styled.OrderButton>주문하기</Styled.OrderButton>
        </Styled.CartPriceTextWrapper>
      </Styled.CartPriceBoxContent>
    </Styled.CartPriceBoxWrapper>
  );
};

export default CartPriceBox;
