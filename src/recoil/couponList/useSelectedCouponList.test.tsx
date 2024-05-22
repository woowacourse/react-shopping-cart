import { renderHook } from '@testing-library/react';
import useSelectedCouponList from './useSelectedCouponList';
import { RecoilRoot } from 'recoil';
import { act } from 'react';
import { mockCouponList } from '../../mocks/couponList';
import { selectedCouponListState } from './selectedCouponListState';
import { MAX_COUPON_COUNT } from '../../constants/coupon';

describe('useSelectedCouponList', () => {
  it('처음 진입하면 선택된 쿠폰 목록은 비어있다.', () => {
    const { result } = renderHook(() => useSelectedCouponList(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    expect(result.current.selectedCouponList.length).toBe(0);
  });
  it('쿠폰을 선택하면 선택 쿠폰 리스트에 추가된다.', async () => {
    const { result } = renderHook(() => useSelectedCouponList(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    await act(() => result.current.selectCoupon(mockCouponList[0]));

    expect(result.current.selectedCouponList.length).toBe(1);
  });

  it('쿠폰을 선택 해제하면 선택 쿠폰 리스트에서 제외된다.', async () => {
    const { result } = renderHook(() => useSelectedCouponList(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(selectedCouponListState, mockCouponList.slice(0, 2))}>
          {children}
        </RecoilRoot>
      ),
    });

    await act(() => result.current.unselectCoupon(mockCouponList[0].id));

    expect(result.current.selectedCouponList.length).toBe(1);
  });

  it('쿠폰을 2개 초과해서 선택하려고하면 이전 쿠폰이 제외되고 새로 선택한 쿠폰이 추가된다.', async () => {
    const { result } = renderHook(() => useSelectedCouponList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(selectedCouponListState, mockCouponList.slice(0, MAX_COUPON_COUNT))}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const firstSelectedCoupon = result.current.selectedCouponList[0];
    const newSelectedCoupon = mockCouponList[MAX_COUPON_COUNT];

    await act(() => result.current.selectCoupon(newSelectedCoupon));

    expect(result.current.selectedCouponList[0]).not.toEqual(firstSelectedCoupon);

    // 새로 선택된 쿠폰은 선택 쿠폰 목록의 top에 위치
    expect(result.current.selectedCouponList[result.current.selectedCouponList.length - 1]).toEqual(newSelectedCoupon);
  });
});
