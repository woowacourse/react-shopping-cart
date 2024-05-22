import { css } from '@emotion/react';

import { Coupon } from '@/types/coupon';

interface CouponItemProps {
  coupon: Coupon;
  type: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
}

const CouponItem = ({ coupon, type }: CouponItemProps) => {
  const { description, expirationDate, minimumAmount, availableTime } = coupon;

  const convertExpiryDateFormat = (expirationDate: string) => {
    const date = new Date(expirationDate);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const convertAvailableDateFormat = (start: string, end: string) => {
    const startHour = start.split(':')[0][1];
    const endHour = end.split(':')[0][1];
    return `사용 가능 시간 : 오전 ${startHour}시부터 ${endHour}시까지`;
  };

  return (
    <div css={couponItemContainer}>
      {/* <Checkbox checked={} /> */}
      <h2 css={title}>{description}</h2>
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

const couponItemContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;

  border-top: 1px solid #0000001a;
  padding: 16px 0;
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
