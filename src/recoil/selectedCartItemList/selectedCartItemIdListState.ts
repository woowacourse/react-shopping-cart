import { atom } from 'recoil';
import { updateSelectedCartItemIdListLocalStorage } from '../effects/updateSelectedCartItemIdListLocalStorage';

const SELECTED_CART_ITEM_ID_LOCAL_STORAGE_KEY = 'selectedCartItemIdList';

export const selectedCartItemIdListState = atom<number[]>({
  key: 'selectedCartItemIdListState',
  default: [],
  effects: [updateSelectedCartItemIdListLocalStorage(SELECTED_CART_ITEM_ID_LOCAL_STORAGE_KEY)],
});
