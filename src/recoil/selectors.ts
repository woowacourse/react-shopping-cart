import { DefaultValue, selector } from "recoil";
import { cartItemQuantityStates, cartItemPriceStates, checkedCartItemsState, userLiveInSigolStates } from "./atoms";
import { CartItemResponse } from "../types/ShoppingCart";
import { fetchCartItems, fetchCoupons } from "../api/cartItem";
import ORDER from "../constants/order";

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

export const checkedCartItemsQuantityAndPriceState = selector({
  key: "checkedCartItemsQuantityAndPriceState",
  get: ({ get }) => {
    const ids = get(checkedCartItemsState);

    return ids.map((id) => {
      const quantity = get(cartItemQuantityStates(id));
      const price = get(cartItemPriceStates(id));
      return { id, quantity, price };
    });
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

export const shippingFeeState = selector({
  key: "shippingFeeState",
  get: ({ get }) => {
    const totalAmount = get(totalCheckedCartItemsPriceState);
    if (totalAmount >= ORDER.shippingFreeThreshold) return 0;

    const userLiveInSigol = get(userLiveInSigolStates);
    return userLiveInSigol ? ORDER.sigolShippingFee : ORDER.shippingFee;
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

export const getCoupons = selector({
  key: "getCoupons",
  get: async () => {
    const coupons = await fetchCoupons();

    return coupons;
  },
});
