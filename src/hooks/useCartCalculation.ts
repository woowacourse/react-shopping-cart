import { useMemo } from "react";
import { CartItemContent } from "../types/response";

const FREE_SHIPPING_THRESHOLD = 100_000;
const DEFAULT_SHIPPING_FEE = 3_000;

const useCartCalculation = (
  cartItemsData: CartItemContent[],
  checkedItemsId: number[]
) => {
  const { orderQuantity, orderPrice } = useMemo(() => {
    const checkedItemsSet = new Set(checkedItemsId);
    return cartItemsData
      .filter(({ id }) => checkedItemsSet.has(id))
      .reduce(
        (acc, item) => ({
          orderQuantity: acc.orderQuantity + item.quantity,
          orderPrice: acc.orderPrice + item.quantity * item.product.price,
        }),
        { orderQuantity: 0, orderPrice: 0 }
      );
  }, [cartItemsData, checkedItemsId]);

  const shippingFee = useMemo(() => {
    if (orderPrice === 0) return 0;
    return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
  }, [orderPrice]);

  const totalPrice = orderPrice + shippingFee;

  return {
    orderQuantity,
    orderPrice,
    shippingFee,
    totalPrice,
  };
};

export default useCartCalculation;
