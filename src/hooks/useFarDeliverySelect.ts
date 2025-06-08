import { useState } from 'react';

function useFarDeliverySelect() {
  const [isFarDelivery, setIsFarDelivery] = useState(false);

  const handleFarDeliverySelect = () => {
    setIsFarDelivery((prev) => !prev);
  };

  return { isFarDelivery, handleFarDeliverySelect };
}

export default useFarDeliverySelect;
