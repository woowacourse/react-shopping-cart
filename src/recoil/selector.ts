import { selector } from "recoil";
import { ItemType } from "../types/domain";
import { itemsState } from "./atom";

export const itemQuantitySelector = selector({
  key: "itemQuantity",
  get: ({ get }) => {
    return get(itemsState).filter((item: ItemType) => item.quantity !== "0");
  },
  set: ({ get, set }, newItem) => {
    const items = get(itemsState);
    const newItems = items.map((item: ItemType) =>
      item.id === newItem.id
        ? { ...item, quantity: newItem.quantity.toString() }
        : item
    );
    
    const cartItems = newItems.filter((item: ItemType) => item.quantity !== "0");
    localStorage.setItem("cart", JSON.stringify(cartItems));
    return set(itemsState, newItems);
  },
});
