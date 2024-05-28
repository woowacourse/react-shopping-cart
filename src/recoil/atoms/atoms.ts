import { atom, selector } from "recoil";
import { getCartItems } from "../../api";
import { ERROR_MESSAGES } from "../../constants";
import { CartItem, Coupon } from "../../types";
import { getLocalStorageState } from "../../utils/getLocalStorageStore";

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: selector({
    key: "cartItemsDefault",
    get: async () => {
      try {
        const items = await getCartItems();
        return items;
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_CART_ITEMS, error);
        return [];
      }
    },
  }),
});

export const checkedItemState = atom<Record<number, boolean>>({
  key: "checkedItemState",
  default: getLocalStorageState("checkedItemState", {}),
});

export const isAllCheckedState = atom<boolean>({
  key: "isAllCheckedState",
  default: getLocalStorageState("isAllCheckedState", false),
});

export const cartSummaryState = atom({
  key: "cartSummaryState",
  default: {
    orderPrice: 0,
    deliveryPrice: 0,
    totalPrice: 0,
    uniqueItemCount: 0,
    totalItemCount: 0,
  },
});

export const selectedCartItemsState = atom<CartItem[]>({
  key: "selectedCartItemsState",
  default: [],
});

export const isShippingRegionCheckedState = atom<boolean>({
  key: "isShippingRegionCheckedState",
  default: false,
});

export const cartDeliveryPriceState = atom<number>({
  key: "cartDeliveryPriceState",
  default: 0,
});

export const orderDeliveryPriceState = atom<number>({
  key: "orderDeliveryPriceState",
  default: 0,
});

export const couponsState = atom<Coupon[]>({
  key: "couponState",
  default: [],
});

export const selectedCouponState = atom<Coupon[]>({
  key: "selectedCouponState",
  default: [],
});
