import { useMemo } from "react";
import { useCartSelector } from "../../cart/hooks/useCartState";

const FREE_SHIPPING_THRESHOLD = 100_000;
const DEFAULT_SHIPPING_FEE = 3_000;

const useOrderCalculator = () => {
  const items = useCartSelector((state) => state.items);

  const orderItems = useMemo(
    () => items.filter((item) => item.selected),
    [items]
  );

  const { orderQuantity, orderPrice } = useMemo(() => {
    return orderItems.reduce(
      (acc, item) => ({
        orderQuantity: acc.orderQuantity + item.quantity,
        orderPrice: acc.orderPrice + item.quantity * item.product.price,
      }),
      { orderQuantity: 0, orderPrice: 0 }
    );
  }, [orderItems]);

  const shippingFee = useMemo(() => {
    if (orderPrice === 0) return 0;
    return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
  }, [orderPrice]);

  const totalPrice = orderPrice + shippingFee;

  return {
    orderItems,
    orderItemCount: orderItems.length,
    hasSelectedItem: orderItems.length > 0,

    orderQuantity,
    orderPrice,
    shippingFee,
    totalPrice,
  };
};

export default useOrderCalculator;
