import { useOrderListContext } from "@/pages/shopping-cart/context/OrderListProvider";

export const useOrderInfo = () => {
  const { cartListData, selectionMap } = useOrderListContext();

  const orderList = (cartListData ?? []).filter(
    (cart) => selectionMap[cart.id] === true
  );
  const typeCount = orderList.length;
  const totalCount = orderList.reduce((acc, cart) => acc + cart.quantity, 0);
  const isDisabled = !Object.values(selectionMap).some(
    (isSelected) => isSelected
  );

  return {
    orderList,
    typeCount,
    totalCount,
    isDisabled,
  };
};
