import { useState } from 'react';
import useCouponCalculator from './useCouponCalculator';
import { Coupon } from '../types/Coupon.type';

const useSelectedCoupons = (couponList: Coupon[], initialCouponIds: number[] = []) => {
  const [selectedCoupons, setSelectedCoupons] = useState(
    couponList.filter((coupon) => initialCouponIds.includes(coupon.id)),
  );

  const { calculateTotalDiscountPrice } = useCouponCalculator();

  const handleSelectedCoupons = (newCoupon: Coupon) => {
    const isSelected = selectedCoupons.some((coupon) => coupon.id === newCoupon.id);

    const newSelectedCoupons = isSelected
      ? selectedCoupons.filter((coupon) => coupon.id !== newCoupon.id)
      : [...selectedCoupons, newCoupon];

    setSelectedCoupons(newSelectedCoupons);
  };

  return { selectedCoupons, totalDiscountPrice: calculateTotalDiscountPrice(selectedCoupons), handleSelectedCoupons };
};

export default useSelectedCoupons;
