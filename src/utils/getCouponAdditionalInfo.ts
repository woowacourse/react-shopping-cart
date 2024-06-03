import {
  BuyXgetYDiscountCoupon,
  Coupon,
  DiscountType,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from "../types";
import { formatPrice } from "./formatPrice";
import { formatTime } from "./formatTime";

export const getAdditionalInfo = (coupon: Coupon): string => {
  switch (coupon.discountType) {
    case DiscountType.Fixed: {
      const fixedCoupon = coupon as FixedDiscountCoupon;
      return `최소 주문 금액: ${formatPrice(fixedCoupon.minimumAmount)}원`;
    }
    case DiscountType.BuyXgetY: {
      const buyXgetYCoupon = coupon as BuyXgetYDiscountCoupon;
      return `${buyXgetYCoupon.buyQuantity}개 구매 시 ${buyXgetYCoupon.getQuantity}개 추가 증정`;
    }
    case DiscountType.FreeShipping: {
      const freeShippingCoupon = coupon as FreeShippingCoupon;
      return `최소 주문 금액: ${formatPrice(freeShippingCoupon.minimumAmount)}원`;
    }
    case DiscountType.Percentage: {
      const percentageCoupon = coupon as PercentageDiscountCoupon;
      return `사용 가능 시간: ${formatTime(percentageCoupon.availableTime?.start || "")}부터 ${formatTime(percentageCoupon.availableTime?.end || "")}까지`;
    }
    default:
      return "";
  }
};
