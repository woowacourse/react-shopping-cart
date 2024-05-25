import React, { useEffect } from 'react';
import * as S from './CouponModalCard.styled';
import CheckBox from '../CheckBox/CheckBox';
import { AvailableTime } from '../../types/Coupon';

interface CouponModalCardProps {
  isAvailable: boolean;
  name: string;
  expirationDate: string;
  minimumAmount?: number;
  availableTime?: AvailableTime;
  isChecked: boolean;
  handleCouponChecked: () => void;
}

function CouponModalCard({
  isAvailable,
  name,
  expirationDate,
  minimumAmount,
  availableTime,
  isChecked,
  handleCouponChecked,
}: CouponModalCardProps) {
  return (
    <S.CouponModalCardContainer $opacity={isAvailable ? '1' : '0.5'}>
      <S.CouponModalCardBorder />

      <S.CheckBoxHeaderWrapper>
        <CheckBox
          isChecked={isChecked}
          isAvailable={isAvailable}
          onClick={handleCouponChecked}
        />
        <S.CouponName>{name}</S.CouponName>
      </S.CheckBoxHeaderWrapper>

      <S.CouponDetails>
        <S.CouponCondition>만료일 : {expirationDate}</S.CouponCondition>
        {minimumAmount && (
          <S.CouponCondition>
            최소 주문 금액 : {minimumAmount.toLocaleString()}원
          </S.CouponCondition>
        )}
        {/* TODO: 시간 오전/오후 유틸 함수 */}
        {availableTime && (
          <S.CouponCondition>
            사용 가능 시간 : {availableTime.start}부터
            {availableTime.end}까지
          </S.CouponCondition>
        )}
      </S.CouponDetails>
    </S.CouponModalCardContainer>
  );
}

export default CouponModalCard;
