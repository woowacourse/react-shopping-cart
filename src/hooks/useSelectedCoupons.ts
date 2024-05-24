import { useState } from 'react';
import useCouponCalculator from './useCouponCalculator';
import { Coupon } from '../types/Coupon.type';

const useSelectedCoupons = (initialCouponList: Coupon[]) => {
  const [selectedCoupons, setSelectedCoupons] = useState(initialCouponList);

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
