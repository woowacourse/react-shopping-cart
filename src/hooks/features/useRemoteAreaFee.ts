import { useState } from "react";
import { FEE } from "../../constants/systemConstants";

interface RemoteAreaFeeProps {
  deliveryFee: number;
  orderPrice: number;
}

const useRemoteAreaFee = ({ deliveryFee, orderPrice }: RemoteAreaFeeProps) => {
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const deliveryFeeWithRemoteArea = isRemoteArea
    ? deliveryFee + FEE.DELIVERY_FEE_REMOTE_AREA
    : deliveryFee;

  const totalPriceWithRemoteArea = orderPrice + deliveryFeeWithRemoteArea;

  const toggleIsRemoteArea = () => {
    setIsRemoteArea((prev) => !prev);
  };

  return {
    isRemoteArea,
    deliveryFeeWithRemoteArea,
    totalPriceWithRemoteArea,
    toggleIsRemoteArea,
  };
};

export default useRemoteAreaFee;
