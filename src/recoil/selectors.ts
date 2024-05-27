import { selector } from "recoil";
import {
  FREE_SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
} from "../constants";
import CartItemLocalStorage, { KEY } from "../services/CartItemLocalStorage";
import { CartItemType, Coupon } from "../types";
import {
  cartItemQuantity,
  cartItemSelected,
  cartListState,
  couponSelectedState,
  couponsState,
  islandMountainRegionCheckState,
} from "./atoms";

export const initializeCartItemStorage = (items: CartItemType[]) => {
    const newStorageState = items.reduce(
      (acc, item): Record<number, boolean> => {
        return { ...acc, [item.id]: false };
      },
      {}
    );
    CartItemLocalStorage.set("cartItemSelected", newStorageState);
};

export const cartListTotalPrice = selector({
  key: "cartListTotalPrice",
  get: ({ get }) => {
    const cartList = get(cartListState);
    const totalPrice = cartList.reduce((acc, cartItem) => {
      const isSelectedItem = get(cartItemSelected(cartItem.id));
      const quantity = get(cartItemQuantity(cartItem.id));

      if (isSelectedItem) return acc + quantity * cartItem.product.price;
      return acc;
    }, 0);

    return totalPrice;
  },
});

export const selectedCartItems = selector<CartItemType[]>({
  key: "selectedCartItems",
  get: ({ get }) => {
    const cartList = get(cartListState);

    const isSelectedItems = cartList.filter((cartItem) =>
      get(cartItemSelected(cartItem.id))
    );

    return isSelectedItems;
  },
});

export const cartListTotalQuantity = selector({
  key: "cartListTotalQuantity",
  get: ({ get }) => {
    const cartList = get(cartListState);
    const totalQuantity = cartList.reduce((acc, cartItem) => {
      const quantity = get(cartItemQuantity(cartItem.id));
      return acc + quantity;
    }, 0);

    return totalQuantity;
  },
});

export const orderListTotalQuantitySelector = selector({
  key: "orderListTotalQuantitySelector",
  get: ({ get }) => {
    const selectedCartItem = get(selectedCartItems);
    const orderListTotalQuantity = selectedCartItem.reduce((acc, cartItem) => {
      const quantity = get(cartItemQuantity(cartItem.id));
      return acc + quantity;
    }, 0);

    return orderListTotalQuantity;
  },
});

export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    const totalPrice = get(cartListTotalPrice);
    const islandMountainRegionCheck = get(islandMountainRegionCheckState);

    if (totalPrice >= FREE_SHIPPING_THRESHOLD)
      return islandMountainRegionCheck
        ? FREE_SHIPPING_FEE + 3_000
        : FREE_SHIPPING_FEE;
    return islandMountainRegionCheck ? SHIPPING_FEE + 3_000 : SHIPPING_FEE;
  },
});

export const cartItemAllSelected = selector<boolean>({
  key: "cartItemAllSelected",
  get: ({ get }) => {
    const storageState = CartItemLocalStorage.get(KEY);

    if (storageState) {
      const cartItemIds = Object.keys(storageState);
      const isAllSelected = cartItemIds.every((id) =>
        get(cartItemSelected(parseInt(id)))
      );
      return isAllSelected;
    }
    return false;
  },
  set: ({ set }, newValue) => {
    const storageState = CartItemLocalStorage.get(KEY);
    if (storageState) {
      Object.keys(storageState).forEach((id) => {
        set(cartItemSelected(parseInt(id)), newValue);
      });
    }
  },
});

export const selectedCouponSelector = selector<Coupon[]>({
  key: "selectedCouponSelector",
  get: ({ get }) => {
    const coupons: Coupon[] = get(couponsState);

    const selectedCoupons = coupons.filter((coupon: Coupon) =>
      get(couponSelectedState(coupon.id))
    );

    return selectedCoupons;
  },
});
