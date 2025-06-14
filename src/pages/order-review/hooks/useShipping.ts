import { useOrderListContext } from "@/pages/shopping-cart/context/OrderListProvider";
import { useState } from "react";

export const useShipping = () => {
  const [isJejuOrRemoteArea, setIsJejuOrRemoteArea] = useState(false);
  const { shippingFee } = useOrderListContext();

  const calculateActualShippingFee = () => {
    if (isJejuOrRemoteArea) {
      return shippingFee + 3000;
    }
    return shippingFee;
  };

  const actualShippingFee = calculateActualShippingFee();

  const handleJejuOrRemoteAreaToggle = () => {
    setIsJejuOrRemoteArea((prev) => !prev);
  };

  return {
    isJejuOrRemoteArea,
    actualShippingFee,
    handleJejuOrRemoteAreaToggle,
  };
};
