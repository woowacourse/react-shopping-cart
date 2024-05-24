import { generateBasicToken } from '../../utils/auth';

import { fetchData } from '../';
import { USER_ID, USER_PASSWORD, API_ROUTE } from '../constants/apiSetting';
import { Coupon } from '../../type';

export async function fetchCoupons(): Promise<Coupon[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetchData({ url: API_ROUTE.COUPONS, method: 'GET', token });
  const couponsData = await response.json();
  return couponsData.content;
}
