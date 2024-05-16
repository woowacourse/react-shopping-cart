import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "select",
  storage: localStorage,
});

export const isSelectedState = atom({
  key: "isSelectedState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
