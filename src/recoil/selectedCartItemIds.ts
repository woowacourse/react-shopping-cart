import { atom } from "recoil";
import { putInSelectedCartItemIds, takeOutSelectedCartItemIds } from "../utils/sessionStorage";
import { CartItemId } from "../types/cartItems";

export const selectedCartItemIdsState = atom<CartItemId[]>({
  key: "selectedCartItemIdsState",
  default: takeOutSelectedCartItemIds(),
  effects: [
    ({ onSet }) => {
      onSet((newIds) => {
        putInSelectedCartItemIds(newIds);
      });
    },
  ],
});
