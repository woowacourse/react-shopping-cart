import { useState, useMemo } from 'react';
import { Content } from '../types/cartItems';
import { CouponsResponse } from '../types/coupons';
import { calculateDiscountAndTotalPrice, calculateOrderPriceAndShipping } from '../utils/orderCalculate';

export function useOrderConfirm(selectedItems: Content[]) {
  const [isIslandChecked, setIsIslandChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState<CouponsResponse[]>([]);

  const selectedItemIds = useMemo(() => selectedItems.map((item) => item.id), [selectedItems]);

  const { orderPrice, shippingFee, orderTotalPrice, totalQuantity } = useMemo(
    () => calculateOrderPriceAndShipping(selectedItems, isIslandChecked),
    [selectedItems, isIslandChecked]
  );

  const { totalDiscount, totalPrice } = useMemo(
    () => calculateDiscountAndTotalPrice(selectedCoupons, selectedItems, orderPrice, shippingFee),
    [selectedCoupons, selectedItems, orderPrice, shippingFee]
  );

  return {
    isIslandChecked,
    setIsIslandChecked,
    isModalOpen,
    setIsModalOpen,
    selectedCoupons,
    setSelectedCoupons,
    selectedItemIds,
    orderPrice,
    shippingFee,
    orderTotalPrice,
    totalQuantity,
    totalDiscount,
    totalPrice,
  };
}
