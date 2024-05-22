import { selector, selectorFamily } from 'recoil';
import { selectedCartItemListState, isSigolState } from '../atoms/atoms';
import { calculateDeliveryFee } from '../../../utils/calculateDeliveryFee';
import { TCartItem } from '../../../types/CartItem.type';

export const selectedCartItemListSelector = selectorFamily<boolean, TCartItem>({
  key: 'selectedCartItemListSelector',
  get:
    (newItem: TCartItem) =>
    ({ get }) => {
      const selectedCartItemList = get(selectedCartItemListState);
      return selectedCartItemList.some((item) => item.id === newItem.id);
    },
  set:
    (newItem: TCartItem) =>
    ({ set, get }) => {
      const selectedCartItemList = get(selectedCartItemListState);
      const isSelected = selectedCartItemList.some((item) => item.id === newItem.id);

      set(
        selectedCartItemListState,
        isSelected ? selectedCartItemList.filter((item) => item.id !== newItem.id) : [...selectedCartItemList, newItem],
      );
    },
});

export const totalOrderPriceSelector = selector({
  key: 'totalOrderPriceSelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);
    return selectedCartItemList.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export const totalOrderCountSelector = selector({
  key: 'totalOrderCountSelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);
    return selectedCartItemList.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});

export const deliveryFeeSelector = selector({
  key: 'deliveryFeeSelector',
  get: ({ get }) => {
    const isSigol = get(isSigolState);
    const totalOrderPrice = get(totalOrderPriceSelector);

    return calculateDeliveryFee(totalOrderPrice, isSigol);
  },
});
