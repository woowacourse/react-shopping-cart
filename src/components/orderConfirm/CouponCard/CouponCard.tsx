import { Coupon, CouponCode } from '@appTypes/shoppingCart';
import { Checkbox } from '@components/common';
import { formatDateToString, formatKoreanCurrency } from '@utils/index';
import { ChangeEvent } from 'react';

import * as Styled from './CouponCard.styled';

interface CouponCardProps {
  coupon: Coupon;
  isChecked: boolean;
  handleChangeChecked: (e: ChangeEvent<HTMLInputElement>, code: CouponCode) => void;
  isDisabled: boolean;
}

const CouponCard = ({ coupon, isChecked, handleChangeChecked, isDisabled }: CouponCardProps) => {
  return (
    <Styled.CouponCard $isDisabled={isDisabled}>
      <Styled.CouponCardTop>
        <Checkbox disabled={isDisabled} checked={isChecked} onChange={(e) => handleChangeChecked(e, coupon.code)} />
        <Styled.CouponName>{coupon.description}</Styled.CouponName>
      </Styled.CouponCardTop>
      <div>
        <Styled.CouponInfo>만료일: {formatDateToString(coupon.expirationDate)}</Styled.CouponInfo>
        {coupon.minimumAmount && (
          <Styled.CouponInfo>최소 주문 금액: {formatKoreanCurrency(coupon.minimumAmount)}</Styled.CouponInfo>
        )}
        {coupon.availableTime && (
          <Styled.CouponInfo>
            사용 가능 시간: 오전 {coupon.availableTime.start}시 ~ 오전 {coupon.availableTime.end}시
          </Styled.CouponInfo>
        )}
      </div>
    </Styled.CouponCard>
  );
};

export default CouponCard;
