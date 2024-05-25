import { useRecoilValue } from 'recoil';

import { couponListState } from '../../../recoil/atoms/atoms';
import CouponItem from '../CouponItem/CouponItem';
import Caution from '../../../assets/caution.svg';
import { CouponContainer, Notification, CouponList } from './CouponModal.style';

export default function CouponModal() {
  const coupons = useRecoilValue(couponListState);

  return (
    <CouponContainer>
      <Notification>
        <img className="notification-img" src={Caution} />
        <span className="notification-text">쿠폰은 최대 2개까지 사용할 수 있습니다.</span>
      </Notification>

      <CouponList>
        {coupons.map((coupon) => (
          <CouponItem key={coupon.code} coupon={coupon} />
        ))}
      </CouponList>
    </CouponContainer>
  );
}
