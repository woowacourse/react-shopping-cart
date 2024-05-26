import { requestServer } from '../requestServer';

export async function fetchCreateOrder(cartIds: number[]): Promise<void> {
  await requestServer('/orders', 'POST', { cartItemIds: cartIds });
}
