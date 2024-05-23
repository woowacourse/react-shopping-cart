import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Product } from "../../types/product";
import { fetchCartItemsSelector, fetchCouponsSelector } from "../selector/selector";
import { Coupon } from "../../types/coupon";

const { persistAtom } = recoilPersist();

export const cartItemsAtom = atom<Product[]>({
  key: "cartItemsAtom",
  default: fetchCartItemsSelector,
});

export const cartItemCheckedIdsAtom = atom<number[]>({
  key: "cartItemCheckedIdsAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const quantityAtomFamily = atomFamily<number, number>({
  key: "quantityAtomFamily",
  default: 0,
});

export const couponsAtom = atom<Coupon[]>({
  key: "couponsAtom",
  default: fetchCouponsSelector,
});

export const shippingCheckedAtom = atom<boolean>({
  key: "shippingCheckedAtom",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
