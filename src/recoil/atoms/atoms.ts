import { atomFamily } from "recoil";

export const isSelectedState = atomFamily<boolean, number>({
  key: "isSelectedState",
  default: false,
});
