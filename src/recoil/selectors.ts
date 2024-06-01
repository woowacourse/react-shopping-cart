import { DefaultValue, selector } from 'recoil';
import { couponsState, itemDetailsState, itemsState } from './atoms';
import { Items } from '../types/Item';
import { updateLocalStorage } from '../utils/LocalStorage';
import { fetchCoupons } from '../api';

/**
 * get: () => boolean
 * set: (newValue: 변경할 boolean 값) => void
 * 전체 선택 체크 시 모든 itemDetailsState의 isChecked 변경,
 * LocalStorage 업데이트
 */
export const toggleAllSelector = selector<boolean>({
  key: 'toggleAllSelector',
  get: ({ get }): boolean => {
    const items: Items[] = get(itemsState);
    return items.every((item) => get(itemDetailsState(item.id)).isChecked);
  },
  set: ({ get, set }, newValue: boolean | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const items: Items[] = get(itemsState);
    items.forEach((item) => {
      set(itemDetailsState(item.id), (prev) => ({
        ...prev,
        isChecked: newValue,
      }));
      updateLocalStorage({ id: item.id, isChecked: newValue });
    });
  },
});

/**
 * 모든 itemDetailsState를 순회하며 총 수량 계산
 */
export const totalCountSelector = selector({
  key: 'totalCountSelector',
  get: ({ get }) => {
    const items = get(itemsState);
    const totalItemTypeCount = items.length;
    let totalCount = 0;
    items.forEach((itemsState) => {
      const { quantity, isChecked } = get(itemDetailsState(itemsState.id));
      if (isChecked) {
        totalCount += quantity;
      }
    });
    return { totalItemTypeCount, totalCount };
  },
});

// /**
//  * 장바구니 초기 데이터 API 호출
//  */
// export const fetchItemsSelector = selector({
//   key: 'fetchItemsSelector',
//   get: async () => {
//     const data = await fetchItems();
//     return data;
//   },
//   set: ({ set }, newValue) => {
//     set(itemsState, newValue);
//   },
// });

/**
 * 쿠폰 리스트 API 호출
 */
export const fetchCouponsSelector = selector({
  key: 'fetchCouponsSelector',
  get: async () => {
    const data = await fetchCoupons();
    return data;
  },
});

/**
 * 주문할 상품 목록
 */
export const orderItemsSelector = selector({
  key: 'orderItemsSelector',
  get: ({ get }) => {
    const items = get(itemsState);
    const orderItems = items
      .map((item) => {
        const { quantity, isChecked } = get(itemDetailsState(item.id));
        return isChecked ? { ...item, quantity } : null;
      })
      .filter((item): item is Items => item !== null);
    return orderItems;
  },
});

/**
 * coupon isChecked 상태 변경
 * get: isChecked 쿠폰 개수 반환
 * set: isChecked 상태 변경
 */
export const couponCheckedSelector = selector<number>({
  key: 'couponCheckedSelector',
  get: ({ get }): number => {
    const coupons = get(couponsState);
    return coupons.filter((coupon) => coupon.isChecked).length;
  },
  set: ({ set, get }, newValue: number | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const coupons = get(couponsState);
    const updatedCoupons = coupons.map((coupon) =>
      coupon.id === newValue
        ? { ...coupon, isChecked: !coupon.isChecked }
        : coupon,
    );
    set(couponsState, updatedCoupons);
  },
});
