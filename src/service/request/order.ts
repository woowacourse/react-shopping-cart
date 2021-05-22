import APIClient from '../../API';
import { CartItem, Order } from '../../types';

export const requestOrderItems = (userName: string, items: CartItem[]) => {
  const orderItem = items.map(({ cart_id, quantity }) => ({
    cart_id,
    quantity,
  }));

  return APIClient.post(`/customers/${userName}/orders`, orderItem);
};

export const requestOrders = (userName: string) =>
  APIClient.get<Order[]>(`/customers/${userName}/orders`);
