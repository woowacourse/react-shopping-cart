import { useState } from "react";

const MAX_COUPON_COUNT = 2;

const useSelectedCoupon = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectCoupon = (id: number) => {
    const isSelected = selectedIds.includes(id);

    if (!isSelected && selectedIds.length >= MAX_COUPON_COUNT) {
      alert(`쿠폰은 ${MAX_COUPON_COUNT}개만 선택할 수 있습니다.`);
      return;
    }

    setSelectedIds((prev) =>
      isSelected ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };
  return { selectedIds, handleSelectCoupon };
};

export default useSelectedCoupon;
