import { useMemo } from "react";
import { useCartSelector } from "../../cart/hooks/useCartState";
import {
  calculateOrderPrice,
  calculateOrderQuantity,
  calculateShippingFee,
  calculateTotalPrice,
  filterSelectedItems,
} from "../calculations";

const useOrderCalculator = () => {
  const items = useCartSelector((state) => state.items);

  return useMemo(() => {
    const orderItems = filterSelectedItems(items);
    const orderQuantity = calculateOrderQuantity(orderItems);
    const orderPrice = calculateOrderPrice(orderItems);
    const shippingFee = calculateShippingFee(orderPrice);
    const totalPrice = calculateTotalPrice(orderPrice, shippingFee);

    return {
      orderItems,
      orderItemCount: orderItems.length,
      hasSelectedItem: orderItems.length > 0,
      orderQuantity,
      orderPrice,
      shippingFee,
      totalPrice,
    };
  }, [items]);
};

export default useOrderCalculator;
