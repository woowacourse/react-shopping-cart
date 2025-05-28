import { useEffect, useMemo, useState } from "react";
import { CartItemType } from "../types/response";

const useCheckboxHandler = (cartItems: CartItemType[]) => {
  const allCartIds = useMemo(
    () => cartItems.map((item) => item.id),
    [cartItems]
  );
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([]);

  useEffect(() => {
    setSelectedCartIds(allCartIds);
  }, [allCartIds]);

  const toggleAllSelect = () => {
    setSelectedCartIds((prevCartIds) => {
      return prevCartIds.length === allCartIds.length ? [] : allCartIds;
    });
  };

  const toggleSelect = (cartId: number) => {
    setSelectedCartIds((prevSelected) =>
      prevSelected.includes(cartId)
        ? prevSelected.filter((id) => id !== cartId)
        : [...prevSelected, cartId]
    );
  };

  const isAllSelected = () => {
    return selectedCartIds.length === cartItems.length;
  };

  const isSelected = (cartId: number) => {
    return selectedCartIds.includes(cartId);
  };

  return {
    toggleAllSelect,
    toggleSelect,
    isAllSelected,
    isSelected,
    selectedCartIds,
  };
};

export default useCheckboxHandler;
