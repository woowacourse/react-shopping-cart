import { useEffect, useState } from 'react';
import { CartItem, Coupon } from '../types';
import getCoupons from '../api/getCoupons';
import { checkIsAvailableCoupon } from '../utils';

const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const fetchData = async () => {
    const content = await getCoupons();
    setCoupons(content);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAvailableCoupons = (checkedCartItems: CartItem[]) => {
    return coupons.filter((coupon) => checkIsAvailableCoupon(coupon, checkedCartItems));
  };

  return { coupons, getAvailableCoupons };
};

export default useCoupons;
