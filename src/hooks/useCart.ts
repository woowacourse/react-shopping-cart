import { useEffect } from "react";
import { HandleCartItemChangeType, UseCartReturnType } from "../types/cartItem";
import { calculatePrices, getCartStats } from "./utils/cartCalculations";
import { useCartApi } from "./useCartApi";
import { useCartSelection } from "./useCartSelection";

const useCart = (): UseCartReturnType => {
  const { cartItems, isLoading, getInitializeCartItems, patchCartItem, deleteCartItem } = useCartApi();
  const { cartItemsWithCheck, handleCheckChange, isAllChecked } = useCartSelection(cartItems);
  const { cartItemsCount, cartItemsCheckedCount, cartItemsTotalQuantity } = getCartStats(cartItemsWithCheck);
  const { orderPrice, deliveryPrice, totalPrice } = calculatePrices(cartItemsWithCheck);

  const handleCartItemChange: HandleCartItemChangeType = ({ action, id, quantity }) => {
    if (action === "patch") patchCartItem({ id, quantity: quantity! });
    if (action === "delete") deleteCartItem({ id });
  };

  useEffect(() => {
    getInitializeCartItems();
  }, []);

  return {
    isLoading,
    cartItemsInfo: { orderPrice, deliveryPrice, totalPrice, cartItemsCount, cartItemsCheckedCount },
    cartItemListProps: { cartItems: cartItemsWithCheck, handleCartItemChange, handleCheckChange, isAllChecked },
    orderResult: { cartItemsTotalQuantity, cartItemsCheckedCount, totalPrice },
  };
};

export default useCart;
