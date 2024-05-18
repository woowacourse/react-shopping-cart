import { CartItemType, FilteredCartItemStateType } from "@/types/cart.type";
import { atom, atomFamily } from "recoil";

import { cartState } from "@/store/selectors/dataFetchSelector";
import localStorageEffect from "@/store/localStorageEffect";

const INIT_CART_ITEM_STATE = {
  id: 0,
  quantity: 0,
  price: 0,
  isSelected: false,
};

export const filteredCartItemState = atomFamily<
  FilteredCartItemStateType,
  number
>({
  key: "cartItemState",
  default: INIT_CART_ITEM_STATE,
  effects_UNSTABLE: (id) => [localStorageEffect(`cartItemState_${id}`)],
});

export const cartListState = atom<CartItemType[]>({
  key: "cartListState",
  default: cartState,
});
