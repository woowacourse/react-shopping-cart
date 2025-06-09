import { DELIVERY } from '../constants/delivery';
import { useToggle } from './useToggle';

export function useDeliveryFee(baseFee: number) {
  const { value: includeSpecial, toggle } = useToggle(false);
  const totalFee = includeSpecial ? baseFee + DELIVERY.FEE : baseFee;
  return { includeSpecial, toggle, totalFee };
}
