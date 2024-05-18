import { DefaultValue, selector } from 'recoil';
import { itemDetailsState, itemsState } from './atoms';
import { CartItems } from '../types/Item';
import { updateLocalStorage } from '../utils/UpdateLocalStorage';
import { fetchItems } from '../api';

/**
 * 전체 금액, 배송비 계산, 총 결제 금액 계산
 */
export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    let totalAmount = 0;
    productIds.forEach((itemsState) => {
      const { quantity, price, isChecked } = get(
        itemDetailsState(itemsState.id),
      );
      if (isChecked) {
        totalAmount += quantity * price;
      }
    });
    const deliveryFee = totalAmount >= 100000 || totalAmount === 0 ? 0 : 3000;
    const calculatedTotalAmount = totalAmount + deliveryFee;
    return { totalAmount, deliveryFee, calculatedTotalAmount };
  },
});

/**
 * get: () => boolean
 * set: (newValue: 변경할 boolean 값) => void
 * 전체 선택 체크 시 모든 itemDetailsState의 isChecked 변경,
 * LocalStorage 업데이트
 */
export const toggleAllSelector = selector<boolean>({
  key: 'toggleAllSelector',
  get: ({ get }): boolean => {
    const items: CartItems[] = get(itemsState);
    return items.every((item) => get(itemDetailsState(item.id)).isChecked);
  },
  set: ({ get, set }, newValue: boolean | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const items: CartItems[] = get(itemsState);
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
    const productIds = get(itemsState);
    const totalItemTypeCount = productIds.length;
    let totalCount = 0;
    productIds.forEach((itemsState) => {
      const { quantity, isChecked } = get(itemDetailsState(itemsState.id));
      if (isChecked) {
        totalCount += quantity;
      }
    });
    return { totalItemTypeCount, totalCount };
  },
});

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
