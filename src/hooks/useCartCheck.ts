import { useEffect, useRef, useState } from "react";
import { CartItemContent } from "../types/response";

const INITIAL_CHECKED = true;

export interface CartItemCheckType {
  id: number;
  checked: boolean;
}

const useCartCheck = (cartItemsData: CartItemContent[]) => {
  const [cartItemsCheckData, setCartItemsCheckData] = useState<
    CartItemCheckType[]
  >([]);

  const [allChecked, setAllChecked] = useState(INITIAL_CHECKED);
  const isCheckDataInitialized = useRef(false);

  useEffect(() => {
    if (cartItemsData.length > 0 && !isCheckDataInitialized.current) {
      const data = cartItemsData.map(({ id }) => ({
        id,
        checked: INITIAL_CHECKED,
      }));
      setCartItemsCheckData(data);
      isCheckDataInitialized.current = true;
    }
  }, [cartItemsData]);

  useEffect(() => {
    setCartItemsCheckData((prev) =>
      prev.filter(({ id }) => cartItemsData.some((item) => item.id === id))
    );
  }, [cartItemsData]);

  const getItemChecked = (cartId: number) => {
    return cartItemsCheckData.find(({ id }) => id === cartId)?.checked ?? false;
  };

  const toggleAllChecked = () => {
    setAllChecked((prev) => !prev);

    setCartItemsCheckData((prev) => {
      return prev.map((checkData) => ({
        ...checkData,
        checked: !allChecked,
      }));
    });
  };

  const toggleItemChecked = (cartId: number) => {
    setCartItemsCheckData((prev) =>
      prev.map((item) =>
        item.id === cartId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return {
    cartItemsCheckData,
    allChecked,
    getItemChecked,
    toggleAllChecked,
    toggleItemChecked,
  };
};

export default useCartCheck;
