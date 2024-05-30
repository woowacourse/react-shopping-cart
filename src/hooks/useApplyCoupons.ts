import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { appliedCouponIdsState } from '../recoil/atoms';

export default function useApplyCoupons() {
  const [appliedCouponIds, setAppliedCouponIds] = useRecoilState(appliedCouponIdsState);
  const [checkedCouponIds, setCheckedCouponIds] = useState(appliedCouponIds);

  const updateAppliedCoupons = () => {
    setAppliedCouponIds([...checkedCouponIds]);
  };

  const onCheckCoupon = (id: number, isChecked: boolean) => {
    const newCheckedCouponIds = isChecked
      ? [...checkedCouponIds, id]
      : [...checkedCouponIds].filter((couponId) => couponId !== id);
    setCheckedCouponIds(newCheckedCouponIds);
  };

  const resetCheckedCouponIds = () => {
    setCheckedCouponIds(appliedCouponIds);
  };

  return {
    checkedCouponIds,
    resetCheckedCouponIds,
    onCheckCoupon,
    updateAppliedCoupons,
  };
}
