import { useState } from 'react';

export const useDelivery = () => {
  const [specialDeliveryZone, setSpecialDeliveryZone] = useState(false);

  const toggleSpecialDeliveryZone = () => {
    setSpecialDeliveryZone((prev) => !prev);
  };

  return {
    specialDeliveryZone,
    toggleSpecialDeliveryZone,
  };
};
