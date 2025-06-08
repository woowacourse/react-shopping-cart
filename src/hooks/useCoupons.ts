import { useEffect, useState } from 'react';
import { Coupon } from '../types';
import getCoupons from '../api/getCoupons';

const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const fetchData = async () => {
    const content = await getCoupons();
    setCoupons(content);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { coupons };
};

export default useCoupons;
