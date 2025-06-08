import { useEffect, useMemo, useState } from "react";
import { CartItemType } from "../../types/response";
import {
  getSelectedCartItemFromLocalStorage,
  setSelectedCartItemToLocalStorage,
} from "../../domains/localStorage";

const useCheckboxHandler = (cartItems: CartItemType[]) => {
  const allCartIds = useMemo(
    () => [...cartItems].map((item) => item.id),
    [cartItems]
  );
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([]);

  useEffect(() => {
    const storedSelectedCartIds = getSelectedCartItemFromLocalStorage();
    setSelectedCartIds(storedSelectedCartIds || []);
  }, []);

  const toggleAllSelect = () => {
    setSelectedCartIds((prevCartIds) => {
      const result = prevCartIds.length === allCartIds.length ? [] : allCartIds;
      setSelectedCartItemToLocalStorage(result);
      return result;
    });
  };

  const toggleSelect = (cartId: number) => {
    setSelectedCartIds((prevSelected) => {
      const result = prevSelected.includes(cartId)
        ? prevSelected.filter((id) => id !== cartId)
        : [...prevSelected, cartId];

      setSelectedCartItemToLocalStorage(result);
      return result;
    });
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
