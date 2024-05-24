import { CouponType } from "../../types/Coupon";
import Coupon from "./AbstractCoupon";

class PercentageCoupon extends Coupon {
  constructor(coupon: CouponType) {
    super(coupon);
  }

  public discountAmount(amount: number): number {
    return this.data.discount ? amount / this.data.discount : 0;
  }
}

export default PercentageCoupon;
