import { useState } from 'react';

import { CouponCode } from '../components/type';

const useCheckCoupon = () => {
  const [couponSelected, setCouponSelected] = useState({
    FIXED5000: false,
    BOGO: false,
    FREESHIPPING: false,
    MIRACLESALE: false,
  });

  const haveDoubleCouponApplied = (couponCode: CouponCode) => {
    const isSelected = couponSelected[couponCode];
    const isDoubleSelected =
      Object.values(couponSelected).filter((selected) => selected).length >= 2;
    return isDoubleSelected && !isSelected;
  };

  const selectCoupon = (couponCode: CouponCode) => {
    setCouponSelected({
      ...couponSelected,
      [couponCode]: !couponSelected[couponCode],
    });
  };

  return { selectCoupon, couponSelected, haveDoubleCouponApplied };
};

export default useCheckCoupon;
