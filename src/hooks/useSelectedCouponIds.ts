import { useState } from "react";
import { MAX_COUPON_COUNT } from "../pages/OrderConfirm/constant";

const useSelectedCouponIds = () => {
  const [selectedCouponIds, setselectedCouponIds] = useState<number[]>([]);
  const handleSelectCoupon = (id: number) => {
    const isSelected = selectedCouponIds.includes(id);

    if (!isSelected && selectedCouponIds.length >= MAX_COUPON_COUNT) {
      alert(`쿠폰은 ${MAX_COUPON_COUNT}개만 선택할 수 있습니다.`);
      return;
    }

    setselectedCouponIds((prev) =>
      isSelected ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };
  return { selectedCouponIds, handleSelectCoupon };
};

export default useSelectedCouponIds;
