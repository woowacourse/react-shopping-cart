import { Coupon } from '../components/Modal/CouponModal';
import { URLS } from '../constants/url';
import { httpClient } from './httpClient';

const getCoupons = async (): Promise<Coupon[]> => {
  const res = await httpClient.get(URLS.COUPONS);

  if (!res.ok) {
    throw new Error('쿠폰 데이터를 불러오는 데 실패했습니다.');
  }

  return res.json();
};

export default getCoupons;
