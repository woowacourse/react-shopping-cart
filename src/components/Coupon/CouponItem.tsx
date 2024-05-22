import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

import Checkbox from '../common/Checkbox';

import { Coupon } from '@/types/coupon';
import { convertAvailableDateFormat, convertExpiryDateFormat } from '@/utils/date';

interface CouponItemProps {
  coupon: Coupon;
  type: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
  isCouponValid: boolean;
  isChecked: boolean;
  handleChangeChecked: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CouponItem = ({
  coupon,
  type,
  isChecked,
  isCouponValid,
  handleChangeChecked,
}: CouponItemProps) => {
  const { description, expirationDate, minimumAmount, availableTime } = coupon;

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
        {(type === 'fixed' || type === 'freeShipping') && minimumAmount && (
          <span css={couponDescription}>
            최소 주문 금액 : {minimumAmount.toLocaleString('ko-KR')}원
          </span>
        )}
        {type === 'percentage' && availableTime && (
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
