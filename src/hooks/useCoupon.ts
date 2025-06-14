import { useEffect, useState } from 'react';

import coupon from '../apis/coupon';

import { Coupon } from '../types/coupon';

function useCoupon() {
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCouponList = async () => {
      try {
        setIsLoading(true);
        const res = await coupon.getCouponList();
        setCouponList(res);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('쿠폰 정보를 불어오는 데 문제가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCouponList();
  }, []);

  return { couponList, isLoading, error };
}

export default useCoupon;
