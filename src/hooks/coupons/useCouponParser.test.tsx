import { renderHook } from '@testing-library/react';
import useCouponParser from './useCouponParser';
import { mockCoupons } from '../../mocks/coupons';

describe('useCouponParser 훅 테스트', () => {
  test('만료일만 있는 쿠폰 파싱', () => {
    const { result } = renderHook(() => useCouponParser(mockCoupons[1]));

    expect(result.current).toContain(`만료일: 2024년 4월 30일`);
  });

  test('만료일, 최소 주문 금액이 있는 쿠폰 파싱', () => {
    const { result } = renderHook(() => useCouponParser(mockCoupons[0]));

    expect(result.current).toContain(`만료일: 2024년 11월 30일`);
    expect(result.current).toContain(`최소 주문 금액: 100,000원`);
  });

  test('만료일과 최소 주문 금액이 있는 쿠폰 파싱', () => {
    const { result } = renderHook(() => useCouponParser(mockCoupons[2]));

    expect(result.current).toContain(`만료일: 2024년 8월 31일`);
    expect(result.current).toContain(`최소 주문 금액: 50,000원`);
  });

  test('만료일과 사용 가능 시간이 있는 쿠폰 파싱', () => {
    const { result } = renderHook(() => useCouponParser(mockCoupons[3]));

    expect(result.current).toContain(`만료일: 2024년 7월 31일`);
    expect(result.current).toContain(`사용 가능 시간: 오전 04시부터 07시까지`);
  });
});
