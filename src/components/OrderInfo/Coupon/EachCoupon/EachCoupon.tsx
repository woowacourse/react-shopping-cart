import * as S from './styled';
import { Coupon } from '@type/coupon';
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
        {coupon.availableTime && (
          <S.CouponCondition>
            사용 가능 시간: {`${coupon.availableTime.start}부터 ${coupon.availableTime.end}까지`}
          </S.CouponCondition>
        )}
        {coupon.minimumAmount && (
          <S.CouponCondition>
            최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
          </S.CouponCondition>
        )}
      </S.Contents>
    </S.Container>
  );
};

export default EachCoupon;
