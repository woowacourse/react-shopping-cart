import { couponMockData } from '@/__mocks__/couponData';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { useAvailableCoupons } from '../useAvailableCoupons';

vi.mock('@/pages/shopping-cart/context/OrderListProvider', () => ({
  useOrderListContext: vi.fn(),
}));

const coupons = [...couponMockData];

const setupOrderContext = async (orderPrice: number, quantity: number = 1) => {
  const { useOrderListContext } = await import(
    '@/pages/shopping-cart/context/OrderListProvider'
  );
  const mockFn = useOrderListContext as MockedFunction<
    typeof useOrderListContext
  >;

  mockFn.mockReturnValue({
    selectedItems: [
      {
        id: '1',
        quantity,
        product: {
          id: '42',
          name: '테스트 상품',
          price: Math.floor(orderPrice / quantity),
        },
      },
    ],
    orderPrice,
  } as ReturnType<typeof useOrderListContext>);
};

const getAvailableCouponIds = (isJeju = false) => {
  const { result } = renderHook(() => useAvailableCoupons(coupons, isJeju));
  return result.current.availableCoupons.map((c) => c.id);
};

describe('useAvailableCoupons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.setSystemTime(new Date('2025-06-09T05:00:00')); // 미라클모닝 시간
  });

  it('고액 주문(20만원, 5개)에서 해당 쿠폰들이 사용 가능하다', async () => {
    await setupOrderContext(200000, 5);
    const ids = getAvailableCouponIds();

    expect(ids).toContain(1); // 고정 할인
    expect(ids).toContain(2); // BOGO
    expect(ids).toContain(4); // 미라클모닝 30%
  });

  it('저액 주문(5.5만원, 1개)에서 일부 쿠폰만 사용 가능하다', async () => {
    await setupOrderContext(55000, 1);
    const ids = getAvailableCouponIds();

    expect(ids).not.toContain(1); // 고정 할인 불가
    expect(ids).not.toContain(2); // BOGO 불가
    expect(ids).toContain(3); // 무료배송 가능
  });

  it('경계값 테스트 - 정확히 10만원일 때 고정할인 쿠폰이 사용 가능하다', async () => {
    await setupOrderContext(100000, 1);
    const ids = getAvailableCouponIds();

    expect(ids).toContain(1); // 고정 할인 가능
  });

  it('제주도 주문에서 무료배송 쿠폰 조건이 달라진다', async () => {
    await setupOrderContext(80000, 1);

    const normalIds = getAvailableCouponIds(false);
    const jejuIds = getAvailableCouponIds(true);

    expect(normalIds).toContain(3); // 일반지역: 무료배송 가능
    expect(jejuIds).toContain(3); // 제주도: 무료배송 가능
  });
});
