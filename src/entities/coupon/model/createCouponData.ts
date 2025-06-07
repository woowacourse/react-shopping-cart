import { useState } from 'react';
import { CouponType } from '@entities/coupon/type/coupon.type';

export interface CouponData {
  coupons: CouponType[];
  isLoading: boolean;
  errorMessage: string | null;
  setCoupons: (coupons: CouponType[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCouponData = () => {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setError] = useState<string | null>(null);

  return {
    coupons,
    isLoading,
    errorMessage,

    setCoupons,
    setLoading,
    setError,
  };
};
