import { ChangeEvent } from 'react';

import {
  couponDescription,
  couponDescriptionWrapper,
  couponItemContainer,
  title,
} from './CouponItem.styled';

import Checkbox from '@/components/common/Checkbox/Checkbox';
import { CouponClient } from '@/types/coupon';
import { convertAvailableDateFormat, convertExpiryDateFormat } from '@/utils/date';

interface CouponItemProps {
  coupon: CouponClient;
  isValid: boolean;
  handleChangeChecked: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CouponItem = ({ coupon, isValid, handleChangeChecked }: CouponItemProps) => {
  const { id, isChecked, description, expirationDate, minimumAmount, availableTime, discountType } =
    coupon;

  const isRequiredMinimumAmount =
    (discountType === 'fixed' || discountType === 'freeShipping') && minimumAmount;
  const isRequiredAvailableTime = discountType === 'percentage' && availableTime;

  return (
    <div css={couponItemContainer(isValid)}>
      <Checkbox
        checked={isChecked}
        onChange={handleChangeChecked}
        htmlFor={id.toString()}
        label={description}
        labelCSS={title}
        isDisabled={!isValid}
      />
      <div css={couponDescriptionWrapper}>
        <span css={couponDescription}>만료일 : {convertExpiryDateFormat(expirationDate)}</span>
        {isRequiredMinimumAmount && (
          <span css={couponDescription}>
            최소 주문 금액 : {minimumAmount.toLocaleString('ko-KR')}원
          </span>
        )}
        {isRequiredAvailableTime && (
          <span css={couponDescription}>
            사용 가능 시간 : {convertAvailableDateFormat(availableTime.start, availableTime.end)}
          </span>
        )}
      </div>
    </div>
  );
};

export default CouponItem;
