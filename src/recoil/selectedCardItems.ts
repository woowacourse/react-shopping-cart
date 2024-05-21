import { atomFamily, selector } from 'recoil';

import { localStorageEffect } from '../util/localStorage';
import { fetchedCartItemsSelector } from './fetch';

export const selectedCartItemsState = atomFamily<boolean, number>({
  key: 'cartItem',
  default: true,
  effects: (param) => [localStorageEffect(`cartItem_${param}`, true)],
});

/**
 * 카트 상품 전체 선택
 * get: 각 리스트의 상품들이 전부 선택되었는지를 판단 .
 * set: 카트 상품 전체 선택 버튼 클릭 시 각 상품들 선택 취소 or 선택
 */
export const selectedAllCartItemState = selector<boolean>({
  key: 'selectedAllCardItems',
  get: ({ get }) => {
    return get(cartItemsIdState).every((itemId) =>
      get(selectedCartItemsState(itemId)),
    );
  },
  set: ({ set, get }, newValue) => {
    get(cartItemsIdState).forEach((itemId) => {
      set(selectedCartItemsState(itemId), newValue);
    });
  },
});

/**
 * 모든 카트 상품들이 선택 해제되었는지 확인
 */
export const selectedSomeCartItemsState = selector<boolean>({
  key: 'selectedSomeCardItems',
  get: ({ get }) => {
    return get(cartItemsIdState).some((cartItemId) =>
      get(selectedCartItemsState(cartItemId)),
    );
  },
});

export const cartItemsIdState = selector({
  key: 'cartItemsId',
  get: ({ get }) => {
    return get(fetchedCartItemsSelector).map((cartItem) => cartItem.id);
  },
});
