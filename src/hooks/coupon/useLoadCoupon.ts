import getCoupons from '@api/get/getCoupons';
import useFetch from '../useFetch';
import useExpirationDate from './useExpirationDate';

const useLoadCoupon = () => {
  const { data: coupons } = useFetch(getCoupons);
  const { isExpired } = useExpirationDate();
  const notExpiredCoupon = coupons?.filter(coupon => !isExpired(coupon.expirationDate));

  return notExpiredCoupon ?? [];
};

export default useLoadCoupon;
