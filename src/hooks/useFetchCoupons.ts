import { useCallback, useEffect, useState } from 'react';
import { Coupon } from '../types/coupon';
import getCoupons from '../api/getCoupon';

function useFetchCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getCouponsData = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await getCoupons();
      setCoupons(response);
    } catch (e) {
      setError('데이터를 가져오는데 실패했습니다');
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    const fetchOnce = async () => {
      setIsLoading(true);
      await getCouponsData();
      setIsLoading(false);
    };
    fetchOnce();
  }, [getCouponsData]);

  return { coupons, error, isLoading, isFetching, setError };
}

export default useFetchCoupons;
