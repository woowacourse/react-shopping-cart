import * as Styled from "./OrderTotalPrice.style";

interface OrderTotalPriceProps {
  totalPrice: number;
}

function OrderTotalPrice({ totalPrice }: OrderTotalPriceProps) {
  return (
    <Styled.TextWrapper>
      <Styled.TitleText>주문 금액</Styled.TitleText>
      <Styled.PriceText>{totalPrice.toLocaleString()}원</Styled.PriceText>
    </Styled.TextWrapper>
  );
}

export default OrderTotalPrice;
