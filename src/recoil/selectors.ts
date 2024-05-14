import { selector } from "recoil";
import { cartQuantityAndPriceState, cartSelectedState } from "./atoms";
import ORDER from "../constants/order";

export const cartTotalPriceState = selector({
  key: "cartTotalPriceState",
  get: ({ get }) => {
    const ids = get(cartSelectedState);
    return ids.reduce((total, id) => {
      const { quantity, price } = get(cartQuantityAndPriceState(id));
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
  get: ({ get }) => {
    return get(cartSelectedState);
  },
  set: ({ set }, id) => {
    if (typeof id !== "number") return;
    set(cartSelectedState, (prevSelected) => [...prevSelected, id]);
  },
});

export const removeCartSelect = selector({
  key: "removeCartSelectState",
  get: ({ get }) => {
    return get(cartSelectedState);
  },
  set: ({ set }, id) => {
    if (typeof id !== "number") return;
    set(cartSelectedState, (prevSelected) => prevSelected.filter((_id) => _id !== id));
  },
});

export const increaseCartQuantity = selector({
  key: "increaseCartQuantity",
  get: () => {
    return 1;
  },
  set: ({ set }, id) => {
    if (typeof id !== "number") return;
    set(cartQuantityAndPriceState(id), (prev) => ({ quantity: prev.quantity + 1, price: prev.price }));
  },
});

export const decreaseCartQuantity = selector({
  key: "increaseCartQuantity",
  get: ({ get }) => {
    return get(cartSelectedState);
  },
  set: ({ set }, id) => {
    if (typeof id !== "number") return;
    set(cartQuantityAndPriceState(id), (prev) => ({ quantity: prev.quantity - 1, price: prev.price }));
  },
});
