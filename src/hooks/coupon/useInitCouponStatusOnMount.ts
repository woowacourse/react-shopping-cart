import { useEffect } from 'react';
import { activeCouponCodesState, couponSelectedState } from '../../store/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useInitCouponStatusOnMount = () => {
  const [couponSelected, setCouponSelectedState] = useRecoilState(couponSelectedState);
  const setActiveCoupons = useSetRecoilState(activeCouponCodesState);

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
