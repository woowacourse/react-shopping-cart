import { useState } from "react";
import { REGION_DELIVERY_PRICE } from "@/domains/constants/delivery";
import { getDeliveryPrice } from "@/domains/utils/getDeliveryPrice";

export const useDeliveryPrice = (orderTotalPrice: number) => {
  const [isRegionDelivery, setIsRegionDelivery] = useState(false);

  const toggleRegionDelivery = () => {
    setIsRegionDelivery((prev) => !prev);
  };

  const deliveryPrice = getDeliveryPrice(orderTotalPrice);
  return {
    deliveryPrice: isRegionDelivery
      ? deliveryPrice + REGION_DELIVERY_PRICE
      : deliveryPrice,
    isRegionDelivery,
    toggleRegionDelivery,
  };
};
