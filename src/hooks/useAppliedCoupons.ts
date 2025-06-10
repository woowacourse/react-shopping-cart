import { useState } from "react";

const MAX_COUPON_COUNT = 2;

const useAppliedCoupons = () => {
  const [appliedCouponIds, setSelectedIds] = useState<number[]>([]);

  const handleApplyCoupon = (id: number) => {
    const isSelected = appliedCouponIds.includes(id);

    if (!isSelected && appliedCouponIds.length >= MAX_COUPON_COUNT) {
      alert(`쿠폰은 ${MAX_COUPON_COUNT}개만 선택할 수 있습니다.`);
      return;
    }

    setSelectedIds((prev) =>
      isSelected ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };
  return { appliedCouponIds, handleApplyCoupon };
};

export default useAppliedCoupons;
