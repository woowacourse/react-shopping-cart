import { atom, selector } from "recoil";
import {
  selectedCartItemsIdState,
  selectedCartListSelector,
} from "./selectedCardItems";
import {
  cartItemQuantityState,
  cartListQuantitySelector,
} from "@/recoil/cartItemQuantity";
import { cartItemsState } from "@/recoil/cartItems";

export const totalItemsPriceSelector = selector({
  key: "totalItemsPriceSelector",
  get: ({ get }) => {
    const selectedItemsIds = get(selectedCartItemsIdState);
    if (!selectedItemsIds.length) return 0;

    const totalPrice = selectedItemsIds.reduce((acc, id) => {
      const targetItem = get(cartItemsState).find((item) => item.id === id);
      const quantity = get(cartItemQuantityState(id));
      if (targetItem) {
        acc += targetItem.product.price * quantity;
        return acc;
      }
      return acc;
    }, 0);

    return totalPrice;
  },
});

export const totalItemOrderCountSelector = selector({
  key: "totalItemOrderCountSelector",

  get: ({ get }) => {
    const selectedItems = get(selectedCartListSelector);
    const itemListQuantity = get(cartListQuantitySelector);
    if (!selectedItems.length) return 0;

    const totalItemOrder = selectedItems.reduce((acc, selectedItem) => {
      const targetItem = itemListQuantity.find(
        (item) => item.item.id === selectedItem.id
      );
      if (targetItem) {
        acc += targetItem.quantity;
      }
      return acc;
    }, 0);

    return totalItemOrder;
  },
});

export const finalOrderAmountState = atom({
  key: "finalOrderAmountState",
  default: 0,
});
