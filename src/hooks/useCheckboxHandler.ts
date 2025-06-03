import { useEffect, useState } from "react";
import { CartItemType } from "../types/response";

const useCheckboxHandler = (cartItems: CartItemType[]) => {
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([]);

  useEffect(() => {
    const allCartIds = cartItems.map((item) => item.id);
    setSelectedCartIds(allCartIds);
  }, [cartItems]);

  const toggleAllSelect = () => {
    setSelectedCartIds((prevCartIds) => {
      const allCartIds = cartItems.map((item) => item.id);
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
