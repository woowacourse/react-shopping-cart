import { useEffect } from 'react';
import { activeCouponsState, couponSelectedState } from '../../store/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useInitCouponStatusOnMount = () => {
  const [couponSelected, setCouponSelectedState] = useRecoilState(couponSelectedState);
  const setActiveCoupons = useSetRecoilState(activeCouponsState);

  useEffect(() => {
    const newCouponSelected = Object.keys(couponSelected).reduce<Record<string, boolean>>(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      {},
    );
    setCouponSelectedState(newCouponSelected);

    setActiveCoupons([]);
  }, []);
};

export default useInitCouponStatusOnMount;
