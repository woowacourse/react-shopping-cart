import { Cart } from "../../../../../../api/cart";
import { Coupon } from "../../../../../../api/coupon";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function isCouponAvailable(
  coupon: Coupon,
  totalCartPrice: number,
  selectedCartItems: Cart[] | undefined
): boolean {
  switch (coupon.discountType) {
    case "fixed":
    case "freeShipping":
      return totalCartPrice >= coupon.minimumAmount;
    case "buyXgetY":
      return (selectedCartItems ?? []).some(
        (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
      );
    case "percentage":
      if (coupon.availableTime) {
        const now = new Date();
        const currentHour = now.getHours();
        const startHour = parseInt(coupon.availableTime.start);
        const endHour = parseInt(coupon.availableTime.end);
        return currentHour >= startHour && currentHour < endHour;
      }
      return true;
    default:
      return false;
  }
}

export function validateCoupon(
  coupon: Coupon,
  totalCartPrice: number,
  cartItems: Cart[] | undefined
): ValidationResult {
  const now = new Date();
  const expirationDate = new Date(
    coupon.expirationDate[0],
    coupon.expirationDate[1] - 1,
    coupon.expirationDate[2]
  );

  if (now > expirationDate) {
    return {
      isValid: false,
      message: "만료된 쿠폰입니다.",
    };
  }

  switch (coupon.discountType) {
    case "fixed":
    case "freeShipping":
      if (totalCartPrice < coupon.minimumAmount) {
        return {
          isValid: false,
          message: `최소 주문 금액 ${coupon.minimumAmount.toLocaleString()}원 이상 구매 시 사용 가능합니다.`,
        };
      }
      break;

    case "buyXgetY":
      if (cartItems) {
        const hasEligibleItems = cartItems.some(
          (item) => item.quantity >= coupon.buyQuantity
        );
        if (!hasEligibleItems) {
          return {
            isValid: false,
            message: `동일 상품 ${coupon.buyQuantity}개 이상 구매 시 사용 가능합니다.`,
          };
        }
      }
      break;

    case "percentage":
      if (coupon.availableTime) {
        const currentHour = now.getHours();
        const startHour = parseInt(coupon.availableTime.start);
        const endHour = parseInt(coupon.availableTime.end);

        if (currentHour < startHour || currentHour >= endHour) {
          return {
            isValid: false,
            message: `사용 가능 시간: ${startHour}시 ~ ${endHour}시`,
          };
        }
      }
      break;
  }

  return { isValid: true };
}
