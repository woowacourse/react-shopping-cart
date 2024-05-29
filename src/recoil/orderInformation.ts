import { atom, selector } from "recoil";
import { selectedCartItemList } from "./selectedCardItems";
import { cartListQuantitySelector } from "@/recoil/cartItemQuantity";

export const totalItemsPriceSelector = selector({
  key: "totalItemsPriceSelector",
  get: ({ get }) => {
    const selectedItems = get(selectedCartItemList);
    if (!selectedItems.length) return 0;

    const totalPrice = selectedItems.reduce((acc, item) => {
      acc += item.product.price * item.quantity;
      return acc;
    }, 0);

    return totalPrice;
  },
});

export const totalItemOrderCountSelector = selector({
  key: "totalItemOrderCountSelector",

  get: ({ get }) => {
    const selectedItems = get(selectedCartItemList);
    const itemListQuantity = get(cartListQuantitySelector);
    if (!selectedItems.length) return 0;

    const totalItemOrder = selectedItems.reduce((acc, selectedItem) => {
      const targetItem = itemListQuantity.find(
        (item) => item.item.id === selectedItem.id
      );
      acc += targetItem!.quantity;
      return acc;
    }, 0);

    return totalItemOrder;
  },
});

export const finalOrderAmountState = atom({
  key: "finalOrderAmountState",
  default: 0,
});
