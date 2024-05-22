import { atom, atomFamily } from "recoil";

export const selectedListState = atom<number[]>({
  key: "selectedListState",
  default: JSON.parse(localStorage.getItem("selectedListState") || "[]"),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("selectedListState", JSON.stringify(newValue));
      });
    },
  ],
});

export const cartItemQuantityState = atomFamily<number, number>({
  key: "cartItemQuantityState",
  default: 0,
});
