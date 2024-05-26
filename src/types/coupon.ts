type ExpirationDate = string;
type MinimumAmount = number;
type AvailableTime = { start: string; end: string };
export type DiscountType = 'percentage' | 'freeShipping' | 'buyXgetY' | 'fixed';

interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: ExpirationDate;
  discountType: DiscountType;
}

interface PercentageCoupon extends Coupon {
  discount: number;
  minimumAmount: MinimumAmount;
}

interface BuyXGetYCoupon extends Coupon {
  buyQuantity: number;
  getQuantity: number;
}

interface FreeShippingCoupon extends Coupon {
  minimumAmount: MinimumAmount;
}

interface TimeCoupon extends Coupon {
  discount: number;
  availableTime: AvailableTime;
}

export type CouponType = PercentageCoupon &
  BuyXGetYCoupon &
  FreeShippingCoupon &
  TimeCoupon;
