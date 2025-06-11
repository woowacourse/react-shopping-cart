import useCartCheck from "./useCartCheck";
import useCartResource from "./useCartResource";
import { CartItem } from "../../../shared/types/cartItem";
import calculateCartAmount from "../utils/calculateCartAmount";
import calculateCartPrice from "../utils/calculateCartPrice";
import { useEffect } from "react";

type HandleCartItemChangeType = ({
  action,
  id,
  quantity,
}: {
  action: "patch" | "delete";
  id: number;
  quantity?: number;
}) => void;

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

export interface UseCartReturnType {
  cartItemsInfo: Record<
    "cartItemsCount" | "orderPrice" | "deliveryPrice" | "totalPrice" | "cartItemsCheckedCount",
    number
  >;
  cartItemListProps: {
    cartItems: CartItem[];
    checkedIds: number[];
    handleCartItemChange: HandleCartItemChangeType;
    handleCheckChange: HandleCheckChangeType;
    isAllChecked: boolean;
  };
  orderConfirmPageData: {
    cartItems: CartItem[];
    cartItemsTotalQuantity: number;
    cartItemsCheckedCount: number;
    orderPrice: number;
    deliveryPrice: number;
    totalPrice: number;
  };
}

const useCart = (): UseCartReturnType => {
  const { cartItems, cartItemIds, patchCartItem, deleteCartItem, fetchCartItems } = useCartResource();
  const { checkedIds, isAllChecked, handleCheckChange, removeCheckedItem } = useCartCheck(cartItemIds);

  const { cartItemsCount, cartItemsCheckedCount, cartItemsTotalQuantity } = calculateCartAmount(cartItems, checkedIds);
  const { orderPrice, deliveryPrice, totalPrice } = calculateCartPrice(cartItems, checkedIds);

  const handleCartItemChange: HandleCartItemChangeType = async ({ action, id, quantity }) => {
    if (action === "patch") {
      patchCartItem({ id, quantity: quantity! });
      return;
    }
    if (action === "delete") {
      const deletedId = await deleteCartItem({ id });
      if (deletedId) removeCheckedItem(deletedId);
      return;
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItemsInfo: { orderPrice, deliveryPrice, totalPrice, cartItemsCount, cartItemsCheckedCount },
    cartItemListProps: { cartItems, checkedIds, handleCartItemChange, handleCheckChange, isAllChecked },
    orderConfirmPageData: {
      cartItems: cartItems.filter((item) => checkedIds.includes(item.id)),
      orderPrice,
      deliveryPrice,
      totalPrice,
      cartItemsTotalQuantity,
      cartItemsCheckedCount,
    },
  };
};

export default useCart;
