import { useMemo } from 'react';
import { Content } from '../types/cartItems';
import { calculateOrderPriceAndShipping } from '../utils/orderCalculate';

export function useOrderPrice(selectedItems: Content[], isIslandChecked: boolean) {
  return useMemo(() => {
    return calculateOrderPriceAndShipping(selectedItems, isIslandChecked);
  }, [selectedItems, isIslandChecked]);
}
