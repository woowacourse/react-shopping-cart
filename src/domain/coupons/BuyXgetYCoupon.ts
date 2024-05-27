import { CouponType } from "../../types/Coupon";
import { CartItemQuantityAndPrice } from "../../types/ShoppingCart";
import Coupon from "./AbstractCoupon";

// X개 구매 시 Y개를 증정하는 쿠폰
// ex) 2 + 1 쿠폰 (2개 사면 1개 공짜)
class BuyXgetYCoupon extends Coupon {
  constructor(coupon: CouponType) {
    super(coupon);
  }

  public discountAmount({ itemInfo }: { itemInfo: CartItemQuantityAndPrice[] }): number {
    if (!this.data.buyQuantity || !this.data.getQuantity) return 0;

    return itemInfo.reduce((acc, cur) => {
      if (cur.quantity <= this.data.buyQuantity!) return acc;

      const discountItemCount = Math.min(cur.quantity - this.data.buyQuantity!, this.data.getQuantity!);
      const discountAmount = cur.price * discountItemCount;

      return Math.max(acc, discountAmount);
    }, 0);
  }
}

export default BuyXgetYCoupon;
