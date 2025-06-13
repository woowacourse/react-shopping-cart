import { useState, useMemo } from 'react';
import { Content } from '../types/cartItems';
import { CouponsResponse } from '../types/coupons';

export function useOrderSelections(selectedItems: Content[]) {
  const [isIslandChecked, setIsIslandChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState<CouponsResponse[]>([]);

  const selectedItemIds = useMemo(() => selectedItems.map((item) => item.id), [selectedItems]);

  return {
    isIslandChecked,
    setIsIslandChecked,
    isModalOpen,
    setIsModalOpen,
    selectedCoupons,
    setSelectedCoupons,
    selectedItemIds,
  };
}
