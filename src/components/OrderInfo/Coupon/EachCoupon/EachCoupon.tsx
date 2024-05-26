import * as S from './styled';
import { Coupon, FixedCoupon, FreeShippingCoupon, PercentageCoupon } from '@type/coupon';
import Checkbox from '@components/common/Checkbox/Checkbox';
import useApplicableCoupon from '@hooks/coupon/useApplicableCoupon';

interface EachCouponProps {
  coupon: Coupon;
  isSelect: boolean;
  isAlreadyApplyingMaximumCoupons: boolean;
  changeApplying: (coupon: Coupon) => void;
}

const EachCoupon = ({
  coupon,
  isSelect,
  isAlreadyApplyingMaximumCoupons,
  changeApplying,
}: EachCouponProps) => {
  const { isApplicable } = useApplicableCoupon();
  const disabled = !isApplicable(coupon) || (isAlreadyApplyingMaximumCoupons && !isSelect);

  const PercentageCouponAvailableTime = (coupon: Coupon) => {
    if (coupon.discountType !== 'percentage') return null;

    const percentageCoupon = coupon as PercentageCoupon;
    return (
      <S.CouponCondition>
        사용 가능 시간:
        {`${percentageCoupon.availableTime.start}부터 ${percentageCoupon.availableTime.end}까지`}
      </S.CouponCondition>
    );
  };

  const MinimumAmount = (coupon: Coupon) => {
    if (coupon.discountType === 'buyXgetY') return null;
    if (coupon.discountType === 'percentage') return null;

    const minimumAmountCoupon = coupon as FixedCoupon | FreeShippingCoupon;
    return (
      <S.CouponCondition>
        최소 주문 금액: {minimumAmountCoupon.minimumAmount.toLocaleString()}원
      </S.CouponCondition>
    );
  };

  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <Checkbox
          id={coupon.id}
          disabled={disabled}
          isChecked={isSelect}
          onChange={() => changeApplying(coupon)}
        />
        <S.CouponTitle $disabled={disabled}>{coupon.description}</S.CouponTitle>
      </S.Header>
      <S.Contents $disabled={disabled}>
        <S.CouponCondition>만료일: {coupon.expirationDate}</S.CouponCondition>
        {PercentageCouponAvailableTime(coupon)}
        {MinimumAmount(coupon)}
      </S.Contents>
    </S.Container>
  );
};

export default EachCoupon;
