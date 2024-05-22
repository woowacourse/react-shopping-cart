import { useState } from 'react';
import { Coupon } from '../types/Coupon.type';

const useSelectedCoupons = (initialCoupons: Coupon[] = []) => {
  const [selectedCoupons, setSelectedCoupons] = useState(initialCoupons);

  const handleSelectedCoupons = (newCoupon: Coupon) => {
    const isSelected = selectedCoupons.some((coupon) => coupon.id === newCoupon.id);

    const newSelectedCoupons = isSelected
      ? selectedCoupons.filter((coupon) => coupon.id !== newCoupon.id)
      : [...selectedCoupons, newCoupon];

    setSelectedCoupons(newSelectedCoupons);
  };

  return { selectedCoupons, handleSelectedCoupons };
};

export default useSelectedCoupons;
