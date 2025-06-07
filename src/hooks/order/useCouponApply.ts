import { CartItem } from "../../types/cartItem";
import { CouponResponse } from "../../types/coupon";
import { useState, useEffect } from "react";
import createTodayTime from "../../utils/\bcoupon/createTodayTime";

interface useCouponApplyParams {
  cartItems: CartItem[];
  orderPrice: number;
  coupons: CouponResponse[];
}

interface AvailableCouponType {
  code: string;
  discountAmount: number;
  selected: boolean;
}

const useCouponApply = ({ cartItems, orderPrice, coupons }: useCouponApplyParams) => {
  const [availableCoupons, setAvailableCoupons] = useState<AvailableCouponType[]>([]);

  const validateCouponDate = (coupon: CouponResponse): boolean => {
    const now = new Date();
    const expirationDate = new Date(coupon.expirationDate);
    return now <= expirationDate;
  };

  const validateMinimumAmount = (coupon: CouponResponse): boolean => {
    if (!coupon.minimumAmount) return true;
    return orderPrice >= coupon.minimumAmount;
  };

  const validateBuyQuantity = (coupon: CouponResponse): boolean => {
    if (!coupon.buyQuantity || !coupon.getQuantity) return true;
    return cartItems.some((item) => item.quantity >= coupon.buyQuantity! + coupon.getQuantity!);
  };

  const validateAvailableTime = (coupon: CouponResponse): boolean => {
    if (!coupon.availableTime) return true;

    const now = new Date();
    const start = createTodayTime(coupon.availableTime.start);
    const end = createTodayTime(coupon.availableTime.end);

    return now >= start && now <= end;
  };

  const calculateDiscount = (coupon: CouponResponse): number => {
    switch (coupon.discountType) {
      case "percentage": {
        if (!coupon.discount) return 0;
        return orderPrice * (coupon.discount / 100);
      }
      case "fixed": {
        return coupon.discount || 0;
      }
      case "freeShipping": {
        return 0; // 배송비 우선 제외
      }
      case "buyXgetY": {
        if (!coupon.buyQuantity || !coupon.getQuantity) return 0;

        const eligibleItems = cartItems
          .filter((item) => item.quantity >= coupon.buyQuantity! + coupon.getQuantity!)
          .map((item) => item.product.price * coupon.getQuantity!)
          .sort((a, b) => b - a);

        return eligibleItems.length > 0 ? eligibleItems[0] : 0;
      }
      default:
        return 0;
    }
  };

  const availableCouponsWithDiscount = coupons
    .filter(
      (coupon) =>
        validateCouponDate(coupon) &&
        validateMinimumAmount(coupon) &&
        validateBuyQuantity(coupon) &&
        validateAvailableTime(coupon),
    )
    .map((coupon) => ({
      code: coupon.code,
      discountAmount: calculateDiscount(coupon),
      selected: false,
    }))
    .sort((a, b) => b.discountAmount - a.discountAmount);

  const toggleCoupon = (couponCode: string) => {
    setAvailableCoupons((prev) => {
      const selectedCount = prev.filter((coupon) => coupon.selected).length;
      return prev.map((coupon) => {
        if (coupon.code === couponCode) {
          if (coupon.selected) {
            return { ...coupon, selected: false };
          } else if (selectedCount < 2) {
            return { ...coupon, selected: true };
          }
        }
        return coupon;
      });
    });
  };

  const discountPrice = availableCoupons
    .filter((coupon) => coupon.selected)
    .reduce((sum, coupon) => sum + coupon.discountAmount, 0);

  useEffect(() => {
    if (availableCouponsWithDiscount.length === 0) return;
    const initialCoupons = availableCouponsWithDiscount.map((coupon, index) => ({
      ...coupon,
      selected: index < 2,
    }));
    setAvailableCoupons(initialCoupons);
  }, [coupons]);

  return {
    availableCoupons,
    discountPrice,
    toggleCoupon,
  };
};

export default useCouponApply;
