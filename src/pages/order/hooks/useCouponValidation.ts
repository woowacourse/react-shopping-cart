import { CartItem } from "../../../types/cartItem";
import { CouponResponse } from "../../../types/coupon";
import validation from "../utils/coupon/validation";

interface UseCouponValidationParams {
  cartItems: CartItem[];
  orderPrice: number;
  coupons: CouponResponse[];
}

const useCouponValidation = ({ cartItems, orderPrice, coupons }: UseCouponValidationParams) => {
  const validateCoupon = (coupon: CouponResponse): boolean => {
    // 유효한 날짜
    const isExpired = validation.expirationDate(coupon.expirationDate);

    // 최소 주문금액
    const hasMinimumAmount = validation.minimumAmount(orderPrice, coupon.minimumAmount ?? null);

    // 최소 주문 갯수
    const hasBuyQuantity = cartItems.some((item) =>
      validation.buyQuantity(item.quantity, coupon.buyQuantity ?? null, coupon.getQuantity ?? null),
    );

    // 가능한 시간 타임
    const isAvailableTime = validation.availableTime(
      coupon.availableTime?.start ?? null,
      coupon.availableTime?.end ?? null,
    );

    return isExpired && hasMinimumAmount && hasBuyQuantity && isAvailableTime;
  };

  return coupons.filter(validateCoupon);
};

export default useCouponValidation;
