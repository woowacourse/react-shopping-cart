import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { CartItem } from '../types';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorage';

export const getOrderConfirmItems = (): CartItem[] => {
  const orderConfirmItems = getLocalStorageItem<CartItem[]>(LOCAL_STORAGE_KEY.ORDER_CONFIRM);

  if (!orderConfirmItems) {
    return [];
  }

  return orderConfirmItems;
};

export const setOrderConfirmItems = (items: CartItem[]) => {
  setLocalStorageItem(LOCAL_STORAGE_KEY.ORDER_CONFIRM, items);
};
