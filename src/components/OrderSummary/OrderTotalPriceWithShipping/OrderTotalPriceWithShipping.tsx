import * as Styled from "./OrderTotalPriceWithShipping.style";

interface OrderTotalPriceWithShippingProps {
  totalPriceWithShipping: number;
}

function OrderTotalPriceWithShipping({
  totalPriceWithShipping,
}: OrderTotalPriceWithShippingProps) {
  return (
    <Styled.TotalPriceWrapper>
      <Styled.TitleText>총 결제 금액</Styled.TitleText>
      <Styled.PriceText>
        {totalPriceWithShipping.toLocaleString()}원
      </Styled.PriceText>
    </Styled.TotalPriceWrapper>
  );
}

export default OrderTotalPriceWithShipping;
