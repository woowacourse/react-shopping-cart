import { useMemo } from "react";
import useCart from "./useCart";

const FREE_SHIPPING_THRESHOLD = 100_000;
const DEFAULT_SHIPPING_FEE = 3_000;

const useCartCalculations = () => {
  const { cartItemsData, checkedItemsId } = useCart();

  const orderQuantity = useMemo(() => {
    return cartItemsData
      .filter(({ id }) => checkedItemsId.includes(id))
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItemsData, checkedItemsId]);

  const orderPrice = useMemo(() => {
    return cartItemsData
      .filter(({ id }) => checkedItemsId.includes(id))
      .reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  }, [cartItemsData, checkedItemsId]);

  const shippingFee = useMemo(() => {
    if (orderPrice === 0) return 0;
    return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
  }, [orderPrice]);

  const totalPrice = useMemo(() => {
    return orderPrice + shippingFee;
  }, [orderPrice, shippingFee]);

  return { orderQuantity, orderPrice, shippingFee, totalPrice };
};

export default useCartCalculations;
