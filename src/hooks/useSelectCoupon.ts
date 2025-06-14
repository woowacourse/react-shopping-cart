import { useState } from 'react';

function useSelectCoupon() {
  const [selectedCoupon, setSelectedCoupon] = useState<Set<string>>(new Set());

  const handleSelectCoupon = (code: string) => {
    if (selectedCoupon.has(code)) {
      setSelectedCoupon((prev) => {
        const newSet = new Set(prev);
        newSet.delete(code);
        return newSet;
      });
    } else {
      if (selectedCoupon.size >= 2) {
        alert('최대 2개의 쿠폰을 선택할 수 있습니다.');
        return;
      }
      setSelectedCoupon((prev) => {
        const newSet = new Set(prev);
        newSet.add(code);
        return newSet;
      });
    }
  };

  return { selectedCoupon, handleSelectCoupon };
}

export default useSelectCoupon;
