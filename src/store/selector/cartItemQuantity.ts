import { atomFamily } from "recoil";

export const itemQuantityState = atomFamily<number, number>({
  key: "itemQuantityState",
  default: 0,
});
