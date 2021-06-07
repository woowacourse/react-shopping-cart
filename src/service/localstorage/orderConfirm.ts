import { CartItem } from '../../types';

//TODO: key 상수화
export const getOrderConfirmItemsInLocalStorage = (): CartItem[] => {
  const jsonItems = localStorage.getItem('orderConfirm');

  if (!jsonItems) {
    return [];
  }

  return JSON.parse(jsonItems);
};

export const setOrderConfirmItemsInLocalStorage = (items: CartItem[]) => {
  const jsonItems = JSON.stringify(items);

  localStorage.setItem('orderConfirm', jsonItems);
};
