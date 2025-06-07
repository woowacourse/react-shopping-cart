import { useEffect, useState } from 'react';

import coupon from '../apis/coupon';

import { Coupon } from '../types/coupon';

function useCoupon() {
  const [couponList, setCouponList] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchCouponList = async () => {
      try {
        const res = await coupon.getCouponList();
        setCouponList(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCouponList();
  }, []);

  return { couponList };
}

export default useCoupon;
