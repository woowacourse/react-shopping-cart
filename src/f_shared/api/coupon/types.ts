export type CouponsResponse = Coupon[];

export type Coupon = FixedDiscountCoupon | BuyXGetYCoupon | FreeShippingCoupon | PercentageDiscountCoupon;

interface CouponCommon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: DiscountType;
}

type DiscountType = 'fixed' | 'buyXGetY' | 'freeShipping' | 'percentage';

interface FixedDiscountCoupon extends CouponCommon {
  pattern: Date;
  discount: number;
  minimumAmount: number;
}
interface BuyXGetYCoupon extends CouponCommon {
  pattern: Date;
  buyQuantity: number;
  getQuantity: number;
}
interface FreeShippingCoupon extends CouponCommon {
  pattern: Date;
  minimumAmount: number;
}
interface PercentageDiscountCoupon extends CouponCommon {
  pattern: Date;
  discount: number;
  availableTime: AvailableTime;
}

interface AvailableTime {
  start: string;
  end: string;
}
