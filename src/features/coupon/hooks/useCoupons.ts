import { useEffect, useState } from 'react';
import { Coupon } from '../types/coupon';
import { getCoupons } from '../api/getCoupons';

export default function useCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const fetchCoupons = async () => {
    const response = await getCoupons();
    setCoupons(response);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return { coupons };
}
