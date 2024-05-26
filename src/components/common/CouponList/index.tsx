import useCoupon from '../../../hooks/coupon/useCoupon';
import CouponItem from '../../CouponItem';

import * as S from './style';

export default function CouponList() {
  const { coupons } = useCoupon();

  return (
    <S.Wrapper>
      {coupons.map((coupon) => (
        <CouponItem coupon={coupon} disabled={false} />
      ))}
    </S.Wrapper>
  );
}
