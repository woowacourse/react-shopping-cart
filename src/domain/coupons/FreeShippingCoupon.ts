import { CouponType } from "../../types/Coupon";
import Coupon from "./AbstractCoupon";

class FreeShippingCoupon extends Coupon {
  constructor(coupon: CouponType) {
    super(coupon);
  }

  public discountAmount({ shippingFee }: { shippingFee: number }) {
    return shippingFee;
  }
}

export default FreeShippingCoupon;
