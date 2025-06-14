import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { useBestCouponCombination } from '../useBestCouponCombination';
import { couponMockData } from '@/__mocks__/couponData';

vi.mock('@/pages/shopping-cart/context/OrderListProvider', () => ({
  useOrderListContext: vi.fn(),
}));

vi.mock('@/pages/order-review/utils/getDiscountByCouponId', () => ({
  getDiscountByCouponId: vi.fn(),
}));

vi.mock('@/pages/order-review/utils/getAllCouponCombinationIds', () => ({
  getAllCouponCombinationIds: vi.fn(),
}));

const setupOrderContext = async (orderPrice: number, quantity: number) => {
  const { useOrderListContext } = await import(
    '@/pages/shopping-cart/context/OrderListProvider'
  );
  const mock = useOrderListContext as MockedFunction<
    typeof useOrderListContext
  >;
  mock.mockReturnValue({
    selectedItems: [
      {
        id: '1',
        quantity,
        product: {
          id: '42',
          name: '테스트 상품',
          price: orderPrice / quantity,
        },
      },
    ],
    orderPrice,
  } as ReturnType<typeof useOrderListContext>);
};

const mockCouponCombinations = async (combinations: number[][]) => {
  const { getAllCouponCombinationIds } = await import(
    '@/pages/order-review/utils/getAllCouponCombinationIds'
  );
  (
    getAllCouponCombinationIds as MockedFunction<
      typeof getAllCouponCombinationIds
    >
  ).mockReturnValue(combinations);
};

const runBestCombination = (coupons: typeof couponMockData, isJeju = false) => {
  return renderHook(() => useBestCouponCombination(coupons, isJeju));
};

describe('useBestCouponCombination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.setSystemTime(new Date('2025-06-09T05:00:00'));
  });

  it('단일 쿠폰 조합에서 가장 큰 할인을 선택한다', async () => {
    const { getDiscountByCouponId } = await import(
      '@/pages/order-review/utils/getDiscountByCouponId'
    );
    const mockGetDiscount = getDiscountByCouponId as MockedFunction<
      typeof getDiscountByCouponId
    >;

    await setupOrderContext(200000, 5);
    await mockCouponCombinations([[1], [4], [2]]);

    mockGetDiscount
      .mockReturnValueOnce(5000)
      .mockReturnValueOnce(60000)
      .mockReturnValueOnce(10000);

    const coupons = [couponMockData[0], couponMockData[3], couponMockData[1]];
    const { result } = runBestCombination(coupons);

    expect(result.current.bestCouponIds).toEqual([4]);
    expect(result.current.totalDiscount).toBe(60000);
  });

  it('복합 쿠폰 조합에서 가장 큰 할인을 선택한다', async () => {
    const { getDiscountByCouponId } = await import(
      '@/pages/order-review/utils/getDiscountByCouponId'
    );
    const mockGetDiscount = getDiscountByCouponId as MockedFunction<
      typeof getDiscountByCouponId
    >;

    await setupOrderContext(200000, 5);
    await mockCouponCombinations([[1], [4], [2], [1, 4], [1, 2]]);

    mockGetDiscount
      .mockReturnValueOnce(5000)
      .mockReturnValueOnce(60000)
      .mockReturnValueOnce(10000)
      .mockReturnValueOnce(5000)
      .mockReturnValueOnce(60000)
      .mockReturnValueOnce(5000)
      .mockReturnValueOnce(10000);

    const coupons = [couponMockData[0], couponMockData[3], couponMockData[1]];
    const { result } = runBestCombination(coupons);

    expect(result.current.bestCouponIds).toEqual([1, 4]);
    expect(result.current.totalDiscount).toBe(65000);
  });

  it('빈 조합에서 기본값을 반환한다', async () => {
    await setupOrderContext(0, 0);
    await mockCouponCombinations([]);

    const { result } = runBestCombination([], false);
    expect(result.current.bestCouponIds).toEqual([]);
    expect(result.current.totalDiscount).toBe(0);
  });

  it('동일한 할인 금액일 때 첫 번째 조합을 반환한다', async () => {
    const { getDiscountByCouponId } = await import(
      '@/pages/order-review/utils/getDiscountByCouponId'
    );
    const mockGetDiscount = getDiscountByCouponId as MockedFunction<
      typeof getDiscountByCouponId
    >;

    await setupOrderContext(150000, 3);
    await mockCouponCombinations([[1], [2]]);

    mockGetDiscount.mockReturnValue(5000);

    const coupons = [couponMockData[0], couponMockData[1]];
    const { result } = runBestCombination(coupons);

    expect(result.current.bestCouponIds).toEqual([1]);
    expect(result.current.totalDiscount).toBe(5000);
  });

  it('제주도 조건에 따른 할인 계산이 다르게 적용된다', async () => {
    const { getDiscountByCouponId } = await import(
      '@/pages/order-review/utils/getDiscountByCouponId'
    );
    const mockGetDiscount = getDiscountByCouponId as MockedFunction<
      typeof getDiscountByCouponId
    >;

    await setupOrderContext(90000, 3);
    await mockCouponCombinations([[3]]);

    mockGetDiscount.mockReturnValueOnce(3000).mockReturnValueOnce(0);

    const coupons = [couponMockData[2]];

    const { result: normalResult } = runBestCombination(coupons, false);
    const { result: jejuResult } = runBestCombination(coupons, true);

    expect(normalResult.current.totalDiscount).toBe(3000);
    expect(jejuResult.current.totalDiscount).toBe(0);
  });
});
