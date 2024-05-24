import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import CouponItem from './CouponItem';

import { couponsState } from '@/recoil/coupon/atom';

export default function CouponList() {
  const coupons = useRecoilValue(couponsState);

  return (
    <ul css={couponListContainer}>
      {coupons.map((coupon) => (
        <CouponItem key={coupon.id} coupon={coupon} />
      ))}
    </ul>
  );
}

const couponListContainer = css`
  display: flex;
  flex-direction: column;
  gap: 24px;

  margin-bottom: 16px;
`;
