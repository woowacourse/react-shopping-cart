import { atom, selector } from "recoil";
import { selectedCartItemList } from "./selectedCardItems";

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
    if (!selectedItems.length) return 0;

    const totalItemOrderCount = selectedItems.reduce((acc, item) => {
      acc += item.product.price;
      return acc;
    }, 0);

    return totalItemOrderCount;
  },
});

export const finalOrderAmountState = atom({
  key: "finalOrderAmountState",
  default: 0,
});
