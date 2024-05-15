import { DefaultValue, selector } from 'recoil';
import { OrderedItem, Recipe } from '@/types/recipe.type';
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

export const recipeState = selector<Recipe>({
  key: 'recipeState',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const cartItemStates = cartList.map((state) =>
      get(cartItemState(state.id))
    );

    const orderPrice = cartItemStates.reduce((acc, cur) => {
      if (cur.isSelected) {
        acc += cur.price * cur.quantity;
      }
      return acc;
    }, 0);

    const shippingFee = orderPrice > 100000 ? 0 : 3000;
    const totalPrice = orderPrice + shippingFee;

    return {
      orderPrice,
      shippingFee,
      totalPrice,
    };
  },
});

export const orderedItemState = selector<OrderedItem>({
  key: 'orderedItemState',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const cartItemStates = cartList.map((state) =>
      get(cartItemState(state.id))
    );

    return cartItemStates.reduce(
      (acc, cur) => {
        if (cur.isSelected) {
          acc.itemCount++;
          acc.totalQuantity += cur.quantity;
        }
        return acc;
      },
      { itemCount: 0, totalQuantity: 0 }
    );
  },
});
