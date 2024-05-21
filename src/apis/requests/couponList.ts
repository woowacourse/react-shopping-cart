import { Coupon } from '../../types/coupon.type';
import { BASE_URL_LIST } from '../baseUrlList';
import { ENDPOINT_LIST } from '../endpointList';
import { requestGet } from '../fetcher';

export const requestCouponList = async (): Promise<Coupon[]> => {
  return await requestGet<Coupon[]>({
    baseUrl: BASE_URL_LIST.CART,
    endpoint: ENDPOINT_LIST.COUPON_LIST,
  });
};
