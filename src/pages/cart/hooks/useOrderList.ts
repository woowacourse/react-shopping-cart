import useSelectedItem from "./useSelectedItem";
import { CartItemType } from "@/apis/cartItems/cartItem.type";

export const useOrderList = (cartItems: CartItemType[] | null) => {
  const {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected,
  } = useSelectedItem(cartItems);

  const orderList = cartItems?.filter(({ id }) => getIsSelected(id)) ?? [];
  const orderTotalPrice = orderList.reduce((sum, { product, quantity }) => {
    return sum + product.price * quantity;
  }, 0);

  return {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected,
    orderList,
    orderTotalPrice,
  };
};
