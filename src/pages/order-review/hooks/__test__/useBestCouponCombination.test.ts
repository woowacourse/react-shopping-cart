// src/pages/order-review/hooks/__test__/useBestCouponCombination.test.ts
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { useBestCouponCombination } from '../useBestCouponCombination';
import { couponMockData } from '@/__mocks__/couponData';

// OrderListContext 모킹
vi.mock('@/pages/shopping-cart/context/OrderListProvider', () => ({
  useOrderListContext: vi.fn(),
}));

// getDiscountByCouponId 유틸 함수 모킹
vi.mock('@/pages/order-review/utils/getDiscountByCouponId', () => ({
  getDiscountByCouponId: vi.fn(),
}));

describe('useBestCouponCombination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 미라클모닝 시간대로 설정 (오전 5시)
    vi.setSystemTime(new Date('2025-06-09T05:00:00'));
  });

  it('단일 쿠폰 조합에서 가장 큰 할인을 선택한다', async () => {
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );
    const { getDiscountByCouponId } = await import(
      '@/pages/order-review/utils/getDiscountByCouponId'
    );

    const mockUseOrderListContext = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;
    const mockGetDiscountByCouponId = getDiscountByCouponId as MockedFunction<
      typeof getDiscountByCouponId
    >;

    // Context 데이터 설정
    mockUseOrderListContext.mockReturnValue({
      selectedItems: [
        {
          id: '1',
          quantity: 5,
          product: { id: '42', name: '테스트 상품', price: 40000 },
        },
      ],
      orderPrice: 200000,
    } as ReturnType<typeof useOrderListContext>);

    // 각 쿠폰별 할인 금액 설정
    mockGetDiscountByCouponId
      .mockReturnValueOnce(5000) // 쿠폰 1: 5,000원
      .mockReturnValueOnce(60000) // 쿠폰 4: 60,000원 (30%)
      .mockReturnValueOnce(10000); // 쿠폰 2: 10,000원

    const availableCoupons = [
      couponMockData[0],
      couponMockData[3],
      couponMockData[1],
    ]; // ID: 1, 4, 2
    const allCouponCombinationIds = [
      [1], // 5,000원
      [4], // 60,000원
      [2], // 10,000원
    ];

    const { result } = renderHook(() =>
      useBestCouponCombination(availableCoupons, allCouponCombinationIds, false)
    );

    // 가장 큰 할인인 쿠폰 4 (60,000원)가 선택되어야 함
    expect(result.current.bestCouponIds).toEqual([4]);
    expect(result.current.totalDiscount).toBe(60000);

    console.log('단일 쿠폰 - 최적 조합:', result.current.bestCouponIds);
  });

  it('복합 쿠폰 조합에서 가장 큰 할인을 선택한다', async () => {
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );
    const { getDiscountByCouponId } = await import(
      '@/pages/order-review/utils/getDiscountByCouponId'
    );

    const mockUseOrderListContext = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;
    const mockGetDiscountByCouponId = getDiscountByCouponId as MockedFunction<
      typeof getDiscountByCouponId
    >;

    mockUseOrderListContext.mockReturnValue({
      selectedItems: [
        {
          id: '1',
          quantity: 5,
          product: { id: '42', name: '테스트 상품', price: 40000 },
        },
      ],
      orderPrice: 200000,
    } as ReturnType<typeof useOrderListContext>);

    // 각 쿠폰별 할인 금액 설정 (조합별로)
    mockGetDiscountByCouponId
      .mockReturnValueOnce(5000) // [1] 조합: 쿠폰 1
      .mockReturnValueOnce(60000) // [4] 조합: 쿠폰 4
      .mockReturnValueOnce(10000) // [2] 조합: 쿠폰 2
      .mockReturnValueOnce(5000) // [1,4] 조합: 쿠폰 1
      .mockReturnValueOnce(60000) // [1,4] 조합: 쿠폰 4
      .mockReturnValueOnce(5000) // [1,2] 조합: 쿠폰 1
      .mockReturnValueOnce(10000); // [1,2] 조합: 쿠폰 2

    const availableCoupons = [
      couponMockData[0],
      couponMockData[3],
      couponMockData[1],
    ]; // ID: 1, 4, 2
    const allCouponCombinationIds = [
      [1], // 5,000원
      [4], // 60,000원
      [2], // 10,000원
      [1, 4], // 5,000 + 60,000 = 65,000원
      [1, 2], // 5,000 + 10,000 = 15,000원
    ];

    const { result } = renderHook(() =>
      useBestCouponCombination(availableCoupons, allCouponCombinationIds, false)
    );

    // 가장 큰 할인인 [1, 4] 조합 (65,000원)이 선택되어야 함
    expect(result.current.bestCouponIds).toEqual([1, 4]);
    expect(result.current.totalDiscount).toBe(65000);

    console.log('복합 쿠폰 - 최적 조합:', result.current.bestCouponIds);
  });

  it('빈 조합에서 기본값을 반환한다', async () => {
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );

    const mockUseOrderListContext = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;

    mockUseOrderListContext.mockReturnValue({
      selectedItems: [],
      orderPrice: 0,
    } as any);

    const { result } = renderHook(() =>
      useBestCouponCombination([], [], false)
    );

    expect(result.current.bestCouponIds).toEqual([]);
    expect(result.current.totalDiscount).toBe(0);

    console.log('빈 조합 - 기본값 반환');
  });

  it('동일한 할인 금액일 때 첫 번째 조합을 반환한다', async () => {
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );
    const { getDiscountByCouponId } = await import(
      '@/pages/order-review/utils/getDiscountByCouponId'
    );

    const mockUseOrderListContext = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;
    const mockGetDiscountByCouponId = getDiscountByCouponId as MockedFunction<
      typeof getDiscountByCouponId
    >;

    mockUseOrderListContext.mockReturnValue({
      selectedItems: [
        {
          id: '1',
          quantity: 3,
          product: { id: '42', name: '테스트 상품', price: 50000 },
        },
      ],
      orderPrice: 150000,
    } as ReturnType<typeof useOrderListContext>);

    // 모든 쿠폰이 동일한 할인 금액
    mockGetDiscountByCouponId.mockReturnValue(5000);

    const availableCoupons = [couponMockData[0], couponMockData[1]]; // ID: 1, 2
    const allCouponCombinationIds = [[1], [2]];

    const { result } = renderHook(() =>
      useBestCouponCombination(availableCoupons, allCouponCombinationIds, false)
    );

    // 동일한 할인이면 첫 번째 조합 선택
    expect(result.current.bestCouponIds).toEqual([1]);
    expect(result.current.totalDiscount).toBe(5000);

    console.log('동일 할인 - 첫 번째 조합 선택');
  });

  it('제주도 조건에 따른 할인 계산이 다르게 적용된다', async () => {
    const { useOrderListContext } = await import(
      '@/pages/shopping-cart/context/OrderListProvider'
    );
    const { getDiscountByCouponId } = await import(
      '@/pages/order-review/utils/getDiscountByCouponId'
    );

    const mockUseOrderListContext = useOrderListContext as MockedFunction<
      typeof useOrderListContext
    >;
    const mockGetDiscountByCouponId = getDiscountByCouponId as MockedFunction<
      typeof getDiscountByCouponId
    >;

    mockUseOrderListContext.mockReturnValue({
      selectedItems: [
        {
          id: '1',
          quantity: 3,
          product: { id: '42', name: '테스트 상품', price: 30000 },
        },
      ],
      orderPrice: 90000,
    } as ReturnType<typeof useOrderListContext>);

    // 일반 지역 vs 제주도에서 다른 할인 금액
    mockGetDiscountByCouponId
      .mockReturnValueOnce(3000) // 일반 지역: 무료배송 쿠폰
      .mockReturnValueOnce(0); // 제주도: 무료배송 쿠폰 적용 안됨

    const availableCoupons = [couponMockData[2]]; // 무료배송 쿠폰
    const allCouponCombinationIds = [[3]];

    // 일반 지역 테스트
    const { result: normalResult } = renderHook(() =>
      useBestCouponCombination(availableCoupons, allCouponCombinationIds, false)
    );

    // 제주도 테스트
    const { result: jejuResult } = renderHook(() =>
      useBestCouponCombination(availableCoupons, allCouponCombinationIds, true)
    );

    expect(normalResult.current.totalDiscount).toBe(3000);
    expect(jejuResult.current.totalDiscount).toBe(0);

    console.log(
      '지역별 할인 차이 - 일반:',
      normalResult.current.totalDiscount,
      '제주:',
      jejuResult.current.totalDiscount
    );
  });
});
