import { renderHook, waitFor } from '@testing-library/react';
import useCheckedCouponIds from '../../src/hooks/useCheckedCouponIds';
import { act } from 'react';
import { mockCartItems, mockCoupons } from '../mocks';
import { checkIsAvailableCoupon } from '../../src/utils';
import { Coupon } from '../../src/types';

describe('선택된 쿠폰 요소 ID 상태 관리 훅 테스트', () => {
  jest.useFakeTimers().setSystemTime(new Date(2025, 6, 7, 6, 0));
  const availableCoupons = mockCoupons.filter((coupon) =>
    checkIsAvailableCoupon(coupon as Coupon, mockCartItems)
  ) as Coupon[];
  const deliveryPrice = 3000;
  const couponAmount = 2;

  it('훅을 불러오면 현재 적용 가능한 조합 중 가장 높은 할인율의 쿠폰이 선택된다.', async () => {
    const { result } = renderHook(() => useCheckedCouponIds());
    act(() =>
      result.current.initCheckedCouponIds(
        availableCoupons,
        mockCartItems,
        deliveryPrice,
        couponAmount
      )
    );
    await waitFor(() => {
      expect(result.current.checkedCouponIds).toEqual([4, 1]);
    });
  });

  it('추가할 id를 주면 선택된 요소 상태 배열에 추가된다.', async () => {
    const { result } = renderHook(() => useCheckedCouponIds());
    act(() =>
      result.current.initCheckedCouponIds(
        availableCoupons,
        mockCartItems,
        deliveryPrice,
        couponAmount
      )
    );
    const addId = 6;

    act(() => result.current.addCheckedCouponIds(addId));
    await waitFor(() => {
      expect(result.current.checkedCouponIds).toContain(addId);
    });
  });

  it('제거할 id를 주면 선택된 요소 상태 배열에 해당 id가 제거된다.', async () => {
    const { result } = renderHook(() => useCheckedCouponIds());
    act(() =>
      result.current.initCheckedCouponIds(
        availableCoupons,
        mockCartItems,
        deliveryPrice,
        couponAmount
      )
    );
    const removeId = 1;

    act(() => result.current.removeCheckedCouponIds(removeId));
    await waitFor(() => {
      expect(result.current.checkedCouponIds).not.toContain(removeId);
    });
  });
});
