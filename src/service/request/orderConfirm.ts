import APIClient from '../../API';
import { ItemInCart } from '../../types';

export const requestOrderConfirmItems = (): Promise<ItemInCart[]> => APIClient.get('/orderConfirm');

export const requestClearOrderConfirmItems = async () => {
  const items = await requestOrderConfirmItems();

  return Promise.all(items.map((item) => APIClient.delete(`/orderConfirm/${item.id}`)));
};

export const requestRegisterOrderConfirmItems = async (items: ItemInCart[]) => {
  await requestClearOrderConfirmItems();
  return Promise.all(items.map((item) => APIClient.post<ItemInCart>('/orderConfirm', item)));
};
