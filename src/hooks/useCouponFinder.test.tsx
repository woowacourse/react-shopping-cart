import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useCouponFinder } from './useCouponFinder';
import { couponsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';

describe('useCouponFinder', () => {
  it('존재하는 쿠폰 코드로 쿠폰을 찾을 수 있다', () => {
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.findCouponByCode('FIXED5000')).toBe(mockCoupons[0]);
  });

  it('존재하지 않는 쿠폰 코드로 쿠폰을 찾으면 undefined를 반환한다', () => {
    const { result } = renderHook(() => useCouponFinder(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, mockCoupons)}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.findCouponByCode('INVALID_CODE')).toBeUndefined();
  });
});
