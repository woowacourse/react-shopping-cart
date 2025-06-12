import { useEffect, useState } from 'react';
import { getCoupons } from '../api/getCoupons';
import { Coupon } from '../types/coupon';

export const useFetchCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await getCoupons();
        setCoupons(response);
      } catch (e) {
        const err = e as Error;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { coupons, isLoading, error };
};
