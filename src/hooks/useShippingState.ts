import { useRecoilState, useRecoilValue } from "recoil";
import { cartAmountState } from "../recoil/cartAmount";
import { isRemoteDeliveryAreaState } from "../recoil/isRemoteDeliveryArea";

interface UseShippingStateReturn {
  isFreeShipping: boolean;
  isRemoteDeliveryArea: boolean;
  toggleIsRemoteDeliveryArea: () => void;
}

export const useShippingState = (): UseShippingStateReturn => {
  const { shippingCost } = useRecoilValue(cartAmountState);
  const [isRemoteDeliveryArea, setIsRemoteDeliveryArea] = useRecoilState(isRemoteDeliveryAreaState);

  const toggleIsRemoteDeliveryArea = () => setIsRemoteDeliveryArea((prev) => !prev);

  const isFreeShipping = shippingCost === 0;

  return {
    isFreeShipping,
    isRemoteDeliveryArea,
    toggleIsRemoteDeliveryArea,
  };
};
