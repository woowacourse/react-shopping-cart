import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import useSelectedItem from "./useSelectedItem";
import { CartItemType } from "@/apis/cartItems/cartItem.type";

export const useOrderList = (cartItems: CartItemType[]) => {
  const {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected,
  } = useSelectedItem(cartItems);

  const orderList = cartItems.filter(({ id }) => getIsSelected(id)) ?? [];
  const orderTotalPrice = getOrderTotalPrice(orderList);

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
