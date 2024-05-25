import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { fetchCartItemsSelector, fetchCouponsSelector } from "../selector/apiSelector";
import { Product } from "../../types/product";
import { Coupon } from "../../types/coupon";

const { persistAtom } = recoilPersist();

//--장바구니--//
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

export const shippingCheckedAtom = atom<boolean>({
  key: "shippingCheckedAtom",
  default: false,
});

//--쿠폰--//
export const couponsAtom = atom<Coupon[]>({
  key: "couponsAtom",
  default: fetchCouponsSelector,
});

export const couponCheckedAtom = atom<Coupon[]>({
  key: "couponCheckedAtom",
  default: [],
});

export const couponUsedAtom = atom<boolean>({
  key: "couponUsedAtom",
  default: false,
});
