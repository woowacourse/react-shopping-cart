export type CartItemSelected = Record<number, boolean>;

export const CART_ITEM_SELECTED_KEY = 'cartItemSelected';

const CartItemLocalStorage = {
  get(key: string): CartItemSelected | undefined {
    const item = window.localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return undefined;
  },

  set(key: string, value: CartItemSelected) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  delete(key: string, id: number) {
    const items = CartItemLocalStorage.get(key);
    if (!items) return;

    delete items[id];
    CartItemLocalStorage.set(key, items);
  },
};

export default CartItemLocalStorage;
