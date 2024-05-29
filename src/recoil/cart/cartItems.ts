import { selector } from "recoil";
import { rawCartItemsState } from "./rawCartItems";
import { selectedCartItemIdsState } from "./selectedCartItemIds";

export const cartItemsState = selector({
  key: "cartItemsState",
  get: ({ get }) => {
    const cartItems = get(rawCartItemsState);
    const selectedIds = get(selectedCartItemIdsState);

    return cartItems.map((item) => ({
      ...item,
      isSelected: selectedIds.includes(item.id),
    }));
  },
});
