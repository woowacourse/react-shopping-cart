import { useEffect } from 'react';
import {
  activeCouponCodesState,
  additionalShippingFeeStatusState,
  couponSelectedState,
  couponsState,
} from '../../store/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const useSetAndCleanUpCoupons = () => {
  const coupons = useRecoilValue(couponsState);
  const [couponSelected, setCouponSelectedState] = useRecoilState(couponSelectedState);
  const setActiveCoupons = useSetRecoilState(activeCouponCodesState);
  const setAdditionalShippingFeeStatus = useSetRecoilState(additionalShippingFeeStatusState);

  useEffect(() => {
    const initialCouponSelected = coupons.reduce<Record<string, boolean>>((acc, coupon) => {
      acc[coupon.code] = false;
      return acc;
    }, {});

    setCouponSelectedState(initialCouponSelected);

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

export default useSetAndCleanUpCoupons;
