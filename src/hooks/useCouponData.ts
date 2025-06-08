import { useData } from '../context/DataContext';
import { Coupon } from '../types/coupon';
import { getCoupons } from '../apis/coupon';

export const useCouponData = () => {
  const { data: coupons, refetch } = useData<Coupon[]>({
    fetcher: getCoupons,
    name: 'coupons',
  });

  return { coupons, refetch };
};
