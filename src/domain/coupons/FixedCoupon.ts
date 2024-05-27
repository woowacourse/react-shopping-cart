import { CouponType } from "../../types/Coupon";
import Coupon from "./AbstractCoupon";

class FixedCoupon extends Coupon {
  constructor(coupon: CouponType) {
    super(coupon);
  }

  public discountAmount(): number {
    return this.data.discount || 0;
  }
}

export default FixedCoupon;
