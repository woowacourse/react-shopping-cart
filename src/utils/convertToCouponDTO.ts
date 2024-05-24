import { CouponInstances } from "../domain/coupons/AbstractCoupon";
import BuyXgetYCoupon from "../domain/coupons/BuyXgetYCoupon";
import FixedCoupon from "../domain/coupons/FixedCoupon";
import FreeShippingCoupon from "../domain/coupons/FreeShippingCoupon";
import { CouponType } from "../types/Coupon";

const convertToCouponDTO = (coupons: CouponType[]): CouponInstances[] => {
  return coupons.map((coupon) => {
    switch (coupon.discountType) {
      case "fixed":
        return new FixedCoupon(coupon);
      case "buyXgetY":
        return new BuyXgetYCoupon(coupon);
      case "freeShipping":
        return new FreeShippingCoupon(coupon);
      case "percentage":
        return new FreeShippingCoupon(coupon);
    }
  });
};

export default convertToCouponDTO;
