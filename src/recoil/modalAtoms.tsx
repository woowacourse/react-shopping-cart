import { atom } from "recoil";
import { ReactNode } from "react";

export const modalOpenState = atom<boolean>({
  key: "modalOpenState",
  default: false,
});

export const modalContentState = atom<ReactNode>({
  key: "modalContentState",
  default: <></>,
});
