import CheckBox from '../common/CheckBox';
import * as S from './style';

import { CouponType } from '../../types';

import useCoupon from '../../hooks/coupon/useCoupon';
import {
  dateFormatter,
  priceFormatter,
  timeFormatter,
} from '../../utils/stringFormatter';

export interface CouponItemProps {
  coupon: CouponType;
}

export default function CouponItem({ coupon }: CouponItemProps) {
  const { disabled, isSelected, toggleCouponSelection } = useCoupon(
    coupon.code
  );

  return (
    <S.Wrapper>
      <S.Divider />
      <S.Container disabled={disabled}>
        <S.Header>
          <CheckBox
            disabled={disabled}
            isSelected={isSelected}
            handleChange={toggleCouponSelection}
          />

          <S.Description>{coupon.description}</S.Description>
        </S.Header>

        <S.InformationContainer>
          <S.Information>{`만료일: ${dateFormatter(coupon.expirationDate)}`}</S.Information>
          {coupon.availableTime && (
            <S.Information>{`사용 가능 시간: ${timeFormatter(coupon.availableTime.start)}부터 ${timeFormatter(coupon.availableTime.end)}까지`}</S.Information>
          )}
          {coupon.minimumAmount && (
            <S.Information>{`최소 주문 금액: ${priceFormatter(coupon.minimumAmount)}`}</S.Information>
          )}
        </S.InformationContainer>
      </S.Container>
    </S.Wrapper>
  );
}
