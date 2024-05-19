import { selector } from 'recoil';
import { fetchItems } from '../api';
import { itemsState } from './atoms';

/**
 * 장바구니 초기 데이터 API 호출
 */
export const fetchItemsSelector = selector({
  key: 'fetchItemsSelector',
  get: async () => {
    const data = await fetchItems();
    return data;
  },
  set: ({ set }, newValue) => {
    set(itemsState, newValue);
  },
});
