import { DefaultValue, selector } from 'recoil';
import { cartItemState, cartListState } from './atoms';

export const allSelectedState = selector<boolean>({
  key: 'allSelectedState',
  get: ({ get }) => {
    const cartList = get(cartListState);

    const cartItemStates = cartList.map((state) =>
      get(cartItemState(state.id))
    );

    return cartItemStates.every((state) => state.isSelected === true);
  },

  set: ({ set, get }, isSelected) => {
    if (isSelected instanceof DefaultValue) {
      return;
    }
    const cartList = get(cartListState);
    const cartItemStates = cartList.map((state) =>
      get(cartItemState(state.id))
    );

    cartItemStates.forEach((state) => {
      set(cartItemState(state.id), {
        ...get(cartItemState(state.id)),
        isSelected,
      });
    });
  },
});
