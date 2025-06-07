import Line from '../../../common/Line';
import Header from '../../CartSection/Header';
import * as S from './index.styles';
import CheckBox from '../../../common/CheckBox';
import Button from '../../../common/Button';
import {formatPrice} from '../../../../utils/formatPrice';
import {formatTime} from '../../../../utils/formatTime';
import {css} from '@emotion/react';

const buttonStyle = css`
  background-color: #333;
  color: #fff;
`;

const Coupon = ({
  couponInfo,
  canApplyCouponCode,
  isCouponChecked,
  onChange,
}) => {
  console.log(canApplyCouponCode);
  return (
    <S.Container>
      <Header
        title="쿠폰을 선택해 주세요"
        description="※ 쿠폰은 최대 2개까지 사용할 수 있습니다."
      />
      <Line />
      {couponInfo?.map((coupon) => (
        <S.CouponList
          disabled={!canApplyCouponCode?.find((code) => code === coupon.code)}
        >
          <CheckBox
            label={coupon.description}
            isChecked={isCouponChecked[coupon.code]}
            onChange={onChange}
            name={coupon.code}
            disabled={!canApplyCouponCode?.find((code) => code !== coupon.code)}
          />
          <S.Description>만료일: {coupon.expirationDate}</S.Description>
          {coupon.minimumAmount && (
            <S.Description>
              최소 주문 금액: {formatPrice(coupon.minimumAmount)}
            </S.Description>
          )}
          {coupon.availableTime && (
            <S.Description>
              사용 가능 시간: 오전 {formatTime(coupon.availableTime.start)}
              시부터 {formatTime(coupon.availableTime.end)}시까지
            </S.Description>
          )}
          <Line />
        </S.CouponList>
      ))}
      <Button
        title={`총 ${'6000'}원 할인 쿠폰 사용하기`}
        onClick={() => {}}
        css={buttonStyle}
      />
    </S.Container>
  );
};

export default Coupon;
