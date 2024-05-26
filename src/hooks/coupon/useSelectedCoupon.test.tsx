import { act } from 'react';

import { RecoilRoot } from 'recoil';

import { renderHook } from '@testing-library/react';

import useSelectedCoupon from './useSelectedCoupon';
import { selectedCouponListState } from '../../recoil/coupon/atom';

describe('useSelectedCoupon', () => {
  const MOCK_COUPON: Coupon = {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  };

  it('isSelected는 쿠폰이 선택된 경우 true를 반환해야 한다.', async () => {
    const { result } = renderHook(() => useSelectedCoupon(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCouponListState, [MOCK_COUPON]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.isSelected(MOCK_COUPON.id)).toBe(true);
  });

  it('isSelected는 쿠폰이 선택되지 않은 경우 false를 반환해야 한다.', async () => {
    const { result } = renderHook(() => useSelectedCoupon(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCouponListState, []);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current.isSelected(MOCK_COUPON.id)).toBe(false);
  });

  it('toggleSelectedCoupon은 쿠폰이 선택되지 않은 경우 쿠폰을 선택 상태로 변경한다.', async () => {
    const { result } = renderHook(() => useSelectedCoupon(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCouponListState, []);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => result.current.toggleSelectedCoupon(MOCK_COUPON));

    expect(result.current.isSelected(MOCK_COUPON.id)).toBe(true);
  });

  it('toggleSelectedCoupon은 쿠폰이 선택된 경우 쿠폰을 선택되지 않은 상태로 변경한다.', async () => {
    const { result } = renderHook(() => useSelectedCoupon(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCouponListState, [MOCK_COUPON]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => result.current.toggleSelectedCoupon(MOCK_COUPON));

    expect(result.current.isSelected(MOCK_COUPON.id)).toBe(false);
  });
});
