import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import useCouponFinder from './useCouponFinder';

import { coupons } from '@/mocks/coupons';

const couponCodes = coupons.map(({ code }) => code);

describe('useCouponFinder', () => {
  it.each([...couponCodes])(
    '존재하는 쿠폰(%s)을 찾으면 해당 쿠폰을 반환한다.',
    (couponCode: string) => {
      const { result } = renderHook(() => useCouponFinder(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.findCouponByCode(couponCode)).toBeDefined();
    },
  );

  it('쿠폰이 존재하지 않으면 undefined를 반환한다.', () => {
    const INVALID_COUPON_CODE = 'INVALID_COUPON';
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.findCouponByCode(INVALID_COUPON_CODE)).toBeUndefined();
  });
});
