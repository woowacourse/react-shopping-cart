import { fetchCouponsSelector } from '@/store/couponStates';
import { useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { useCouponManager } from '@/store/custom/useCouponManager';

const useGetAllCoupons = () => {
  const { allCoupons } = useCouponManager();
  const [coupons, setCoupons] = allCoupons;
  const couponsLoadable = useRecoilValueLoadable(fetchCouponsSelector);

  useEffect(() => {
    if (!coupons.length && couponsLoadable.state === 'hasValue') {
      setCoupons(couponsLoadable.contents);
    }
  }, [coupons, couponsLoadable, setCoupons]);

  return { coupons };
};

export default useGetAllCoupons;
