import CouponItem from '../CouponItem/CouponItem';
import Caution from '../../../assets/caution.svg';
import { CouponContainer, Notification, CouponList } from './CouponModal.style';
import { Coupon } from '../../../types/coupon';
import { useCoupons } from '../../../hooks/useCoupons/useCoupons';
import { useCouponApplicabilityChecker } from '../../../hooks/useCouponApplicabilityChecker/useCouponApplicabilityChecker';
import { useRecoilValue } from 'recoil';
import { calculateOrderPrice } from '../../../recoil/selectors/selectors';

export default function CouponModal() {
  const { coupons } = useCoupons();

  const { totalOrderPrice } = useRecoilValue(calculateOrderPrice);

  const couponChecker = useCouponApplicabilityChecker();

  return (
    <CouponContainer>
      <Notification>
        <img className="notification-img" src={Caution} />
        <span className="notification-text">쿠폰은 최대 2개까지 사용할 수 있습니다.</span>
      </Notification>

      <CouponList>
        {coupons.map((coupon: Coupon) => {
          return (
            <CouponItem
              key={coupon.code}
              coupon={coupon}
              isCouponApplicable={couponChecker.isCouponApplicable(coupon, totalOrderPrice)}
            />
          );
        })}
      </CouponList>
    </CouponContainer>
  );
}
