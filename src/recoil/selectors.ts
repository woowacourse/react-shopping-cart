import { selector } from "recoil";
import {
  FREE_SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
} from "../constants";
import CartItemLocalStorage, { KEY } from "../services/CartItemLocalStorage";
import { CartItemType } from "../types";
import { cartItemQuantity, cartItemSelected, cartListState } from "./atoms";

export const initializeCartItemStorage = (items: CartItemType[]) => {
  const storageState = CartItemLocalStorage.get("cartItemSelected");
  if (!storageState) {
    const newStorageState = items.reduce(
      (acc, item): Record<number, boolean> => {
        return { ...acc, [item.id]: false };
      },
      {}
    );
    CartItemLocalStorage.set("cartItemSelected", newStorageState);
  }
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

export const shippingFee = selector({
  key: "shippingFee",
  get: ({ get }) => {
    const totalPrice = get(cartListTotalPrice);

    if (totalPrice >= FREE_SHIPPING_THRESHOLD) return FREE_SHIPPING_FEE;
    return SHIPPING_FEE;
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
