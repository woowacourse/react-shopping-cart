import { fetchWithoutPayload } from './fetch';

import { BASE_URL } from '.';
import MESSAGE from '../constants/Message';
import { CouponType } from '../type';

export const fetchGettingCoupons = async (): Promise<CouponType[]> => {
  const response = await fetchWithoutPayload({
    url: `${BASE_URL}/coupons`,
    method: 'GET',
    errorMessage: MESSAGE.error.gettingCoupons,
  });

  const data = await response.json();
  return data;
};
