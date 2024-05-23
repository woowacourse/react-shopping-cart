import React from 'react';
import * as S from './CouponModalCard.styled';
import CheckBox from '../CheckBox/CheckBox';
import { AvailableTime } from '../../types/Coupon';

interface CouponModalCardProps {
  id: number;
  name: string;
  expirationDate: string;
  minimumAmount?: number;
  availableTime?: AvailableTime;
  isChecked: boolean;
  handleCouponChecked: () => void;
}

function CouponModalCard({
  id,
  name,
  expirationDate,
  minimumAmount,
  availableTime,
  isChecked,
  handleCouponChecked,
}: CouponModalCardProps) {
  return (
    <>
      <S.CouponModalCardBorder />
      <CheckBox isChecked={isChecked} onClick={handleCouponChecked} />
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
