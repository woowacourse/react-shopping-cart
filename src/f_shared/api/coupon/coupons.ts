import { requestServer } from '../requestServer';

import { CouponsResponse } from './types';

export async function fetchCoupons(): Promise<CouponsResponse> {
  return await requestServer<CouponsResponse>('/orders', 'GET');
}
