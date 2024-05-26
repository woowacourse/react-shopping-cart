import { Coupon } from '@type/coupon';
import { useState } from 'react';

const useApplyCoupons = () => {
  const [applyingCoupons, setApplyingCoupons] = useState<Coupon[]>([]);
  const isAlreadyApplyingMaximumCoupons = applyingCoupons.length >= 2;

  const changeApplying = (coupon: Coupon) => {
    const alreadyExist = applyingCoupons.find(applying => applying.id === coupon.id) !== undefined;

    if (alreadyExist) {
      setApplyingCoupons(prev => prev.filter(applying => applying.id !== coupon.id));
    } else {
      setApplyingCoupons(prev => [...prev, coupon]);
    }
  };

  const isSelected = (coupon: Coupon) => {
    return applyingCoupons.find(applying => applying.id === coupon.id) !== undefined;
  };

  return {
    applyingCoupons,
    changeApplying,
    isSelected,
    isAlreadyApplyingMaximumCoupons,
  };
};

export default useApplyCoupons;
