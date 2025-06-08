import { useCouponContext } from '../../../../global/contexts/CouponContext';

function usePaymentCalculation(price: number, totalDiscount: number) {
  const { isIslandAreaSelected, setIsIslandAreaSelected } = useCouponContext();
  const toggle = () => setIsIslandAreaSelected(!isIslandAreaSelected);

  const extraDeliveryFee = isIslandAreaSelected ? 3_000 : 0;

  const totalPrice = price - totalDiscount + extraDeliveryFee;

  return { isIslandAreaSelected, toggle, extraDeliveryFee, totalPrice };
}

export default usePaymentCalculation;
