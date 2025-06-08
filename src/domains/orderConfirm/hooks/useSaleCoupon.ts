import { useEffect, useState } from "react";
import { CouponCode, CouponType } from "../types/coupon";
import { getCouponItems } from "../api/coupon";
import {
  validateDate,
  validateMinimumAmount,
  validateTime,
} from "./utils/validateCoupons";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";

export function useSaleCoupon() {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponCode[]>([]);
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  const today = new Date();

  const validateCoupon = (
    couponCode: CouponCode,
    orderPrice: number,
    selectedCartItems: CartItemTypes[]
  ) => {
    const couponItem = coupons.find((item) => item.code === couponCode);
    if (!couponItem) return false;

    if (couponItem.code === "BOGO" && selectedCartItems.length === 0)
      return false;

    return (
      validateDate({ expirationDate: couponItem.expirationDate, today }) &&
      (!couponItem.availableTime ||
        validateTime({ availableTime: couponItem.availableTime, today })) &&
      (!couponItem.minimumAmount ||
        validateMinimumAmount({
          minimumAmount: couponItem.minimumAmount,
          orderPrice,
        }))
    );
  };

  const handleCouponSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const couponCode = e.target.id as CouponCode;

    setSelectedCoupons((prev) => {
      if (prev.includes(couponCode))
        return prev.filter((id) => id !== couponCode);
      if (prev.length < 2) {
        return [...prev, couponCode];
      }
      return prev;
    });
  };

  useEffect(() => {
    (async () => {
      const data = await getCouponItems();
      setCoupons(data);
    })();
  }, []);

  return {
    handleCouponSelect,
    validateCoupon,
    selectedCoupons,
    coupons,
  };
}
