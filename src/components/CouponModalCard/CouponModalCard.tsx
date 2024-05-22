import React from 'react';
import * as S from './CouponModalCard.styled';
import CheckBox from '../CheckBox/CheckBox';
import { AvailableTime } from '../../types/Coupon';

interface CouponModalCardProps {
  name: string;
  expirationDate: string;
  minimumAmount?: number;
  availableTime?: AvailableTime;
}

function CouponModalCard({
  name,
  expirationDate,
  minimumAmount,
  availableTime,
}: CouponModalCardProps) {
  return (
    <>
      <S.CouponModalCardBorder />
      <CheckBox isChecked={true} />
      <S.CouponName>{name}</S.CouponName>
      <S.CouponCondition>{expirationDate}</S.CouponCondition>
      <S.CouponCondition>{minimumAmount}</S.CouponCondition>
      {availableTime && (
        <>
          <S.CouponCondition>
            {availableTime.start.getHours}부터 {availableTime.end.getHours}
          </S.CouponCondition>
        </>
      )}
      <div>CouponModalCard</div>
    </>
  );
}

export default CouponModalCard;
