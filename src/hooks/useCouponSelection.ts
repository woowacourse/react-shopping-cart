import { useState } from 'react';

interface useCouponSelectionProps {
  maxCoupons: number;
  onExceed: () => void;
  calculatePrice: (couponIds: string[]) => void;
}

export function useCouponSelection({
  maxCoupons,
  onExceed,
  calculatePrice,
}: useCouponSelectionProps) {
  const [selectedCouponIds, setSelectedCouponIds] = useState<string[]>([]);

  const toggleCouponId = (id: string) => {
    let order: string[];

    if (selectedCouponIds.includes(id)) {
      order = selectedCouponIds.filter((e) => e !== id);
    } else {
      if (selectedCouponIds.length >= maxCoupons) {
        onExceed?.();
        return;
      }
      order = [...selectedCouponIds, id];
    }

    const forwardPrice = calculatePrice(order);
    const reversed = [...order].reverse();
    const reversePrice = calculatePrice(reversed);
    setSelectedCouponIds(forwardPrice <= reversePrice ? reversed : order);
  };

  return { selectedCouponIds, toggleCouponId };
}
