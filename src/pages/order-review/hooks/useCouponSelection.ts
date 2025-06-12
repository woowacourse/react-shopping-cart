import { useState } from 'react';

export const useCouponSelection = ({
  initialCouponIds,
}: {
  initialCouponIds: number[];
}) => {
  const [selectedCouponIds, setSelectedCouponIds] = useState(initialCouponIds);

  const handleSelectCoupons = (newCoupons: number[]) => {
    setSelectedCouponIds(newCoupons);
  };

  return {
    selectedCouponIds,
    handleSelectCoupons,
  };
};
