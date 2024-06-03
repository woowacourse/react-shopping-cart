import { useRecoilValue } from 'recoil';
import { calculateOrderPrice } from '../../../recoil/selectors/selectors';

import CouponItem from '../CouponItem/CouponItem';
import { useCoupons } from '../../../hooks/useCoupons/useCoupons';
import { useCouponApplicabilityChecker } from '../../../hooks/useCouponApplicabilityChecker/useCouponApplicabilityChecker';

import { Coupon } from '../../../types/coupon';
import Caution from '../../../assets/caution.svg';

import * as S from './CouponModal.style';

export default function CouponModal() {
  const { coupons } = useCoupons();
  const { totalOrderPrice } = useRecoilValue(calculateOrderPrice);
  const couponChecker = useCouponApplicabilityChecker();

  const applicableCoupons = coupons.filter((coupon) => couponChecker.isCouponApplicable(coupon, totalOrderPrice));
  const nonApplicableCoupons = coupons.filter((coupon) => !couponChecker.isCouponApplicable(coupon, totalOrderPrice));

  return (
    <S.Container>
      <S.Notification>
        <img className="notification-img" src={Caution} />
        <span className="notification-text">쿠폰은 최대 2개까지 사용할 수 있습니다.</span>
      </S.Notification>

      <S.CouponList>
        {applicableCoupons.map((coupon: Coupon) => (
          <CouponItem key={coupon.code} coupon={coupon} isCouponApplicable={true} />
        ))}
        {nonApplicableCoupons.map((coupon: Coupon) => (
          <CouponItem key={coupon.code} coupon={coupon} isCouponApplicable={false} />
        ))}
      </S.CouponList>
    </S.Container>
  );
}
