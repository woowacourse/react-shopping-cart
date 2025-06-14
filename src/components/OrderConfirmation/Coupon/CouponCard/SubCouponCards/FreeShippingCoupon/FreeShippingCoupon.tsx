import * as Styled from "./FreeShippingCoupon.style";
import type { FreeShippingCoupon as FreeShippingCouponType } from "../../../../../../type/Coupons";

interface FreeShippingCouponProps {
  coupon: FreeShippingCouponType;
}

function FreeShippingCoupon({ coupon }: FreeShippingCouponProps) {
  const { minimumAmount } = coupon;
  return (
    <Styled.Text>
      최소 주문 금액: {minimumAmount.toLocaleString()}원
    </Styled.Text>
  );
}

export default FreeShippingCoupon;
