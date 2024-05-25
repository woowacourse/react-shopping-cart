import { useRecoilState, useRecoilValue } from 'recoil';
import {
  applicableBOGOCartItemsSelector,
  selectedCouponsSelector,
  totalOrderAmountSelector,
} from '../recoil/selectors';
import { isCouponApplicableState } from '../recoil/atoms';

import couponApplicabilityValidator from '../validators/couponApplicabilityValidator';

import { CouponType } from '../type';
import { useEffect } from 'react';

const useCouponApplicability = (coupon: CouponType) => {
  const [isCouponApplicable, setIsCouponApplicable] = useRecoilState(
    isCouponApplicableState(coupon.id),
  );
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const applicableBOGOCartItems = useRecoilValue(
    applicableBOGOCartItemsSelector,
  );
  const selectedCoupons = useRecoilValue(selectedCouponsSelector);

  const { validateCouponApplicability } = couponApplicabilityValidator();

  useEffect(() => {
    setIsCouponApplicable(
      validateCouponApplicability(coupon, totalOrderAmount),
    );

    if (coupon.code === 'BOGO' && applicableBOGOCartItems.length === 0) {
      setIsCouponApplicable(() => false);
    }

    if (selectedCoupons.length === 2 && !selectedCoupons.includes(coupon)) {
      setIsCouponApplicable(() => false);
    }
  }, [selectedCoupons]);

  return { isCouponApplicable };
};

export default useCouponApplicability;
