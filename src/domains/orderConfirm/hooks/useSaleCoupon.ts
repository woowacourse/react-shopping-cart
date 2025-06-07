import { useEffect, useState } from "react";
import { CouponCode, CouponType } from "../types/coupon";
import { getCouponItems } from "../api/coupon";
import {
  validateDate,
  validateMinimumAmount,
  validateTime,
} from "./utils/vaildateCoupons";

// 오늘 날짜, 오늘 시간, 총 결제 금액, selectedCartIds, 배송비

export function useSaleCoupon() {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponCode[]>([]);
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  const today = new Date();

  const validateCoupon = (
    e: React.ChangeEvent<HTMLInputElement>,
    totalPrice: number
  ) => {
    const couponItem = coupons.find(
      (item) => item.code === (e.target.id as CouponCode)
    );
    if (!couponItem) return false;

    return (
      validateDate(couponItem.expirationDate, today) &&
      (!couponItem.availableTime ||
        validateTime(couponItem.availableTime, today)) &&
      (!couponItem.minimumAmount ||
        validateMinimumAmount(couponItem.minimumAmount, totalPrice))
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
