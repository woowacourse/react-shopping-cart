import { cartItemsState } from "@/recoil/cartItems";
import { CartItem } from "@/types/cart";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { AtomEffect, atom, selector } from "recoil";

const localStorageEffectForItem =
  (): AtomEffect<number[]> =>
  ({ onSet }) => {
    onSet((newValue) => {
      setLocalStorage("selectedItems", newValue);
    });
  };

export const selectedCartItemsIdState = atom<number[]>({
  key: "selectedCartItems",
  default: [],
  effects: [localStorageEffectForItem()],
});

export const selectedCartItemList = selector<CartItem[]>({
  key: "selectedCartItemList",
  get: ({ get }) => {
    const selectedItemsId = getLocalStorage("selectedItems");
    const selectedCartItems = get(cartItemsState).filter((item) =>
      selectedItemsId.includes(item.id)
    );
    return selectedCartItems;
  },
});
