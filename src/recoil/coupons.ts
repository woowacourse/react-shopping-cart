import { getCoupons } from "@/apis/coupon";
import { Coupon, CouponDiscountType } from "@/types/coupon";
import { atom, selector } from "recoil";

export const couponListSelector = selector<Coupon[]>({
  key: "couponListSelector",
  get: async () => {
    const couponList = await getCoupons();
    return couponList;
  },
});

export const couponsState = atom<Coupon[]>({
  key: "couponsState",
  default: [],
});

export const discountCouponPriceState = atom<number>({
  key: "discountCouponPriceState",
  default: 0,
});

export const couponsByDiscountTypeSelector = selector({
  key: "couponsByDiscountType",
  get: ({ get }) => {
    const couponList = get(couponsState);
    return [...couponList].reduce((acc, cur) => {
      acc[cur.discountType] = acc[cur.discountType]
        ? [...acc[cur.discountType], cur]
        : [cur];
      return acc;
    }, {} as Record<CouponDiscountType, Coupon[]>);
  },
});
