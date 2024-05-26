import CheckBox from '../common/CheckBox';
import * as S from './style';

import { CouponType } from '../../types';

import {
  dateFormatter,
  priceFormatter,
  timeFormatter,
} from '../../utils/stringFormatter';

export interface CouponItemProps {
  disabled: boolean;
  coupon: CouponType;
}

export default function CouponItem({ disabled, coupon }: CouponItemProps) {
  return (
    <S.Wrapper disabled={disabled}>
      <S.Header>
        <CheckBox
          isSelected={false}
          toggleSelected={() => {}}
          disabled={disabled}
        />

        <S.Description>{coupon.description}</S.Description>
      </S.Header>

      <S.InformationContainer>
        <S.Information>{`유효기간: ${dateFormatter(coupon.expirationDate)}`}</S.Information>
        {coupon.availableTime && (
          <S.Information>{`사용 가능 시간: ${timeFormatter(coupon.availableTime.start)}부터 ${timeFormatter(coupon.availableTime.end)}까지`}</S.Information>
        )}
        {coupon.minimumAmount && (
          <S.Information>{`최소 구매금액: ${priceFormatter(coupon.minimumAmount)}원`}</S.Information>
        )}
      </S.InformationContainer>
    </S.Wrapper>
  );
}
