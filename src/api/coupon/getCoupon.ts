import {CouponType} from '../../type/coupon';
import {apiClient} from '../apiClient';

export const getCoupons = (): Promise<CouponType[]> =>
  apiClient.get({endPoint: `/coupons`});
