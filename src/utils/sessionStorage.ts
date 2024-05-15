import { CartItemId } from "../types/cartItems";

export const takeOutSelectedCartItemIds = (): CartItemId[] => {
  const selectedCartItemIds = sessionStorage.getItem("selectedCartItemIds");

  if (selectedCartItemIds) {
    return JSON.parse(selectedCartItemIds) as CartItemId[];
  }

  return [];
};

export const putInSelectedCartItemIds = (selectedCartItemIds: CartItemId[]): void => {
  sessionStorage.setItem("selectedCartItemIds", JSON.stringify(selectedCartItemIds));
};
