import { useCallback, useMemo, useState } from "react";
import { CartItem } from "../type/CartItem";

const useSelectedCartIds = (cartItemsData: CartItem[]) => {
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>(
    cartItemsData.map((item) => item.id)
  );

  const handleRemoveSelectCartItem = useCallback((id: number) => {
    setSelectedCartIds((prev) => prev.filter((cartId) => cartId !== id));
  }, []);

  const handleAddSelectCartItem = useCallback((id: number) => {
    setSelectedCartIds((prev) => [...prev, id]);
  }, []);

  const handleSelectAllCartItems = useCallback(
    (isAllSelected: boolean) => {
      if (isAllSelected) {
        setSelectedCartIds([]);
      } else {
        const allIds = cartItemsData.map((item) => item.id);
        setSelectedCartIds(allIds);
      }
    },
    [cartItemsData]
  );

  const isAllSelected = useMemo(
    () =>
      cartItemsData.length > 0 &&
      cartItemsData.every((item) => selectedCartIds.includes(item.id)),
    [cartItemsData, selectedCartIds]
  );

  return {
    selectedCartIds,
    isAllSelected,
    handleRemoveSelectCartItem,
    handleAddSelectCartItem,
    handleSelectAllCartItems,
  };
};

export default useSelectedCartIds;
