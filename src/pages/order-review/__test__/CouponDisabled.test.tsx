import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import OrderReviewPage from '../OrderReviewPage';
import { APIDataProvider } from '../../../context/APIDataProvider';
import { ToastProvider } from '../../../context/ToastProvider';
import { couponMockData } from '@/__mocks__/couponData';

vi.mock('@/hooks/useCoupon', () => ({
  useCoupon: () => ({
    coupons: couponMockData,
    isLoading: false,
  }),
}));
vi.mock('../hooks/useNavigation', () => ({
  useNavigation: () => ({
    handleBackClick: vi.fn(),
    handleCheckout: vi.fn(),
  }),
}));
vi.mock('../../shopping-cart/context/OrderListProvider', () => ({
  useOrderListContext: vi.fn(),
  OrderListProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const createMockCartData = (orderAmount: number, quantity: number = 1) => [
  {
    id: '1',
    quantity,
    product: {
      id: '42',
      name: '테스트 상품',
      price: orderAmount,
      imageUrl: 'https://example.com/image.jpg',
      category: '테스트',
      quantity: 10,
    },
  },
];

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ToastProvider>
      <APIDataProvider>{children}</APIDataProvider>
    </ToastProvider>
  </BrowserRouter>
);

const setupOrderContext = async (orderAmount: number, quantity: number = 1) => {
  const { useOrderListContext } = await import(
    '../../shopping-cart/context/OrderListProvider'
  );
  const mockData = createMockCartData(orderAmount, quantity);
  (useOrderListContext as Mock).mockReturnValue({
    selectedItems: mockData,
    orderPrice: orderAmount,
    cartListData: mockData,
    shippingFee: 3000,
    selectionMap: { '1': true },
  });
};

const openCouponModal = async () => {
  render(
    <TestWrapper>
      <OrderReviewPage />
    </TestWrapper>
  );

  fireEvent.click(screen.getByText('쿠폰 적용'));

  await waitFor(() =>
    expect(screen.getByText('쿠폰을 선택해주세요')).toBeInTheDocument()
  );
};

const getCouponElementById = (id: number) => screen.getByTestId(`coupon-${id}`);

describe('5,000원 할인 쿠폰 경계값 테스트', () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([
    [99999, true],
    [100000, false],
    [100001, false],
  ])(
    '주문금액 %d원일 때 disabled: %s',
    async (orderAmount, shouldBeDisabled) => {
      await setupOrderContext(orderAmount);
      await openCouponModal();

      const coupon = getCouponElementById(1);
      expect(coupon).toHaveAttribute('data-disabled', String(shouldBeDisabled));
    }
  );
});

describe('BOGO 쿠폰 (수량 조건)', () => {
  it.each([
    [1, true],
    [2, true],
    [3, false],
    [5, false],
  ])('수량 %d개일 때 disabled: %s', async (quantity, shouldBeDisabled) => {
    await setupOrderContext(150000, quantity);
    await openCouponModal();

    const coupon = getCouponElementById(2);
    expect(coupon).toHaveAttribute('data-disabled', String(shouldBeDisabled));
  });
});

describe('FREESHIPPING 쿠폰', () => {
  it.each([
    [49999, true],
    [50000, false],
    [50001, false],
  ])(
    '주문금액 %d원일 때 disabled: %s',
    async (orderAmount, shouldBeDisabled) => {
      await setupOrderContext(orderAmount);
      await openCouponModal();

      const coupon = getCouponElementById(3);
      expect(coupon).toHaveAttribute('data-disabled', String(shouldBeDisabled));
    }
  );
});

describe('미라클모닝 쿠폰 (시간 조건)', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => vi.useRealTimers());

  it.each([
    ['03:59:59', true],
    ['04:00:00', false],
    ['05:30:00', false],
    ['06:59:59', false],
    ['07:00:00', true],
    ['12:00:00', true],
  ])('시간 %s일 때 disabled: %s', async (time, shouldBeDisabled) => {
    vi.setSystemTime(new Date(`2025-06-09T${time}`));
    await setupOrderContext(150000, 5);

    await openCouponModal();
    const coupon = getCouponElementById(4);
    expect(coupon).toHaveAttribute('data-disabled', String(shouldBeDisabled));
  });
});
