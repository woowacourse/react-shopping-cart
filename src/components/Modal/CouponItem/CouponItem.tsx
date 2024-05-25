import { useState } from 'react';
import { Coupon } from '../../../types/coupon';
import CheckBox from '../../CheckBox/CheckBox';
import { CouponBox, CouponDetails } from './CouponItem.style';
import { formatDate, formatTime } from '../../../utils/format';

export default function CouponItem({ coupon }: { coupon: Coupon }) {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <CouponBox>
      <CheckBox
        text={coupon.description}
        isCheck={isCheck}
        onClick={() => {
          setIsCheck((prev) => !prev);
        }}
      />
      <CouponDetails>
        <span>만료일: {formatDate(coupon.expirationDate)}</span>
        {coupon.minimumAmount && <span>최소 주문 금액: {`${coupon.minimumAmount.toLocaleString()}원`}</span>}
        {coupon.availableTime && (
          <span>
            사용 가능 시간:
            {` 오전 ${formatTime(coupon.availableTime.start)}시부터 ${formatTime(coupon.availableTime.end)}시까지`}
          </span>
        )}
      </CouponDetails>
    </CouponBox>
  );
}
