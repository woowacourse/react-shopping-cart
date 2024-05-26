import { cartListState, filteredCartItemState } from "@/store/atoms/atoms";

import { CartItemType } from "@/types/cart.type";
import { selector } from "recoil";

export const selectedItemsState = selector<CartItemType[]>({
  key: "selectedItemsState",
  get: ({ get }) => {
    const cartList = get(cartListState);

    const cartItemStates = cartList.map((state) =>
      get(filteredCartItemState(state.id))
    );

    const selectedList = cartItemStates.reduce(
      (accList: CartItemType[], curItem) => {
        if (curItem.isSelected) {
          const findItem = cartList.find((item) => item.id === curItem.id);

          if (findItem) {
            const item = { ...findItem, quantity: curItem.quantity };
            accList.push(item);
          }
        }
        return accList;
      },
      []
    );

    return selectedList;
  },
});
