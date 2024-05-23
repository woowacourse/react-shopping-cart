import { css } from '@emotion/react';
import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Checkbox from '../common/Checkbox';

import { Coupon } from '@/types/coupon';
import { dateFormat, timeFormat } from '@/utils/format';
import { selectedCouponsState } from '@recoil/coupon/atom';
import { applicableCouponSelector } from '@recoil/coupon/selector';

interface CouponItemProps {
  coupon: Coupon;
}

export default function CouponItem({ coupon }: CouponItemProps) {
  const [selectedCoupons, setSelectedCoupons] = useRecoilState(selectedCouponsState);
  const isCouponApplicable = useRecoilValue(applicableCouponSelector(coupon.code));

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCoupons([...selectedCoupons, coupon.code]);
    } else {
      if (selectedCoupons.includes(coupon.code))
        setSelectedCoupons(selectedCoupons.filter((code) => coupon.code !== code));
    }
  };

  return (
    <>
      <li css={couponContainer} key={coupon.id}>
        <div css={couponSubContainer(isCouponApplicable)}>
          <div css={checkboxContainer}>
            <Checkbox
              onChange={onChangeHandler}
              checked={selectedCoupons.includes(coupon.code)}
              id={coupon.id.toString()}
              label={coupon.description + '체크박스'}
              labelHidden={true}
              disabled={!isCouponApplicable}
            />
            <h2 css={checkboxTitle}>{coupon.description}</h2>
          </div>
          <div css={checkBoxInfoWrapper}>
            <span css={checkboxInfoText}>
              만료일 : {dateFormat(new Date(coupon.expirationDate))}
            </span>
            {coupon.minimumAmount && (
              <span css={checkboxInfoText}>
                최소 주문 금액 : {coupon.minimumAmount.toLocaleString('ko-KR')}원
              </span>
            )}

            {coupon.availableTime && (
              <span css={checkboxInfoText}>
                사용 가능 기간 : {timeFormat(coupon.availableTime.start, true)}부터{' '}
                {timeFormat(coupon.availableTime.end, false)}까지
              </span>
            )}
          </div>
        </div>
      </li>
    </>
  );
}

const couponContainer = css`
  display: flex;
  flex-direction: column;
  padding-top: 12px;

  border-top: 1px solid #0000001a;
`;

const couponSubContainer = (isCouponApplicable: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  opacity: ${isCouponApplicable ? '1' : '0.25'};
`;

const checkboxContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 24px;
`;

const checkboxTitle = css`
  font-size: 16px;
  font-weight: 700;
`;

const checkBoxInfoWrapper = css`
  display: flex;
  flex-direction: column;
`;

const checkboxInfoText = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: #0a0d13;
`;
