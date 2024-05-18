import { DefaultValue, selector } from "recoil";
import { cartListState, filteredCartItemState } from "@/store/atoms";

export const allSelectedState = selector<boolean>({
  key: "allSelectedState",
  get: ({ get }) => {
    const cartList = get(cartListState);

    const cartItemStates = cartList.map((state) =>
      get(filteredCartItemState(state.id))
    );

    return cartItemStates.every((state) => state.isSelected === true);
  },

  set: ({ set, get }, isSelected) => {
    if (isSelected instanceof DefaultValue) {
      return;
    }
    const cartList = get(cartListState);
    const cartItemStates = cartList.map((state) =>
      get(filteredCartItemState(state.id))
    );

    cartItemStates.forEach((state) => {
      set(filteredCartItemState(state.id), {
        ...get(filteredCartItemState(state.id)),
        isSelected,
      });
    });
  },
});
