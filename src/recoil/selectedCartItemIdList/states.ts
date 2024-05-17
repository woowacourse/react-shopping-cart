import { atom } from 'recoil';
import { localStorageEffect } from '../effects/localStorageEffect';

const SELECTED_CART_ITEM_ID_LOCAL_STORAGE_KEY = 'selectedCartItemIdList';

export const selectedCartItemIdListAtom = atom<number[]>({
  key: 'selectedCartItemIdListAtom',
  default: [],
  effects: [localStorageEffect(SELECTED_CART_ITEM_ID_LOCAL_STORAGE_KEY)],
  // TODO: 값이 없으면 기존 모든 항목들을 전체선택하도록(아니면 페이지 로딩됐을 때 내가 전체선택 로직을 수행하던가)
});
