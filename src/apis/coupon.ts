import fetcher from './fetcher';

import { REQUEST_URL } from '@constants/url';

export const fetchCouponList = async () => {
  const res = await fetcher.get({ requestUrl: REQUEST_URL.coupons });
  const result = await res.json();

  return result;
};
