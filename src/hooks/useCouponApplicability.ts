import { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  applicableBOGOCartItemsSelector,
  selectedCouponsSelector,
  totalOrderAmountSelector,
} from '../recoil/selectors';
import { isCouponApplicableState } from '../recoil/atoms';

import couponApplicabilityValidator from '../validators/couponApplicabilityValidator';

import { CouponType } from '../type';
import CONDITION from '../constants/Condition';

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
    let isApplicable = validateCouponApplicability(coupon, totalOrderAmount);

    const inapplicableBogo =
      applicableBOGOCartItems.length === CONDITION.noneApplicableBOGO;
    if (coupon.code === 'BOGO' && inapplicableBogo) isApplicable = false;

    setIsCouponApplicable(isApplicable);
  }, []);

  useEffect(() => {
    if (
      selectedCoupons.length === CONDITION.maxSelectedCoupons &&
      !selectedCoupons.includes(coupon)
    ) {
      setIsCouponApplicable(() => false);
    }
  }, [selectedCoupons]);

  return { isCouponApplicable };
};

export default useCouponApplicability;
