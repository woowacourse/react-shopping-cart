import { useState } from "react";

const useAppliedCoupons = () => {
  const [appliedCouponIds, setSelectedIds] = useState<number[]>([]);

  const handleApplyCoupon = (ids: number[]) => {
    setSelectedIds(ids);
  };
  return { appliedCouponIds, handleApplyCoupon };
};

export default useAppliedCoupons;
