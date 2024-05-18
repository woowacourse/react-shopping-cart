import { atom } from "recoil";
import persistAtom from "./utils/persist";

export const isCartItemSelectedState = atom({
  key: "isSelectedState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
