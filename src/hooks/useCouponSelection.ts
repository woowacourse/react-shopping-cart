import { useState } from 'react';
import { Coupon } from '../types';

interface useCouponSelectionProps {
  coupons: Coupon[];
  maxCoupons: number;
  onExceed: () => void;
  calculatePrice: (couponSelectionCandidate: Coupon[]) => void;
}

export function useCouponSelection({
  coupons,
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

    const selectedCoupons = coupons.filter((e) =>
      order.includes(e.id.toString())
    );
    const forwardPrice = calculatePrice(selectedCoupons);

    const reversed = [...order].reverse();
    const selectedCouponsReverse = coupons.filter((e) =>
      reversed.includes(e.id.toString())
    );
    const reversePrice = calculatePrice(selectedCouponsReverse);

    setSelectedCouponIds(forwardPrice <= reversePrice ? reversed : order);
  };

  const selectedCoupons = coupons.filter((e) =>
    selectedCouponIds.includes(e.id.toString())
  );

  return { selectedCouponIds, toggleCouponId, selectedCoupons };
}
