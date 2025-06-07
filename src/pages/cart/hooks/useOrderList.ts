import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useSelectedOrderList } from "./useSelectedOrderList";

export const useOrderList = (cartItems: CartItemType[]) => {
  const {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected,
  } = useSelectedOrderList(cartItems);

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
