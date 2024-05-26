import { useState } from 'react';
import CheckButton from '../common/CheckButton/CheckButton';
import * as Styled from './style';
import { CouponCode, AvailableType } from '../type';
import { convertToTimeFormat } from '../util/convertToTimeFormat';
import { koMoneyFormat } from '../util/koMoneyFormat';
import { convertToDateFormat } from '../util/convertToDateFormat';

interface CouponItemProp {
  couponCode: CouponCode;
  expirationDate: string;
  description: string;
  selectCoupon: (coupon: CouponCode) => void;
  available: boolean;
  minimumAmount?: number;
  availableTime?: AvailableType;
}

const CouponItem = ({
  selectCoupon,
  couponCode,
  description,
  expirationDate,
  available,
  minimumAmount,
  availableTime,
}: CouponItemProp) => {
  const [couponApply, setCouponApply] = useState(false);

  const handleClickCoupon = () => {
    setCouponApply((prop) => !prop);
    selectCoupon(couponCode);
  };
  return (
    <Styled.CouponItem disabled={!available}>
      <Styled.CouponItemTitle>
        <CheckButton
          isSelected={couponApply}
          setIsSelected={handleClickCoupon}
        />
        <p>{description}</p>
      </Styled.CouponItemTitle>
      <div>만료일: {convertToDateFormat(expirationDate)}</div>
      {minimumAmount && (
        <div>{`최소 주문 금액: ${koMoneyFormat(minimumAmount)}`}</div>
      )}
      {availableTime && (
        <div>{`사용 가능 시간: ${convertToTimeFormat(availableTime.start)} 부터 ${convertToTimeFormat(availableTime.end)} 까지`}</div>
      )}
    </Styled.CouponItem>
  );
};

export default CouponItem;
