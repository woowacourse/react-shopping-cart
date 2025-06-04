import { CartItem, Coupon } from "@/types";
import CartItemService from "../CartItemService/CartItemService";
import { getTime } from "@/utils/time";

export default class CouponService {
  private readonly cartItemService: CartItemService;

  constructor(private readonly cartItems: CartItem[]) {
    this.cartItemService = new CartItemService(this.cartItems);
  }

  canAdjustCoupon(coupon: Coupon) {
    if (coupon.discountType === "fixed" || coupon.discountType === "freeShipping") {
      const totalPrice = this.cartItemService.calculateTotalPrice();
      return totalPrice >= coupon.minimumAmount;
    }

    if (coupon.discountType === "percentage") {
      const currentTime = new Date();
      const couponStartTime = getTime(coupon.availableTime.start);
      const couponEndTime = getTime(coupon.availableTime.end);

      return (
        currentTime.getHours() >= couponStartTime.hour &&
        currentTime.getHours() <= couponEndTime.hour &&
        currentTime.getMinutes() >= couponStartTime.minute &&
        currentTime.getMinutes() <= couponEndTime.minute &&
        currentTime.getSeconds() >= couponStartTime.second &&
        currentTime.getSeconds() <= couponEndTime.second
      );
    }

    if (coupon.discountType === "buyXgetY") {
      const moreThanBuyQuantity = this.cartItems.filter((item) => item.quantity >= coupon.buyQuantity);
      return moreThanBuyQuantity.length > 0;
    }
  }

  calculateDiscountPrice(coupon: Coupon, isFar: boolean): number {
    if (coupon.discountType === "fixed") {
      return coupon.discount;
    }

    if (coupon.discountType === "buyXgetY") {
      const mostExpensiveItem = this.cartItems.sort((a, b) => b.product.price - a.product.price).at(0);
      if (!mostExpensiveItem) return 0;

      return mostExpensiveItem.product.price * coupon.getQuantity;
    }

    if (coupon.discountType === "freeShipping") {
      return this.cartItemService.calculateDeliveryFee(isFar);
    }

    if (coupon.discountType === "percentage") {
      return (this.cartItemService.calculateTotalPrice() * coupon.discount) / 100;
    }

    return 0;
  }
}
