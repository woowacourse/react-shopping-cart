import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CouponInstances } from "../domain/coupons/AbstractCoupon";

const { persistAtom } = recoilPersist();

export const checkedCartItemsState = atom<number[]>({
  key: "checkedCartItemsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const userLiveInSigolStates = atom<boolean>({
  key: "userLiveInSigolStates",
  default: false,
});

export const selectedCoupons = atom<CouponInstances[]>({
  key: "selectedCoupons",
  default: [],
});

export const cartItemQuantityStates = atomFamily<number, number>({
  key: "cartItemQuantityStates",
  default: 1,
});

export const cartItemPriceStates = atomFamily<number, number>({
  key: "cartItemPriceStates",
  default: 0,
});
