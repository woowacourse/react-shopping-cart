import APIClient from '../../API';
import { CartItem } from '../../types';

export const requestOrderConfirmItems = (): Promise<CartItem[]> => APIClient.get('/orderConfirm');

export const requestClearOrderConfirmItems = async () => {
  const items = await requestOrderConfirmItems();

  return Promise.all(items.map((item) => APIClient.delete(`/orderConfirm/${item.id}`)));
};

export const requestRegisterOrderConfirmItems = async (items: CartItem[]) => {
  await requestClearOrderConfirmItems();
  return Promise.all(items.map((item) => APIClient.post<CartItem>('/orderConfirm', item)));
};
