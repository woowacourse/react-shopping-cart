import { FREE_DELIVERY_THRESHOLD } from '../constants/price';
import { useCartAmountCount } from './useCartAmountCount';

export const useFreeShippingProgress = () => {
  const { selectedTotalAmount } = useCartAmountCount();

  const progressValue = Math.min((selectedTotalAmount / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_DELIVERY_THRESHOLD - selectedTotalAmount, 0);

  return { progressValue, remainingForFreeShipping };
};
