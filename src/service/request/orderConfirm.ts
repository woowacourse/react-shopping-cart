import APIClient from '../../API';
import { ItemInCart } from '../../types';

export const requestOrderConfirmItems = (): Promise<ItemInCart[]> => APIClient.get('/orderConfirm');

export const requestClearOrderConfirmItems = async () => {
  const items = await requestOrderConfirmItems();

  console.log(items);

  return Promise.all(items.map((item) => APIClient.delete(`/orderConfirm/${item.id}`)));
};

//TODO: 한번씩 장바구니 주문하기에서 오류나는 현상이 있음
export const requestRegisterOrderConfirmItems = async (items: ItemInCart[]) => {
  await requestClearOrderConfirmItems();

  return Promise.all(items.map((item) => APIClient.post<ItemInCart>('/orderConfirm', item)));
};
