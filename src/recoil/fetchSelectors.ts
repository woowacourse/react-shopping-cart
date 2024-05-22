import { selector } from 'recoil';
import { fetchCoupons, fetchItems } from '../api';
import { couponsState, itemsState } from './atoms';

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

/**
 * 쿠폰 목록 데이터 API 호출
 */
export const fetchCouponsSelector = selector({
  key: 'fetchCouponsSelector',
  get: async () => {
    const data = await fetchCoupons();
    return data;
  },
  set: ({ set }, newValue) => {
    set(couponsState, newValue);
  },
});
