import getCoupons from '@api/get/getCoupons';
import useFetch from '../useFetch';
import useExpirationDate from './useExpirationDate';
import dayjs from '@utils/dayjs';

const useLoadCoupon = () => {
  const { data: coupons } = useFetch(getCoupons);
  const { isExpired } = useExpirationDate();
  const now = dayjs().format('YYYY-MM-DD');
  const notExpiredCoupon = coupons?.filter(coupon => !isExpired(coupon.expirationDate, now));

  return notExpiredCoupon ?? [];
};

export default useLoadCoupon;
