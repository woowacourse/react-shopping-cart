import { useRecoilState, useRecoilValue } from 'recoil';
import { couponCheckState, totalDiscountAmount } from '../../../recoil/atoms/atoms';

import CheckBox from '../../CheckBox/CheckBox';
import { formatDate, formatTime } from '../../../utils/format';
import { Coupon } from '../../../types/coupon';
import { CouponBox, CouponDetails } from './CouponItem.style';
import { useEffect } from 'react';
import { useDiscountCalculator } from '../../../hooks/useDiscountCalculator/useDiscountCalculator';
import { calculateOrderPrice } from '../../../recoil/selectors/selectors';

export default function CouponItem({ coupon, isCouponApplicable }: { coupon: Coupon; isCouponApplicable: boolean }) {
  const [isCouponChecked, setIsCouponChecked] = useRecoilState(couponCheckState(coupon.code));
  const { totalOrderPrice } = useRecoilValue(calculateOrderPrice);
  const [totalDiscount, setToatalDiscount] = useRecoilState(totalDiscountAmount);
  const { calculateDiscountAmount } = useDiscountCalculator();

  useEffect(() => {
    const currentCouponDiscount = calculateDiscountAmount(coupon, totalOrderPrice);

    if (isCouponChecked) {
      setToatalDiscount(totalDiscount + currentCouponDiscount);
    } else {
      setToatalDiscount(totalDiscount - currentCouponDiscount);
    }
  }, [isCouponChecked]);

  return (
    <CouponBox isCouponCheck={isCouponApplicable}>
      <CheckBox
        text={coupon.description}
        isCheck={isCouponChecked}
        onClick={
          isCouponApplicable
            ? () => {
                setIsCouponChecked((prev) => !prev);
              }
            : () => {}
        }
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
