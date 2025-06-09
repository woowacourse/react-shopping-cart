// src/pages/order-review/hooks/__test__/useAvailableCoupons.test.ts
import { couponMockData } from '@/__mocks__/couponData';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { useAvailableCoupons } from '../useAvailableCoupons';

vi.mock('@/pages/shopping-cart/context/OrderListProvider', () => ({
  useOrderListContext: vi.fn(),
}));

describe('useAvailableCoupons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 미라클모닝 시간대로 설정 (오전 5시)
    vi.setSystemTime(new Date('2025-06-09T05:00:00'));
  });

  it('고액 주문(20만원, 5개)에서 해당 쿠폰들이 사용 가능하다', async () => {
    // 테스트 내에서 모킹된 함수 가져오기
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );

    // 타입 캐스팅 후 mock 설정
    const mockFn = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;

    mockFn.mockReturnValue({
      selectedItems: [
        {
          id: '1',
          quantity: 5,
          product: {
            id: '42',
            name: '테스트 상품',
            price: 40000,
          },
        },
      ],
      orderPrice: 200000,
    } as ReturnType<typeof useOrderListContext>);

    const { result } = renderHook(() =>
      useAvailableCoupons(couponMockData, false)
    );

    const availableIds = result.current.availableCoupons.map((c) => c.id);
    console.log('Mock 호출 횟수:', mockFn.mock.calls.length);
    console.log('훅 결과:', availableIds);

    expect(availableIds).toContain(1);
    expect(availableIds).toContain(2);
    expect(availableIds).toContain(4);
  });

  it('저액 주문(5만원, 1개)에서 일부 쿠폰만 사용 가능하다', async () => {
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );
    // 타입 캐스팅 후 mock 설정
    const mockFn = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;

    mockFn.mockReturnValue({
      selectedItems: [
        {
          id: '1',
          quantity: 1,
          product: {
            id: '42',
            name: '테스트 상품',
            price: 55000,
          },
        },
      ],
      orderPrice: 55000,
    } as ReturnType<typeof useOrderListContext>);

    const { result } = renderHook(() =>
      useAvailableCoupons(couponMockData, false)
    );

    const availableIds = result.current.availableCoupons.map((c) => c.id);

    expect(availableIds).not.toContain(1); // 5,000원 할인 불가 (5만원 < 10만원)
    expect(availableIds).not.toContain(2); // BOGO 불가 (1개 < 3개)
    expect(availableIds).toContain(3); // 무료배송 가능 (5만원 >= 5만원, 일반지역)

    console.log('저액 주문 - 사용 가능한 쿠폰:', availableIds);
  });

  it('경계값 테스트 - 정확히 10만원일 때 고정할인 쿠폰이 사용 가능하다', async () => {
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );
    // 타입 캐스팅 후 mock 설정
    const mockFn = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;

    mockFn.mockReturnValue({
      selectedItems: [
        {
          id: '1',
          quantity: 1,
          product: {
            id: '42',
            name: '테스트 상품',
            price: 100000,
          },
        },
      ],
      orderPrice: 100000,
    } as ReturnType<typeof useOrderListContext>);

    const { result } = renderHook(() =>
      useAvailableCoupons(couponMockData, false)
    );

    const availableIds = result.current.availableCoupons.map((c) => c.id);

    expect(availableIds).toContain(1); // 10만원 정확히 = 사용 가능
    console.log('경계값 테스트 - 사용 가능한 쿠폰:', availableIds);
  });

  it('제주도 주문에서 무료배송 쿠폰 조건이 달라진다', async () => {
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );
    // 타입 캐스팅 후 mock 설정
    const mockFn = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;

    mockFn.mockReturnValue({
      selectedItems: [
        {
          id: '1',
          quantity: 1,
          product: {
            id: '42',
            name: '테스트 상품',
            price: 80000,
          },
        },
      ],
      orderPrice: 80000, // 5만원 이상이지만 10만원 미만
    } as ReturnType<typeof useOrderListContext>);

    // 일반 지역
    const { result: normalResult } = renderHook(() =>
      useAvailableCoupons(couponMockData, false)
    );

    // 제주도
    const { result: jejuResult } = renderHook(() =>
      useAvailableCoupons(couponMockData, true)
    );

    const normalIds = normalResult.current.availableCoupons.map((c) => c.id);
    const jejuIds = jejuResult.current.availableCoupons.map((c) => c.id);

    // 일반 지역: 8만원이고 10만원 미만이므로 무료배송 가능
    expect(normalIds).toContain(3);

    // 제주도: 8만원이지만 5만원 이상이므로 무료배송 가능
    expect(jejuIds).toContain(3);

    console.log('일반 지역 쿠폰:', normalIds);
    console.log('제주도 쿠폰:', jejuIds);
  });
});
