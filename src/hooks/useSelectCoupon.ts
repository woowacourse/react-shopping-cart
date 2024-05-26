import { useState } from 'react';

import { CouponCode } from '../components/type';

const useSelectCoupon = () => {
  const [couponSelected, setCouponSelected] = useState({
    FIXED5000: false,
    BOGO: false,
    FREESHIPPING: false,
    MIRACLESALE: false,
  });

  /**
   *
   * 두개의 쿠폰을 모두 선택했는지의 여부.
   * 2개의 쿠폰이 선택되고, 선택된 쿠폰이 아니라면 true return
   */
  const isDoubleCouponApplied = (couponCode: CouponCode) => {
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

  return { selectCoupon, couponSelected, isDoubleCouponApplied };
};

export default useSelectCoupon;
