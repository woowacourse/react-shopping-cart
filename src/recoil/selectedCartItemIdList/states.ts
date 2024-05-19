import { atom } from 'recoil';
import { updateSelectedCartItemIdListLocalStorage } from '../effects/updateSelectedCartItemIdListLocalStorage';

const SELECTED_CART_ITEM_ID_LOCAL_STORAGE_KEY = 'selectedCartItemIdList';

export const selectedCartItemIdListAtom = atom<number[]>({
  key: 'selectedCartItemIdListAtom',
  default: [],
  effects: [updateSelectedCartItemIdListLocalStorage(SELECTED_CART_ITEM_ID_LOCAL_STORAGE_KEY)],
});
