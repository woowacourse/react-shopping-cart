import { getCoupons } from "@/auth/apis/coupon";
import { Coupon } from "@/types/coupon";
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
  key: "checkBuyXgetY",
  get:
    ({ get }) =>
    (minQuantity: number) => {
      const selectedItemsId = get(selectedCartItemsIdState);

      const targetItemsId = selectedItemsId.filter((id: number) => {
        return get(cartItemQuantityState(id)) >= minQuantity;
      });

      if (!targetItemsId.length) return false;

      const cartItems = get(cartItemsState);

      const maxPriceItem = targetItemsId.reduce((maxId, currentId) => {
        const currentPrice = cartItems.find((item) => item.id === currentId)!
          .product.price;
        const targetPrice = cartItems.find((item) => item.id === maxId)!.product
          .price;
        if (currentPrice > targetPrice) {
          maxId = currentId;
        }
        return maxId;
      }, targetItemsId[0]);
      return maxPriceItem;
    },
});
