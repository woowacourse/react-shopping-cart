import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { isOrderMinimumAmount } from './isOrderMinimumAmount';
import { couponItemsState } from '../../recoil/atoms/atoms';
import { mockCoupons } from '../../mocks/mockCouponData';

describe('isOrderMinimumAmount', () => {
  it('주문 금액이 최소 주문 금액 미만이면 쿠폰을 적용할 수 없다', () => {
    const { result } = renderHook(
      () => isOrderMinimumAmount(mockCoupons[0], 50000),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(couponItemsState, mockCoupons)}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBe(false);
  });

  it('주문 금액이 최소 주문 금액 이상이면 쿠폰을 적용할 수 있다', () => {
    const { result } = renderHook(
      () => isOrderMinimumAmount(mockCoupons[2], 60000),
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(couponItemsState, mockCoupons)}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    expect(result.current).toBe(true);
  });
});
