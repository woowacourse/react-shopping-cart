import { requestServer } from '../requestServer';

export async function fetchCreateOrder(cartItemIds: number[]): Promise<void> {
  await requestServer('/orders', 'POST', { cartItemIds: cartItemIds });
}
