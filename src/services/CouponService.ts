import { CartItem, Coupon } from "@/types";
import CartItemService from "./CartItemService";

export default class CouponService {
  constructor(private readonly cartItems: CartItem[]) {}

  canAdjustCoupon(coupon: Coupon) {
    if (coupon.discountType === "fixed" || coupon.discountType === "freeShipping") {
      const totalPrice = CartItemService.calculateTotalPrice(this.cartItems);
      return totalPrice >= coupon.minimumAmount;
    }

    if (coupon.discountType === "percentage") {
      const currentTime = new Date();
      const couponStartTime = new Date(coupon.availableTime.start);
      const couponEndTime = new Date(coupon.availableTime.end);

      return currentTime >= couponStartTime && currentTime <= couponEndTime;
    }

    if (coupon.discountType === "buyXgetY") {
      const moreThanBuyQuantity = this.cartItems.filter((item) => item.quantity >= coupon.buyQuantity);
      if (!moreThanBuyQuantity) return false;

      const mostExpensiveItem = moreThanBuyQuantity.sort((a, b) => b.product.price - a.product.price).at(0);

      return mostExpensiveItem;
    }
  }
}
