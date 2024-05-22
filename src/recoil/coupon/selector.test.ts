import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { couponSelector } from './selector';

import { coupons } from '@/mocks/coupons';

describe('coupon selector', () => {
  describe('couponSelector', () => {
    const couponCodes = coupons.map(({ code }) => code);
    it.each([...couponCodes])(
      '존재하는 쿠폰(%s)을 찾으면 해당 쿠폰을 반환한다.',
      (couponCode: string) => {
        const { result } = renderHook(() => useRecoilValue(couponSelector(couponCode)), {
          wrapper: RecoilRoot,
        });

        expect(result.current).toBeDefined();
      },
    );

    it('쿠폰이 존재하지 않으면 undefined를 반환한다.', () => {
      const INVALID_COUPON_CODE = 'INVALID_COUPON';
      const { result } = renderHook(() => useRecoilValue(couponSelector(INVALID_COUPON_CODE)), {
        wrapper: RecoilRoot,
      });

      expect(result.current).toBeUndefined();
    });
  });
});
