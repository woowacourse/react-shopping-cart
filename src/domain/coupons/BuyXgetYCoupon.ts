import { CouponType } from "../../types/Coupon";
import { CartItemQuantityAndPrice } from "../../types/ShoppingCart";
import Coupon from "./AbstractCoupon";

class BuyXgetYCoupon extends Coupon {
  constructor(coupon: CouponType) {
    super(coupon);
  }

  public discountAmount(amount: number, shippingFee: number, itemInfo: CartItemQuantityAndPrice[]): number {
    if (!this.data.buyQuantity || !this.data.getQuantity) return 0;

    return itemInfo.reduce((acc, cur) => {
      if (cur.quantity >= this.data.buyQuantity!) return acc;

      const discountItemCount = Math.max(cur.quantity - this.data.buyQuantity!, this.data.getQuantity!);
      const discountAmount = cur.price * discountItemCount;

      return Math.max(acc, discountAmount);
    }, 0);
  }
}

export default BuyXgetYCoupon;
