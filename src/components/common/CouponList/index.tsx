import CouponItem from '../../CouponItem';

import { CouponType } from '../../../types';
import * as S from './style';

export default function CouponList({ coupons }: { coupons: CouponType[] }) {
  return (
    <S.Wrapper>
      {coupons.map((coupon) => (
        <CouponItem coupon={coupon} key={coupon.code} />
      ))}
    </S.Wrapper>
  );
}
