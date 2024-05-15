import { selector } from "recoil";
import { fetchCartItems } from "../api";
import CartItemLocalStorage, { KEY } from "../services/CartItemLocalStorage";
import { CartItemType } from "../types";
import { cartItemQuantity, cartItemSelected } from "./atoms";

const initializeCartItemStorage = (items: CartItemType[]) => {
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

export const cartListState = selector<CartItemType[]>({
  key: "cartListState",
  get: async () => {
    const items = await fetchCartItems();
    initializeCartItemStorage(items);

    return items;
  },
});

export const cartListTotalPrice = selector({
  key: "cartListTotalPrice",
  get: ({ get }) => {
    const cartList = get(cartListState);
    const totalPrice = cartList.reduce((acc, cartItem) => {
      const quantity = get(cartItemQuantity(cartItem.id));
      return acc + quantity * cartItem.product.price;
    }, 0);

    return totalPrice;
  },
});

export const shippingFee = selector({
  key: "shippingFee",
  get: ({ get }) => {
    const totalPrice = get(cartListTotalPrice);

    if (totalPrice >= 100_000) return 0;
    return 3000;
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
