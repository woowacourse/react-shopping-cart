import * as Styled from "./OrderCouponDiscount.style";

interface OrderCouponDiscountProps {
  discountAmount: number;
}

function OrderCouponDiscount({ discountAmount }: OrderCouponDiscountProps) {
  return (
    <Styled.TextWrapper>
      <Styled.TitleText>쿠폰 할인 금액</Styled.TitleText>
      <Styled.PriceText>-{discountAmount.toLocaleString()}원</Styled.PriceText>
    </Styled.TextWrapper>
  );
}

export default OrderCouponDiscount;
