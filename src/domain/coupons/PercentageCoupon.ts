import { CouponType } from "../../types/Coupon";
import Coupon from "./AbstractCoupon";

class PercentageCoupon extends Coupon {
  constructor(coupon: CouponType) {
    super(coupon);
  }

  public discountAmount({ amount }: { amount: number }): number {
    return this.data.discount ? Math.floor((amount / 100) * this.data.discount) : 0;
  }
}

export default PercentageCoupon;
