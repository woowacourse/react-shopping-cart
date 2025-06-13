import { useCallback, useEffect, useMemo, useState } from "react";
import { CartItem } from "../../type/CartItem";
import useSelectedCartIdsLocalStorage from "./useSelectedCartIdsLocalStorage";

const useSelectedCartIds = (cartItemsData: CartItem[]) => {
  const {
    setSelectedCartIdsToLocalStorage,
    getSelectedCartIdsFromLocalStorage,
  } = useSelectedCartIdsLocalStorage();

  const [selectedCartIds, setSelectedCartIds] = useState<number[]>(() => {
    const storedSelectedCartIds = getSelectedCartIdsFromLocalStorage();
    return storedSelectedCartIds ?? cartItemsData.map((item) => item.id);
  });

  useEffect(() => {
    setSelectedCartIdsToLocalStorage(selectedCartIds);
  }, [selectedCartIds, setSelectedCartIdsToLocalStorage]);

  const handleRemoveSelectCartItem = useCallback((id: number) => {
    setSelectedCartIds((prev) => prev.filter((cartId) => cartId !== id));
  }, []);

  const handleAddSelectCartItem = useCallback((id: number) => {
    setSelectedCartIds((prev) => [...prev, id]);
  }, []);

  const handleSelectAllCartItems = useCallback(
    (isAllSelected: boolean) => {
      if (isAllSelected) {
        const allIds = cartItemsData.map((item) => item.id);
        setSelectedCartIds(allIds);
      } else {
        setSelectedCartIds([]);
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
