import { atomFamily, selector, selectorFamily } from 'recoil';

import {
  patchCartItemQuantityQuery,
  deleteItemQuery,
  postCartItemQuery,
  cartQuery,
} from '../api/api';
import type { CartType } from '../type/cart';

type GetRequestAction = {
  action: 'GET';
  payload?: {};
};

type PostRequestAction = {
  action: 'POST';
  payload: {
    productId: number;
    quantity: number;
  };
};

type PatchRequestAction = {
  action: 'PATCH';
  payload: { cartId: number; quantity: number };
};

type DeleteRequestAction = {
  action: 'DELETE';
  payload: { cartId: number };
};

type AllRequestAction =
  | GetRequestAction
  | PostRequestAction
  | PatchRequestAction
  | DeleteRequestAction;

export const cartRequestAction = atomFamily<AllRequestAction, AllRequestAction>(
  {
    key: 'cartRequestAction',
    default: { action: 'GET', payload: {} },
  }
);

export const cartState = selectorFamily<CartType[], AllRequestAction>({
  key: 'cartQuery',
  get:
    (request) =>
    async ({ get }) => {
      const { action, payload } = get(cartRequestAction(request)); // add dependency
      switch (action) {
        case 'POST':
          const cartId = await postCartItemQuery(payload.productId);
          await patchCartItemQuantityQuery(cartId, payload.quantity);
          break;
        case 'PATCH':
          await patchCartItemQuantityQuery(payload.cartId, payload.quantity);
          break;
        case 'DELETE':
          await deleteItemQuery(payload.cartId);
          break;
        case 'GET':
          break;
        default:
          throw new Error(
            'InValid Method : 유효하지 않은 요청 메서드를 사용하고 있습니다.'
          );
      }
      return await cartQuery();
    },
});

export const cartTotalState = selector({
  key: 'cartTotalState',
  get: async ({ get }) => {
    const cart = get(cartState({ action: 'GET' }));
    return cart.length;
  },
});
