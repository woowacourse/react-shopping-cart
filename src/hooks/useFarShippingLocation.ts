import { useShippingManager } from '@/store/custom/useShippingManager';
import { isFarShippingLocationMetaData } from '@/types';

const useFarShippingLocation = () => {
  const { isFarShippingLocation } = useShippingManager();
  const [isFarShipping, setIsFarShipping] = isFarShippingLocation;

  const handleFarShippingLocation = () => {
    setIsFarShipping((prev: isFarShippingLocationMetaData) => ({
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
