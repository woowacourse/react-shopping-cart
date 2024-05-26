import { CheckBox } from '../../common';
import { useCheckCoupon, useCouponValidityChecker } from '../../../hooks';
import {
  getAvailableTimeString,
  getExpirationDateString,
  getMinimumAmountString,
} from './CouponItem.util';

import { Coupon } from '../../../type';
import * as Styled from './CouponItem.style';

interface CouponItemProps {
  coupon: Coupon;
}

export default function CouponItem({ coupon }: CouponItemProps) {
  const { isCheckedCoupon, isReachedCouponsLimit, onCheckCoupon } = useCheckCoupon();
  const { isCouponValid } = useCouponValidityChecker();

  const isCouponApplicable = isReachedCouponsLimit ? false : isCouponValid(coupon);
  const isCouponChecked = isCheckedCoupon(coupon.id);
  const isCouponCheckable = isCouponChecked || isCouponApplicable;

  const toggleCheckBox = () => {
    onCheckCoupon(coupon.id, !isCheckedCoupon(coupon.id));
  };

  return (
    <Styled.CouponItemContainer>
      <Styled.CouponItemHeader isCheckable={isCouponCheckable}>
        <CheckBox
          itemId={coupon.id}
          isChecked={isCouponChecked}
          onChange={toggleCheckBox}
          data-testid="coupon-item-checkbox"
          disabled={!isCouponCheckable}
        />
        <span>{coupon.description}</span>
      </Styled.CouponItemHeader>
      <Styled.CouponItemConditionList isCheckable={isCouponCheckable}>
        {coupon.expirationDate && <li>{getExpirationDateString(coupon.expirationDate)}</li>}
        {coupon.availableTime && <li>{getAvailableTimeString(coupon.availableTime)}</li>}
        {coupon.minimumAmount && <li>{getMinimumAmountString(coupon.minimumAmount)}</li>}
      </Styled.CouponItemConditionList>
    </Styled.CouponItemContainer>
  );
}
