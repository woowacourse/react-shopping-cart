import { useState } from 'react';

function usePaymentCalculation(price: number, totalDiscount: number) {
  const [selected, setSelected] = useState(false);
  const toggle = () => setSelected(!selected);

  const extraDeliveryFee = selected ? 3_000 : 0;

  const totalPrice = price - totalDiscount + extraDeliveryFee;

  return { selected, toggle, extraDeliveryFee, totalPrice };
}

export default usePaymentCalculation;
