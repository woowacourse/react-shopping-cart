import getCoupons from '../../api/get/getCoupons';
import useFetch from '../useFetch';

const useLoadCoupon = () => {
  const { data: coupons } = useFetch(getCoupons);
  return coupons ?? [];
};

export default useLoadCoupon;
