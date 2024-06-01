import { MutableSnapshot, RecoilRoot } from 'recoil';
import { useCouponChecker } from './useCouponChecker';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { couponsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';

jest.mock('../recoil/selectors', () => ({
  fetchCouponsSelector: {
    get: jest.fn(() => Promise.resolve(mockCoupons)),
  },
}));

const initializeState = ({ set }: MutableSnapshot) => {
  set(couponsState, mockCoupons);
};

describe('useCouponChecker', () => {
  it('초기 쿠폰 상태는 mockCoupons와 같아야 한다.', async () => {
    const { result } = renderHook(() => useCouponChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current.coupons).toStrictEqual(mockCoupons);
    });
  });

  it('isChecked 상태를 토글하면 isChecked 값이 변경되어야 한다.', () => {
    const { result } = renderHook(() => useCouponChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    act(() => {
      result.current.toggleCouponCheck(1);
    });

    expect(result.current.coupons).toStrictEqual([
      { ...mockCoupons[0], isChecked: !mockCoupons[0].isChecked },
      mockCoupons[1],
      mockCoupons[2],
      mockCoupons[3],
    ]);
  });

  it('한 쿠폰을 선택하면 isChecked 상태가 true인 쿠폰의 개수가 1이어야 한다.', () => {
    const { result } = renderHook(() => useCouponChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    act(() => {
      result.current.toggleCouponCheck(1);
    });

    expect(result.current.getCheckedCount()).toBe(1);
  });
});
