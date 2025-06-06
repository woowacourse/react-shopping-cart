import { useState } from "react";
import { FEE } from "../../constants/systemConstants";

interface RemoteAreaFeeProps {
  deliveryFee: number;
  orderPrice: number;
}

const useRemoteAreaFee = ({ deliveryFee, orderPrice }: RemoteAreaFeeProps) => {
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const finalDeliveryFee = isRemoteArea
    ? deliveryFee + FEE.DELIVERY_FEE_REMOTE_AREA
    : deliveryFee;

  const finalOrderPrice = orderPrice + finalDeliveryFee;

  const toggleIsRemoteArea = () => {
    setIsRemoteArea((prev) => !prev);
  };

  return {
    isRemoteArea,
    finalDeliveryFee,
    finalOrderPrice,
    toggleIsRemoteArea,
  };
};

export default useRemoteAreaFee;
