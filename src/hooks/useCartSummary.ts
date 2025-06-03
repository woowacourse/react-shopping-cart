import { CartItemType } from '../types/cartItem';
import { useMemo } from 'react';
import { calculateOrderAmount, calculateTotalQuantity } from '../components/CartItemList/calculate';
import { calculateDeliveryFee } from '../components/CartItemList/calculate';

interface CartSummary {
  orderAmount: number;
  deliveryFee: number;
  totalQuantity: number;
  totalAmount: number;
  countOfItemType: number;
}

export function useCartSummary(checkedItems: CartItemType[]): CartSummary {
  return useMemo(() => {
    const orderAmount = calculateOrderAmount(checkedItems);
    const deliveryFee = calculateDeliveryFee(orderAmount);
    const totalQuantity = calculateTotalQuantity(checkedItems);
    const totalAmount = orderAmount + deliveryFee;
    const countOfItemType = checkedItems.length;
    return { orderAmount, deliveryFee, totalQuantity, totalAmount, countOfItemType };
  }, [checkedItems]);
}
