import { allCouponStates } from '@/store/atoms';
import { fetchCouponsSelector } from '@/store/couponSelector';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

const useGetAllCoupons = () => {
  const [allCoupons, setAllCoupons] = useRecoilState(allCouponStates);
  const couponsLoadable = useRecoilValueLoadable(fetchCouponsSelector);

  useEffect(() => {
    if (!allCoupons.length && couponsLoadable.state === 'hasValue') {
      setAllCoupons(couponsLoadable.contents);
    }
  }, [allCoupons, couponsLoadable, setAllCoupons]);

  return { allCoupons };
};

export default useGetAllCoupons;
