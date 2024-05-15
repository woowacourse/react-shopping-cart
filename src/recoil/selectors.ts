import { DefaultValue, selector } from 'recoil';
import { itemDetailsState, itemsState } from './atoms';
import { Products } from '../types/Product';
import UpdateLocalStorage from '../utils/UpdateLocalStorage';

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
    const deliveryFee = totalAmount >= 100000 ? 0 : 3000;
    const calculatedTotalAmount = totalAmount + deliveryFee;
    return { totalAmount, deliveryFee, calculatedTotalAmount };
  },
});

export const totalCartItemCountSelector = selector({
  key: 'totalCartItemCountSelector',
  get: ({ get }) => {
    const products = get(itemsState);
    return products.length;
  },
});

export const toggleAllSelector = selector<boolean>({
  key: 'toggleAllSelector',
  get: ({ get }): boolean => {
    const items: Products[] = get(itemsState);
    return items.every((item) => get(itemDetailsState(item.id)).isChecked);
  },
  set: ({ get, set }, newValue: boolean | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const items: Products[] = get(itemsState);
    items.forEach((item) => {
      set(itemDetailsState(item.id), (prev) => ({
        ...prev,
        isChecked: newValue,
      }));
      UpdateLocalStorage({ id: item.id, isChecked: newValue });
    });
  },
});

export const totalCountSelector = selector({
  key : 'totalCountSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    const totalItemTypeCount =productIds.length
    let totalCount = 0;
    productIds.forEach((itemsState) => {
      const { quantity, isChecked } = get(
        itemDetailsState(itemsState.id),
      );
      if (isChecked) {
        totalCount += quantity;
      }
    });
    return { totalItemTypeCount, totalCount };
  },
})