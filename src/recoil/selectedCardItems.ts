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
  default: getLocalStorage("selectedItems"),
  effects: [localStorageEffectForItem()],
});

export const selectedCartListSelector = selector<CartItem[]>({
  key: "selectedCartItemList",
  get: ({ get }) => {
    // const selectedItemsIds = getLocalStorage("selectedItems");
    const selectedItemsIds = get(selectedCartItemsIdState);
    const selectedCartItems = get(cartItemsState).filter((item) =>
      selectedItemsIds.includes(item.id)
    );
    return selectedCartItems;
  },
});
