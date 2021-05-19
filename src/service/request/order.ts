import { nanoid } from 'nanoid';
import APIClient from '../../API';
import { CartItem, Order } from '../../types';

export const requestOrderItems = (items: CartItem[]) => {
  const newOrder: Order = { id: nanoid(), items };
  APIClient.post<Order>('/order', newOrder);
};

export const requestOrders = () => {
  return APIClient.get<Order[]>('/order');
};
