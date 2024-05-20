import { CartItemType, FilteredCartItemStateType } from "@/types/cart.type";
import { atom, atomFamily, selectorFamily } from "recoil";

import { cartState } from "@/store/selectors/dataFetchSelector";
import localStorageEffect from "@/store/localStorageEffect";

export const cartListState = atom<CartItemType[]>({
  key: "cartListState",
  default: cartState,
});

export const filteredCartItemState = atomFamily<
  FilteredCartItemStateType,
  number
>({
  key: "cartItemState",
  default: selectorFamily({
    key: "cartItemState/Default",
    get:
      (id) =>
      ({ get }) => {
        const cartList = get(cartListState);
        const item = cartList.find((item) => item.id);

        if (!item) {
          throw new Error("item does not exist in cartList");
        }

        return {
          id,
          quantity: item.quantity,
          price: item.product.price,
          isSelected: false,
        };
      },
  }),
  effects: (id) => [localStorageEffect(`cartItemState_${id}`)],
});
