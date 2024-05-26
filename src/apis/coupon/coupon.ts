import { fetchData } from '../';
import { API_ROUTE } from '../constants/apiSetting';
import { Coupon } from '../../type';

export async function fetchCoupons(): Promise<Coupon[]> {
  const response = await fetchData({ url: API_ROUTE.COUPONS, method: 'GET' });
  const couponsData = await response.json();
  return couponsData;
}
