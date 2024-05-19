import { CartItemId } from "../types/cartItems";
import Store from "./store";

const sessionStore = new Store(window.sessionStorage);

const KEY = {
  selectedCartItemIds: "selectedCartItemIds",
} as const;

export const takeOutSelectedCartItemIds = (): CartItemId[] => {
  const selectedCartItemIds = sessionStore.get<CartItemId[]>(KEY.selectedCartItemIds);

  return selectedCartItemIds ?? [];
};

export const putInSelectedCartItemIds = (selectedCartItemIds: CartItemId[]): void => {
  sessionStore.set(KEY.selectedCartItemIds, selectedCartItemIds);
};
