import { atom, selector } from "recoil";
import { CartItemId } from "../types/cartItems";
import { putInSelectedCartItemIds, takeOutSelectedCartItemIds } from "../store/cart";

const selectedCartItemIdsSelector = selector({
  key: "selectedCartItemIdsSelector",
  get: takeOutSelectedCartItemIds,
});

export const selectedCartItemIdsState = atom<CartItemId[]>({
  key: "selectedCartItemIdsState",
  default: selectedCartItemIdsSelector,
  effects: [
    ({ onSet }) => {
      onSet((newIds) => {
        putInSelectedCartItemIds(newIds);
      });
    },
  ],
});
