import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useSelectCoupon from '../useSelectCoupon';
import { COUPONS } from '../../routes/pages/OrderCheckPage/utils/coupon';

const mockCoupons = COUPONS;

describe('useSelectCoupon', () => {
  it('초기 선택된 쿠폰 Set은 비어있어야 한다.', () => {
    const { result } = renderHook(() => useSelectCoupon());
    expect(result.current.selectedCoupon.size).toBe(0);
  });

  it('handleSelectCoupon을 호출하면 쿠폰 코드가 Set에 추가되어야 한다.', () => {
    const { result } = renderHook(() => useSelectCoupon());

    act(() => {
      result.current.handleSelectCoupon(mockCoupons[0].id);
    });

    expect(result.current.selectedCoupon.size).toBe(1);
    expect(result.current.selectedCoupon.has(mockCoupons[0].id)).toBe(true);
  });

  it('이미 선택된 쿠폰에 대해 handleSelectCoupon을 호출하면 Set에서 제거되어야 한다.', () => {
    const { result } = renderHook(() => useSelectCoupon());

    act(() => {
      result.current.handleSelectCoupon(mockCoupons[0].id);
    });
    act(() => {
      result.current.handleSelectCoupon(mockCoupons[0].id);
    });

    expect(result.current.selectedCoupon.size).toBe(0);
  });

  it('최대 2개까지만 쿠폰을 선택할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useSelectCoupon());

    act(() => {
      result.current.handleSelectCoupon(mockCoupons[0].id);
    });
    act(() => {
      result.current.handleSelectCoupon(mockCoupons[1].id);
    });
    act(() => {
      result.current.handleSelectCoupon(mockCoupons[2].id);
    });

    expect(result.current.selectedCoupon.size).toBe(2);
    expect(result.current.selectedCoupon.has(mockCoupons[2].id)).toBe(false);
  });
});
