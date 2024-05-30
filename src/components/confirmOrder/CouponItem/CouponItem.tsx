import { useState } from 'react';

import { CheckBox } from '../../common';
import { useCouponValidityChecker } from '../../../hooks';
import {
  getAvailableTimeString,
  getExpirationDateString,
  getMinimumAmountString,
} from './CouponItem.util';

import { Coupon } from '../../../type';
import * as Styled from './CouponItem.style';

interface CouponItemProps {
  coupon: Coupon;
  isReachedApplicableLimit: boolean;
  isCheckedCoupon: boolean;
  onCheck: (id: number, isChecked: boolean) => void;
}

export default function CouponItem({
  coupon,
  isReachedApplicableLimit,
  isCheckedCoupon,
  onCheck,
}: CouponItemProps) {
  const [isChecked, setIsChecked] = useState(isCheckedCoupon);
  const { isCouponValid } = useCouponValidityChecker();

  const isCouponApplicable = isReachedApplicableLimit ? false : isCouponValid(coupon);
  const isCouponCheckable = isChecked || isCouponApplicable;

  const toggleCheckBox = () => {
    setIsChecked((prevState) => !prevState);
    onCheck(coupon.id, !isChecked);
  };

  return (
    <Styled.CouponItemContainer>
      <Styled.CouponItemHeader isCheckable={isCouponCheckable}>
        <CheckBox
          itemId={coupon.id}
          isChecked={isChecked}
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
