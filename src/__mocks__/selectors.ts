import { atom } from "recoil";

export const mockCartItemsState = atom({
  key: "mockCartItemsState",
  default: [
    { id: 1, name: "item1", quantity: 1 },
    { id: 2, name: "item2", quantity: 2 },
  ],
});
