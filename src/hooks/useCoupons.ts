import { useState, useEffect } from 'react';
import { Coupon } from '../types/coupon';
import { couponService } from '../services/couponService';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await couponService.getCoupons();

      setCoupons(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '쿠폰 목록을 불러오는데 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return {
    coupons,
    isLoading,
    error,
    refetch: fetchCoupons,
  };
};
