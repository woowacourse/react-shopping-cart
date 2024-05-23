import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

import Checkbox from '../common/Checkbox';

import { Coupon, CouponDiscountType } from '@/types/coupon';
import { convertAvailableDateFormat, convertExpiryDateFormat } from '@/utils/date';

interface CouponItemProps {
  coupon: Coupon;
  discountType: CouponDiscountType;
  isCouponValid: boolean;
  isChecked: boolean;
  handleChangeChecked: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CouponItem = ({
  coupon,
  discountType,
  isChecked,
  isCouponValid,
  handleChangeChecked,
}: CouponItemProps) => {
  const { description, expirationDate, minimumAmount, availableTime } = coupon;

  const isRequiredMinimumAmount =
    (discountType === 'fixed' || discountType === 'freeShipping') && minimumAmount;
  const isRequiredAvailableTime = discountType === 'percentage' && availableTime;

  return (
    <div css={couponItemContainer(isCouponValid)}>
      <Checkbox
        checked={isChecked}
        onChange={handleChangeChecked}
        htmlFor={coupon.id.toString()}
        label={description}
        labelCSS={title}
        isDisabled={!isCouponValid}
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

const couponItemContainer = (isCouponValid: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: 16px;

  border-top: 1px solid #0000001a;
  padding: 16px 0;

  background-color: white;
  opacity: ${isCouponValid ? 1 : 0.3};
`;

const title = css`
  font-weight: 700;
  font-size: 16px;
`;

const couponDescriptionWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const couponDescription = css`
  font-weight: 500;
  font-size: 12px;
`;
