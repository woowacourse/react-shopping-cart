import { DELIVERY } from '../constants/delivery';
import { useToggle } from './useToggle';

export function useDeliveryFee(baseFee: number) {
  const { value: isSpecialDelivery, toggle: toggleSpecialDelivery } = useToggle(false);
  const totalFee = isSpecialDelivery ? baseFee + DELIVERY.FEE : baseFee;
  return { isSpecialDelivery, toggleSpecialDelivery, totalFee };
}
