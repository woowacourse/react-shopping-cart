import { useToggle } from './useToggle';

export function useDeliveryFee(baseFee: number) {
  const { value: includeSpecial, toggle } = useToggle(false);
  const totalFee = includeSpecial ? baseFee + 3000 : baseFee;
  return { includeSpecial, toggle, totalFee };
}
