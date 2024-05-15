export type CartItemSelected = Record<number, boolean>;

export const KEY = "cartItemSelected";

const CartItemLocalStorage = {
  get(key: string): CartItemSelected | undefined {
    const item = window.localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return undefined;
  },

  set(key: string, value: CartItemSelected) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};

export default CartItemLocalStorage;
