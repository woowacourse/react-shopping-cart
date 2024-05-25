import { getCoupons } from "@/auth/apis/coupon";
import { Coupon, CouponDiscountType } from "@/types/coupon";
import { atom, selector } from "recoil";
import { selectedCartItemsIdState } from "./selectedCardItems";
import { cartItemQuantityState } from "./cartItemQuantity";
import { cartItemsState } from "./cartItems";

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

export const checkBuyXgetYSelector = selector({
  key: "checkBuyXgetYSelector",
  get:
    ({ get }) =>
    (couponId: number) => {
      const selectedItemsId = get(selectedCartItemsIdState);
      const couponsInfo = get(couponListSelector);
      const targetCouponInfo = couponsInfo.find(
        (coupon) => coupon.id === couponId
      )!;

      const filteredItemsId = selectedItemsId.filter((id: number) => {
        return (
          get(cartItemQuantityState(id)) >=
          targetCouponInfo.buyQuantity! + targetCouponInfo.getQuantity!
        );
      });

      return !!filteredItemsId.length;
    },
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

export const maxBuyXgetYItemSelector = selector({
  key: "maxBuyXgetYSelector",
  get: ({ get }) => {
    const selectedItemsId = get(selectedCartItemsIdState);
    const couponsInfo = get(couponListSelector);
    const buyXgetYCoupon = get(couponsByDiscountTypeSelector).buyXgetY;

    if (buyXgetYCoupon) {
      const targetCouponInfo = couponsInfo.find(
        (coupon) => coupon.id === buyXgetYCoupon[0].id
      )!;

      let maxDiscount = 0;

      const filteredItemsId = selectedItemsId.filter((id: number) => {
        return (
          get(cartItemQuantityState(id)) >=
          targetCouponInfo.buyQuantity! + targetCouponInfo.getQuantity!
        );
      });

      filteredItemsId.forEach((id) => {
        const cartItems = get(cartItemsState);
        const targetItem = cartItems.find((item) => item.id === id);
        const discount = targetItem!.product.price!;
        if (maxDiscount < discount) {
          maxDiscount = discount;
        }
      });
      return maxDiscount;
    }
    return 0;
  },
});
