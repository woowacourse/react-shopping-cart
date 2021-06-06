import { ItemInCart } from '../../types';

//TODO: key 상수화
export const getOrderConfirmItemsInLocalStorage = (): ItemInCart[] => {
  const jsonItems = localStorage.getItem('orderConfirm');

  if (!jsonItems) {
    return [];
  }

  return JSON.parse(jsonItems);
};

export const setOrderConfirmItemsInLocalStorage = (items: ItemInCart[]) => {
  const jsonItems = JSON.stringify(items);

  localStorage.setItem('orderConfirm', jsonItems);
};
