import * as Styled from "./FixedDiscountCoupon.style";
import type { FixedDiscountCoupon as FixedDiscountCouponType } from "../../../../../../type/Coupons";

interface FixedDiscountCouponProps {
  coupon: FixedDiscountCouponType;
}

function FixedDiscountCoupon({ coupon }: FixedDiscountCouponProps) {
  const { minimumAmount } = coupon;

  return (
    <Styled.Text>
      최소 주문 금액: {minimumAmount.toLocaleString()}원
    </Styled.Text>
  );
}

export default FixedDiscountCoupon;
