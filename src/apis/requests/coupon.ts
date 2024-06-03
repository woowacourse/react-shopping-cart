import { COUPON_PRIORITY } from '../../constants/coupon';
import { Coupon } from '../../types/coupon.type';
import { BASE_URL_LIST } from '../baseUrlList';
import { COUPON } from '../endpointList';
import { requestGet } from '../fetcher';

const setCouponPriorities = (couponList: Coupon[]) => {
  return couponList.map((coupon) => ({
    ...coupon,
    priority: COUPON_PRIORITY[coupon.discountType],
  }));
};

export const requestCouponList = async (): Promise<Coupon[]> => {
  const couponList = await requestGet<Coupon[]>({
    baseUrl: BASE_URL_LIST.CART,
    endpoint: COUPON.COUPON_LIST,
  });

  return setCouponPriorities(couponList);
};
