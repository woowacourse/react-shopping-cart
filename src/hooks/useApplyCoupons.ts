import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { appliedCouponIdsState } from '../recoil/atoms';

export default function useApplyCoupons() {
  const [appliedCouponIds, setAppliedCouponIds] = useRecoilState(appliedCouponIdsState);
  const [checkedCouponIds, setCheckedCouponIds] = useState(appliedCouponIds);

  const isCheckedCoupon = (id: number) => appliedCouponIds.includes(id);

  const isReachedApplicableLimit = checkedCouponIds.length >= 2;

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
    isCheckedCoupon,
    checkedCouponIds,
    resetCheckedCouponIds,
    onCheckCoupon,
    updateAppliedCoupons,
    isReachedApplicableLimit,
  };
}
