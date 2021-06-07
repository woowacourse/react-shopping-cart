import { LOCAL_STORAGE_KEY } from '../../constants/localStorage';
import { CartItem } from '../../types';

export const getOrderConfirmItemsInLocalStorage = (): CartItem[] => {
  const jsonItems = localStorage.getItem(LOCAL_STORAGE_KEY.ORDER_CONFIRM);

  if (!jsonItems) {
    return [];
  }

  return JSON.parse(jsonItems);
};

export const setOrderConfirmItemsInLocalStorage = (items: CartItem[]) => {
  const jsonItems = JSON.stringify(items);

  localStorage.setItem(LOCAL_STORAGE_KEY.ORDER_CONFIRM, jsonItems);
};
