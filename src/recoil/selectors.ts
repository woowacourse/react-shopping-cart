import { DefaultValue, selector } from "recoil";
import { cartItemQuantityStates, cartItemPriceStates, checkedCartItemsState } from "./atoms";
import { CartItemResponse } from "../types/ShoppingCart";
import { fetchCartItems } from "../api/cartItem";

export const checkedCartItemsQuantityState = selector({
  key: "checkedCartItemsQuantityState",
  get: ({ get }) => {
    const ids = get(checkedCartItemsState);

    return ids.reduce((total, id) => {
      const quantity = get(cartItemQuantityStates(id));
      return total + quantity;
    }, 0);
  },
});

export const totalCheckedCartItemsPriceState = selector({
  key: "totalCheckedCartItemsPriceState",
  get: ({ get }) => {
    const ids = get(checkedCartItemsState);
    return ids.reduce((total, id) => {
      const quantity = get(cartItemQuantityStates(id));
      const price = get(cartItemPriceStates(id));
      return total + quantity * price;
    }, 0);
  },
});

export const setCartPriceAndQuantitySelector = selector({
  key: "setCartPrice",
  get: () => {
    const cartItems: CartItemResponse[] = [
      {
        id: 0,
        product: {
          id: 0,
          name: "",
          price: 0,
          imageUrl: "",
          category: "",
        },
        quantity: 0,
      },
    ];

    return cartItems;
  },
  set: ({ set }, cartItems) => {
    if (cartItems instanceof DefaultValue) return;

    cartItems.forEach((item) => {
      set(cartItemQuantityStates(item.id), item.quantity);
      set(cartItemPriceStates(item.id), item.product.price);
    });
  },
});

export const getCartItems = selector({
  key: "getCartItems",
  get: async () => {
    const cartItems = await fetchCartItems();

    return cartItems;
  },
});
