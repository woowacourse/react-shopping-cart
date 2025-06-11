import Line from '../../../common/Line';
import Header from '../../CartSection/Header';
import * as S from './index.styles';
import CheckBox from '../../../common/CheckBox';
import Button from '../../../common/Button';
import {formatPrice} from '../../../../utils/formatPrice';
import {formatTime} from '../../../../utils/formatTime';
import {CouponCode, CouponType} from '../../../../type/coupon';
import {ChangeEvent} from 'react';

type Props = {
  couponInfo: CouponType[] | undefined;
  canApplyCouponCode: CouponCode[] | undefined;
  isCouponChecked: Record<CouponCode, boolean>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  discountPrice: number;
  onClose: () => void;
};

const Coupon = ({
  couponInfo,
  canApplyCouponCode,
  isCouponChecked,
  onChange,
  discountPrice,
  onClose,
}: Props) => {
  const buttonTitle = () => {
    if (discountPrice > 0 && isCouponChecked.FREESHIPPING)
      return `총 ${formatPrice(discountPrice)} 할인 + 무료배달 쿠폰 사용하기`;
    if (discountPrice > 0)
      return `총 ${formatPrice(discountPrice)} 할인 쿠폰 사용하기`;
    if (isCouponChecked.FREESHIPPING) return `무료배달 쿠폰 사용하기`;
    return `쿠폰 사용하기`;
  };

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
            disabled={!canApplyCouponCode?.find((code) => code === coupon.code)}
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
      <Button title={buttonTitle()} onClick={onClose} mode="dark" />
    </S.Container>
  );
};

export default Coupon;
