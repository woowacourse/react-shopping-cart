import type { CartItem } from "../../../../shared/types/cartItem";
import type { CouponResponse } from "../../../../shared/types/coupon";
import validation from "./validation";

interface ValidateCouponParams {
  cartItems: CartItem[];
  orderPrice: number;
  coupons: CouponResponse[];
}

export const validateCoupon = ({ cartItems, orderPrice, coupons }: ValidateCouponParams): CouponResponse[] => {
  return coupons.filter((coupon) => {
    const isValidExpiration = validation.expirationDate(coupon.expirationDate);
    const isValidMinimumAmount = validation.minimumAmount(orderPrice, coupon.minimumAmount ?? null);
    const isValidAvailableTime = validation.availableTime(
      coupon.availableTime?.start ?? null,
      coupon.availableTime?.end ?? null,
    );
    const isValidBuyQuantity = validation.buyQuantity(
      cartItems.length,
      coupon.buyQuantity ?? null,
      coupon.getQuantity ?? null,
    );

    return isValidExpiration && isValidMinimumAmount && isValidAvailableTime && isValidBuyQuantity;
  });
};
