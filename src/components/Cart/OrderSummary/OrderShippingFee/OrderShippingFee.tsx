import * as Styled from "./OrderShippingFee.style";

interface OrderShippingFeeProps {
  shippingFee: number;
}

function OrderShippingFee({ shippingFee }: OrderShippingFeeProps) {
  return (
    <Styled.TextWrapper>
      <Styled.TitleText>배송비</Styled.TitleText>
      <Styled.PriceText>{shippingFee.toLocaleString()}원</Styled.PriceText>
    </Styled.TextWrapper>
  );
}

export default OrderShippingFee;
