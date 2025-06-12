import { DELIVERY } from '../constants/delivery';
import { useToggle } from './useToggle';

export function useDeliveryFee(baseFee: number, isFreeShipping: boolean) {
  const { value: isSpecialDelivery, toggle: toggleSpecialDelivery } = useToggle(false);
  const totalFee = isFreeShipping ? 0 : isSpecialDelivery ? baseFee + DELIVERY.FEE : baseFee;
  return { isSpecialDelivery, toggleSpecialDelivery, totalFee };
}
