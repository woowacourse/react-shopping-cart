import { atom, selector } from "recoil";
import { putInSelectedCartItemIds, takeOutSelectedCartItemIds } from "../utils/sessionStorage";
import { CartItemId } from "../types/cartItems";

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
