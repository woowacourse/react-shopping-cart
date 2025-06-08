import { useEffect } from "react";
import { CartItem } from "../types/type";

export const useCartItemValidation = (
  cartItems: CartItem[],
  selectedItem: Set<number>,
  handleSelectedItem: (newSet: Set<number>) => void
) => {
  useEffect(() => {
    if (cartItems.length > 0 && selectedItem.size > 0) {
      const validCartItemIds = new Set(cartItems.map((item) => item.id));
      const validSelectedItems = new Set(
        Array.from(selectedItem).filter((id: number) =>
          validCartItemIds.has(id)
        )
      );

      if (validSelectedItems.size !== selectedItem.size) {
        handleSelectedItem(validSelectedItems);
      }
    }
  }, [cartItems, selectedItem, handleSelectedItem]);
};
