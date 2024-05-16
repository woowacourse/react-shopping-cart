import { selector } from "recoil";
import { selectedCartItemIdsState } from "./selectedCartItemIds";

export const selectedUniqueCartItemsCountState = selector({
  key: "selectedUniqueCartItemsCountState",
  get: async ({ get }) => {
    const selectedCartItemIds = get(selectedCartItemIdsState);
    return selectedCartItemIds.length;
  },
});
