import { atomFamily, selector, selectorFamily } from 'recoil';

import {
  patchCartItemQuantityQuery,
  deleteItemQuery,
  postCartItemQuery,
  cartQuery,
} from '../api/api';
import type { CartType } from '../type/cart';

interface RequestAction {
  action: string;
  payload?: any;
}

export const cartRequestAction = atomFamily<RequestAction, any>({
  key: 'cartRequestAction',
  default: { action: 'GET', payload: {} },
});

export const cartState = selectorFamily<CartType[], any>({
  key: 'exampleCartQuery',
  get:
    (request) =>
    async ({ get }) => {
      const { action, payload } = get(cartRequestAction(request)); // add dependency
      switch (action) {
        case 'GET':
          return await cartQuery();
        case 'POST':
          const cartId = await postCartItemQuery(payload.productId);
          await patchCartItemQuantityQuery(cartId, payload.quantity);
          return await cartQuery();
        case 'PATCH':
          await patchCartItemQuantityQuery(payload.cartId, payload.quantity);
          return await cartQuery();
        case 'DELETE':
          await deleteItemQuery(payload.cartId);
          return await cartQuery();
        default:
          return await cartQuery();
      }
    },
});

export const cartTotalState = selector({
  key: 'cartTotalState',
  get: async ({ get }) => {
    const cart = get(cartState({ action: 'GET' }));
    return cart.length;
  },
});
