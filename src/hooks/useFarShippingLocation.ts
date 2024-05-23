import { useShippingManager } from '@/store/custom/useShippingManager';
import { isFarShippingLocationData } from '@/types';

const useFarShippingLocation = () => {
  const { isFarShippingLocation } = useShippingManager();
  const [isFarShipping, setIsFarShipping] = isFarShippingLocation;

  const handleFarShippingLocation = () => {
    setIsFarShipping((prev: isFarShippingLocationData) => ({
      ...prev,
      isChecked: !prev.isChecked,
    }));
  };

  return {
    isFarShipping,
    handleFarShippingLocation,
  };
};

export default useFarShippingLocation;
