import { atom } from "recoil";

export const isRemoteDeliveryAreaState = atom<boolean>({
  key: "isRemoteDeliveryAreaState",
  default: false,
});
