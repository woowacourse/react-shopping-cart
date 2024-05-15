import { DefaultValue, selector } from "recoil";
import { cartQuantityState, cartPriceState, cartSelectedState } from "./atoms";
import ORDER from "../constants/order";
import { CartItemResponse } from "../types/ShoppingCart";
import { fetchCartItems } from "../api/cartItem";

export const cartTotalPriceState = selector({
  key: "cartTotalPriceState",
  get: ({ get }) => {
    const ids = get(cartSelectedState);
    return ids.reduce((total, id) => {
      const quantity = get(cartQuantityState(id));
      const price = get(cartPriceState(id));
      return total + quantity * price;
    }, 0);
  },
});

export const shippingFeeState = selector({
  key: "shippingFeeState",
  get: ({ get }) => {
    const totalPrice = get(cartTotalPriceState);
    return totalPrice < ORDER.shippingFreeThreshold ? ORDER.shippingFee : 0;
  },
});

export const addCartSelect = selector({
  key: "addCartSelectState",
  get: () => {
    return 0;
  },
  set: ({ set }, id) => {
    if (typeof id !== "number") return;
    set(cartSelectedState, (prevSelected) => [...prevSelected, id]);
  },
});

export const removeCartSelect = selector({
  key: "removeCartSelectState",
  get: () => {
    return 0;
  },
  set: ({ set }, id) => {
    if (typeof id !== "number") return;
    set(cartSelectedState, (prevSelected) => prevSelected.filter((_id) => _id !== id));
  },
});

export const resetCartSelect = selector({
  key: "resetCartSelectState",
  get: () => {
    return;
  },
  set: ({ reset }) => {
    reset(cartSelectedState);
  },
});

export const checkAllCartSelect = selector({
  key: "checkAllCartSelect",
  get: () => {
    return [0];
  },
  set: ({ set }, ids) => {
    set(cartSelectedState, ids);
  },
});

export const increaseCartQuantity = selector({
  key: "increaseCartQuantity",
  get: () => {
    return 0;
  },
  set: ({ set }, id) => {
    if (typeof id !== "number") return;
    set(cartQuantityState(id), (prev) => prev + 1);
  },
});

export const decreaseCartQuantity = selector({
  key: "decreaseCartQuantity",
  get: () => {
    return 0;
  },
  set: ({ set }, id) => {
    if (typeof id !== "number") return;
    set(cartQuantityState(id), (prev) => Math.max(prev - 1, 0));
  },
});

export const setCartPrice = selector({
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
      set(cartQuantityState(item.product.id), item.quantity);
      set(cartPriceState(item.product.id), item.product.price);
    });
  },
});

export const cartItemsState = selector({
  key: "cartItemsState",
  get: async () => {
    const cartItems = await fetchCartItems();

    return cartItems;
  },
});
