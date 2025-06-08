import { renderHook, waitFor } from '@testing-library/react';
import useCoupons from '../../src/hooks/useCoupons';
import * as checkedCtx from '../../src/contexts/CheckedCartIds/CheckedCartIdsContext';
import * as shippingCtx from '../../src/contexts/Shipping/ShippingContext';
import { ErrorToastProvider } from '../../src/contexts/ErrorToast/ErrorToastProvider';
import CartItemsProvider from '../../src/contexts/CartItems/CartItemsProvider';
import CheckCartIdsProvider from '../../src/contexts/CheckedCartIds/CheckedCartIdsProvider';
import { act } from 'react';
import { mockCoupons } from '../mocks';
import { ShippingProvider } from '../../src/contexts/Shipping/ShippingProvider';
import { resetMockDate, setMockDate } from '../../src/utils/getCurrentDate';
type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ErrorToastProvider>
      <CartItemsProvider>
        <CheckCartIdsProvider>
          <ShippingProvider>{children}</ShippingProvider>
        </CheckCartIdsProvider>
      </CartItemsProvider>
    </ErrorToastProvider>
  );
};
describe('useCoupons 테스트', () => {
  describe('현재 유효한 쿠폰 목록을 반환한다', () => {
    describe('FIXED5000 -  고정 5000원 할인, 최소 주문 금액: 100,000원', () => {
      test('주문 금액이 100,000원 이상일 때 쿠폰이 적용된다', async () => {
        jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
          checkedCartIds: [1],
          setCheckedCartIds: jest.fn(),
          isAllChecked: false,
        });

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });

        await waitFor(() => {
          expect(
            result.current.validCoupons.find((c) => c.code === 'FIXED5000')
          ).toBeDefined();
        });
      });

      test('주문 금액이 100,000원 미만일 때 쿠폰이 적용되지 않는다', async () => {
        jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
          checkedCartIds: [6],
          setCheckedCartIds: jest.fn(),
          isAllChecked: false,
        });

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });

        await waitFor(() => {
          expect(result.current.validCoupons).not.toHaveLength(0);
        });

        await waitFor(() => {
          const coupon = result.current.validCoupons.find(
            (c) => c.code === 'FIXED5000'
          );
          expect(coupon).toBeUndefined();
        });
      });
    });

    describe('BOGO - 2+1, 단가가 더 높은 상품에 적용', () => {
      test('3개 이상인 경우에만 쿠폰이 적용된다', async () => {
        jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
          checkedCartIds: [3],
          setCheckedCartIds: jest.fn(),
          isAllChecked: false,
        });

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });

        await waitFor(() => {
          const validCoupons = result.current.validCoupons;
          const coupon = validCoupons.find((c) => c.code === 'BOGO');
          expect(coupon).toBeDefined();
        });
      });
      test('3개 미만인 경우 쿠폰이 적용되지 않는다', async () => {
        jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
          checkedCartIds: [1],
          setCheckedCartIds: jest.fn(),
          isAllChecked: false,
        });

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });

        await waitFor(() => {
          expect(result.current.validCoupons).not.toHaveLength(0);
        });

        await waitFor(() => {
          const validCoupons = result.current.validCoupons;
          const coupon = validCoupons.find((c) => c.code === 'BOGO');
          expect(coupon).toBeUndefined();
        });
      });
    });

    describe('FREESHIPPING - 배송비 무료, 최소 주문 금액: 50,000원', () => {
      test('주문 금액이 50,000원 이상일 때 쿠폰이 적용된다', async () => {
        jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
          checkedCartIds: [6],
          setCheckedCartIds: jest.fn(),
          isAllChecked: false,
        });

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });

        await waitFor(() => {
          const validCoupons = result.current.validCoupons;
          const coupon = validCoupons.find((c) => c.code === 'FREESHIPPING');
          expect(coupon).toBeDefined();
        });
      });

      test('주문 금액이 50,000원 미만일 때 쿠폰이 적용되지 않는다', async () => {
        jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
          checkedCartIds: [3, 4],
          setCheckedCartIds: jest.fn(),
          isAllChecked: false,
        });

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });

        await waitFor(() => {
          expect(result.current.validCoupons).not.toHaveLength(0);
        });

        await waitFor(() => {
          const validCoupons = result.current.validCoupons;
          const coupon = validCoupons.find((c) => c.code === 'FREESHIPPING');
          expect(coupon).toBeUndefined();
        });
      });

      test('주문 금액이 100,000원 이상일 때 쿠폰이 적용되지 않는다(기본 무료 배송)', async () => {
        jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
          checkedCartIds: [1],
          setCheckedCartIds: jest.fn(),
          isAllChecked: false,
        });

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });

        await waitFor(() => {
          expect(result.current.validCoupons).not.toHaveLength(0);
        });

        await waitFor(() => {
          const validCoupons = result.current.validCoupons;
          const coupon = validCoupons.find((c) => c.code === 'FREESHIPPING');
          expect(coupon).toBeUndefined();
        });
      });
    });

    describe('MIRACLESALE - 30% 할인, 적용시간:오전 4시~7시', () => {
      const realDate = Date;
      afterEach(() => {
        (globalThis as unknown as { Date: DateConstructor }).Date = realDate;
      });

      test('현재 시간이 오전 4시~7시 사이일 때 쿠폰이 적용된다', async () => {
        setMockDate(new Date('2025-06-07T05:00:00+09:00'));

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });
        await waitFor(() => {
          const validCoupons = result.current.validCoupons;
          const coupon = validCoupons.find((c) => c.code === 'MIRACLESALE');
          expect(coupon).toBeDefined();
        });
        resetMockDate();
      });

      test('현재 시간이 오전 4시~7시가 아닐 때 쿠폰이 적용되지 않는다', async () => {
        setMockDate(new Date('2025-06-07T08:00:00+09:00'));

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });

        await waitFor(() => {
          expect(result.current.validCoupons).not.toHaveLength(0);
        });

        await waitFor(() => {
          const validCoupons = result.current.validCoupons;
          const coupon = validCoupons.find((c) => c.code === 'MIRACLESALE');
          expect(coupon).toBeUndefined();
        });
        resetMockDate();
      });
    });

    describe('쿠폰 날짜가 지난 경우', () => {
      const realDate = Date;
      afterEach(() => {
        (globalThis as unknown as { Date: DateConstructor }).Date = realDate;
      });

      test('2025-08-01 기준으로 유효기간이 지난 쿠폰은 목록에 포함되지 않는다', async () => {
        // 2025-08-01로 날짜를 고정
        jest.useFakeTimers();
        // 시스템 시각을 2025-08-01T12:00:00+09:00 으로 고정
        jest.setSystemTime(new Date('2025-08-01T12:00:00+09:00'));
        jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
          checkedCartIds: [1, 2, 3, 4, 5, 6],
          setCheckedCartIds: jest.fn(),
          isAllChecked: false,
        });

        const { result } = renderHook(() => useCoupons(), {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
        });
        await waitFor(() => {
          // FIXED5000
          expect(
            result.current.validCoupons.find((c) => c.code === 'FIXED5000')
          ).toBeDefined();
          expect(
            result.current.validCoupons.find((c) => c.code === 'BOGO')
          ).toBeUndefined();
          expect(
            result.current.validCoupons.find((c) => c.code === 'MIRACLESALE')
          ).toBeUndefined();
        });
      });
    });
  });

  test('쿠폰을 선택할 수 있다, 단 최대 2개까지 선택 가능하다', async () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => <Providers>{children}</Providers>,
    });
    await waitFor(() => {
      expect(result.current.coupons).toHaveLength(mockCoupons.length);
    });

    act(() => {
      result.current.selectCoupon(1);
    });
    expect(
      result.current.selectedCoupons.find((c) => c.id === 1)
    ).toBeDefined();

    act(() => {
      result.current.selectCoupon(2);
    });
    expect(
      result.current.selectedCoupons.find((c) => c.id === 2)
    ).toBeDefined();
    expect(result.current.selectedCoupons).toHaveLength(2);

    act(() => {
      result.current.selectCoupon(3);
    });
    expect(result.current.selectedCoupons).toHaveLength(2);
  });

  test('쿠폰을 선택 해제할 수 있다', async () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: ({ children }) => <Providers>{children}</Providers>,
    });
    await waitFor(() => {
      expect(result.current.coupons).toHaveLength(mockCoupons.length);
    });
    act(() => {
      result.current.selectCoupon(1);
    });
    expect(
      result.current.selectedCoupons.find((c) => c.id === 1)
    ).toBeDefined();
    act(() => {
      result.current.unselectCoupon(1);
    });
    expect(
      result.current.selectedCoupons.find((c) => c.id === 1)
    ).toBeUndefined();
  });

  describe('선택한 쿠폰에 따른 할인 금액을 반환한다', () => {
    test('FIXED5000 + BOGO ', async () => {
      const { result } = renderHook(() => useCoupons(), {
        wrapper: ({ children }) => <Providers>{children}</Providers>,
      });
      await waitFor(() => {
        expect(result.current.coupons).toHaveLength(mockCoupons.length);
      });

      act(() => {
        result.current.selectCoupon(1); // FIXED5000
        result.current.selectCoupon(2); // BOGO
      });

      await waitFor(() => {
        expect(result.current.couponDiscount).toBe(5000 + 1000); // FIXED5000 + BOGO
      });
    });
    test('제주도 및 도서산간 지역일때 배송비 할인은 6000원', async () => {
      jest.spyOn(checkedCtx, 'useCheckCartIdsContext').mockReturnValue({
        checkedCartIds: [6],
        setCheckedCartIds: jest.fn(),
        isAllChecked: false,
      });
      jest.spyOn(shippingCtx, 'useShippingContext').mockReturnValue({
        isRemoteArea: true,
        setIsRemoteArea: jest.fn(),
      });

      const { result } = renderHook(() => useCoupons(), {
        wrapper: ({ children }) => <Providers>{children}</Providers>,
      });

      await waitFor(() => {
        expect(result.current.coupons).toHaveLength(mockCoupons.length);
      });

      act(() => {
        result.current.selectCoupon(3);
      });

      await waitFor(() => {
        expect(result.current.couponDiscount).toBe(6000);
      });
    });
  });
});
