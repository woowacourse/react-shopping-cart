import { getCartItems } from "@/apis/cartItems/getCartItems";
import useFetchData from "@/shared/hooks/useFetchData";
import useSelectedItem from "./useSelectedItem";

export const useOrderList = () => {
  const {
    data: cartItems,
    isLoading,
    errorMessage,
    refetch: refetchCartItems,
  } = useFetchData({ fetchFn: getCartItems });
  const {
    selectedItemIds,
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
  } = useSelectedItem(cartItems);

  const orderList =
    cartItems?.filter(({ id }) => selectedItemIds.has(id)) ?? [];
  const orderTotalPrice = orderList.reduce((sum, { product, quantity }) => {
    return sum + product.price * quantity;
  }, 0);

  return {
    cartItems,
    isLoading,
    errorMessage,
    refetchCartItems,
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    orderList,
    orderTotalPrice,
  };
};
