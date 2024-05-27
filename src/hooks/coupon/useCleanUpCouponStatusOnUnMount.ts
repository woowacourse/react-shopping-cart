import { useEffect } from 'react';
import {
  activeCouponCodesState,
  additionalShippingFeeStatusState,
  couponSelectedState,
} from '../../store/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useCleanUpCouponStatusOnUnMount = () => {
  const [couponSelected, setCouponSelectedState] = useRecoilState(couponSelectedState);
  const setActiveCoupons = useSetRecoilState(activeCouponCodesState);
  const setAdditionalShippingFeeStatus = useSetRecoilState(additionalShippingFeeStatusState);

  useEffect(() => {
    return () => {
      const newCouponSelected = Object.keys(couponSelected).reduce<Record<string, boolean>>(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {},
      );
      setCouponSelectedState(newCouponSelected);
      setAdditionalShippingFeeStatus(false);
      setActiveCoupons([]);
    };
  }, []);
};

export default useCleanUpCouponStatusOnUnMount;
