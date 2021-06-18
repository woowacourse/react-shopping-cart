import APIClient from '../../API';
import { CartItem, Order } from '../../types';

export const requestOrderItems = (userName: string, items: CartItem[]) => {
  const orderItem = items.map(({ cartId, quantity }) => ({
    cartId: cartId,
    quantity,
  }));

  return APIClient.post(`/customers/${userName}/orders`, orderItem);
};

export const requestOrders = (userName: string) =>
  APIClient.get(`/customers/${userName}/orders`) as Promise<Order[]>;
