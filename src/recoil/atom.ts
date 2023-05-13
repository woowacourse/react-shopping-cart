import { atom } from "recoil";
import mockData from "../mockData.json";
import { ItemType } from "../types/domain";
import { getLocalStorage } from "../utils";

const cartItems = getLocalStorage<ItemType[]>("cart", []);

export const itemsState = atom({
  key: "items",
  default: structuredClone(mockData).map((item: ItemType) => {
    const targetItem = cartItems.find((cartItem) => cartItem.id === item.id);
    return { ...item, quantity: targetItem ? targetItem.quantity : "0" };
  }),
});
