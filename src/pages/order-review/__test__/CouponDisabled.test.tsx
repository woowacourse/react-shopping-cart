// src/pages/order-review/__test__/CouponDisabled.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import OrderReviewPage from '../OrderReviewPage';
import { APIDataProvider } from '../../../context/APIDataProvider';
import { ToastProvider } from '../../../context/ToastProvider';
import { couponMockData } from '@/__mocks__/couponData';

// API 호출만 모킹
vi.mock('@/hooks/useCoupon', () => ({
  useCoupon: () => ({
    coupons: couponMockData,
    isLoading: false,
  }),
}));

// 네비게이션 모킹
vi.mock('../hooks/useNavigation', () => ({
  useNavigation: () => ({
    handleBackClick: vi.fn(),
    handleCheckout: vi.fn(),
  }),
}));

// OrderListProvider 모킹 - 기본값으로 설정
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

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <APIDataProvider>{children}</APIDataProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

describe('5,000원 할인 쿠폰 경계값 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [99999, true, '99,999원 - 10만원 미만이므로 disabled'],
    [100000, false, '100,000원 - 10만원 정확히이므로 enabled'],
    [100001, false, '100,001원 - 10만원 초과이므로 enabled'],
  ])(
    '주문금액 %d원일 때 5,000원 할인 쿠폰 disabled: %s (%s)',
    async (orderAmount, shouldBeDisabled) => {
      // 동적 import로 모킹된 함수 가져오기
      const { useOrderListContext } = await import(
        '../../shopping-cart/context/OrderListProvider'
      );

      // 각 테스트마다 다른 주문 금액으로 모킹 설정
      const mockData = createMockCartData(orderAmount);
      (useOrderListContext as Mock).mockReturnValue({
        selectedItems: mockData,
        orderPrice: orderAmount,
        cartListData: mockData,
        shippingFee: 3000,
        selectionMap: { '1': true },
      });

      render(
        <TestWrapper>
          <OrderReviewPage />
        </TestWrapper>
      );

      // 쿠폰 적용 버튼 클릭
      const couponButton = screen.getByText('쿠폰 적용');
      fireEvent.click(couponButton);

      // 모달이 열릴 때까지 대기
      await waitFor(() => {
        expect(screen.getByText('쿠폰을 선택해주세요')).toBeInTheDocument();
      });

      // 5,000원 할인 쿠폰 찾기 (ID가 1이라고 가정)
      const couponElement = screen.getByTestId('coupon-1');

      // 실제 주문 금액 확인을 위한 디버깅
      console.log(`현재 테스트 주문 금액: ${orderAmount}원`);

      // disabled 상태 확인
      if (shouldBeDisabled) {
        expect(couponElement).toHaveAttribute('data-disabled', 'true');
      } else {
        expect(couponElement).toHaveAttribute('data-disabled', 'false');
      }
    }
  );
});

describe('BOGO 쿠폰 (수량 조건)', () => {
  it.each([
    [1, true, '수량 1개 - 3개 미만이므로 disabled'],
    [2, true, '수량 2개 - 3개 미만이므로 disabled'],
    [3, false, '수량 3개 - 3개 이상이므로 enabled'],
    [5, false, '수량 5개 - 3개 이상이므로 enabled'],
  ])(
    '상품 수량 %d개일 때 BOGO 쿠폰 disabled: %s (%s)',
    async (quantity, shouldBeDisabled) => {
      // 동적 import로 모킹된 함수 가져오기
      const { useOrderListContext } = await import(
        '../../shopping-cart/context/OrderListProvider'
      );

      // 각 테스트마다 다른 수량으로 모킹 설정 (충분한 주문 금액으로 설정)
      const mockData = createMockCartData(150000, quantity); // 15만원으로 설정
      (useOrderListContext as Mock).mockReturnValue({
        selectedItems: mockData,
        orderPrice: 150000,
        cartListData: mockData,
        shippingFee: 3000,
        selectionMap: { '1': true },
      });

      render(
        <TestWrapper>
          <OrderReviewPage />
        </TestWrapper>
      );

      // 쿠폰 적용 버튼 클릭
      const couponButton = screen.getByText('쿠폰 적용');
      fireEvent.click(couponButton);

      // 모달이 열릴 때까지 대기
      await waitFor(() => {
        expect(screen.getByText('쿠폰을 선택해주세요')).toBeInTheDocument();
      });

      // BOGO 쿠폰 찾기 (ID가 2)
      const couponElement = screen.getByTestId('coupon-2');

      console.log(`현재 테스트 수량: ${quantity}개`);

      // disabled 상태 확인
      if (shouldBeDisabled) {
        expect(couponElement).toHaveAttribute('data-disabled', 'true');
      } else {
        expect(couponElement).toHaveAttribute('data-disabled', 'false');
      }
    }
  );
});

describe('FREESHIPPING 쿠폰', () => {
  it.each([
    [49999, true, '4,999원 - 5만원 미만이므로 disabled'],
    [50000, false, '50,000원 - 5만원 정확히이므로 enabled'],
    [50001, false, '50,001원 - 5만원 초과이므로 enabled'],
  ])(
    '주문금액 %d원일 때 무료배송 쿠폰 disabled: %s (%s)',
    async (orderAmount, shouldBeDisabled) => {
      // 동적 import로 모킹된 함수 가져오기
      const { useOrderListContext } = await import(
        '../../shopping-cart/context/OrderListProvider'
      );

      // 각 테스트마다 다른 주문 금액으로 모킹 설정
      const mockData = createMockCartData(orderAmount);
      (useOrderListContext as Mock).mockReturnValue({
        selectedItems: mockData,
        orderPrice: orderAmount,
        cartListData: mockData,
        shippingFee: 3000,
        selectionMap: { '1': true },
      });

      render(
        <TestWrapper>
          <OrderReviewPage />
        </TestWrapper>
      );

      // 쿠폰 적용 버튼 클릭
      const couponButton = screen.getByText('쿠폰 적용');
      fireEvent.click(couponButton);

      // 모달이 열릴 때까지 대기
      await waitFor(() => {
        expect(screen.getByText('쿠폰을 선택해주세요')).toBeInTheDocument();
      });

      // 쿠폰 찾기 (ID가 3이라고 가정)
      const couponElement = screen.getByTestId('coupon-3');

      // 실제 주문 금액 확인을 위한 디버깅
      console.log(`현재 테스트 주문 금액: ${orderAmount}원`);

      // disabled 상태 확인
      if (shouldBeDisabled) {
        expect(couponElement).toHaveAttribute('data-disabled', 'true');
      } else {
        expect(couponElement).toHaveAttribute('data-disabled', 'false');
      }
    }
  );
});

describe('미라클모닝 쿠폰 (시간 조건)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    [
      '03:59:59',
      true,
      '오전 3시 59분 59초 - 미라클모닝 시작 직전이므로 disabled',
    ],
    ['04:00:00', false, '오전 4시 정각 - 미라클모닝 시작이므로 enabled'],
    ['05:30:00', false, '오전 5시 30분 - 미라클모닝 중간이므로 enabled'],
    [
      '06:59:59',
      false,
      '오전 6시 59분 59초 - 미라클모닝 종료 직전이므로 enabled',
    ],
    ['07:00:00', true, '오전 7시 정각 - 미라클모닝 종료이므로 disabled'],
    ['12:00:00', true, '정오 - 미라클모닝 시간대가 아니므로 disabled'],
  ])(
    '시간 %s에 미라클모닝 쿠폰 disabled: %s (%s)',
    async (time, shouldBeDisabled) => {
      // 시스템 시간을 특정 시간으로 설정
      vi.setSystemTime(new Date(`2025-06-09T${time}`));

      // 동적 import로 모킹된 함수 가져오기
      const { useOrderListContext } = await import(
        '../../shopping-cart/context/OrderListProvider'
      );

      // 충분한 주문 금액과 수량으로 설정 (다른 조건은 모두 만족)
      const mockData = createMockCartData(150000, 5);
      (useOrderListContext as Mock).mockReturnValue({
        selectedItems: mockData,
        orderPrice: 150000,
        cartListData: mockData,
        shippingFee: 3000,
        selectionMap: { '1': true },
      });

      render(
        <TestWrapper>
          <OrderReviewPage />
        </TestWrapper>
      );

      // 쿠폰 적용 버튼 클릭
      const couponButton = screen.getByText('쿠폰 적용');
      fireEvent.click(couponButton);

      // 모달이 열릴 때까지 대기
      await waitFor(() => {
        expect(screen.getByText('쿠폰을 선택해주세요')).toBeInTheDocument();
      });

      // 미라클모닝 쿠폰 찾기 (ID가 4)
      const couponElement = screen.getByTestId('coupon-4');

      console.log(`현재 테스트 시간: ${time}`);

      // disabled 상태 확인
      if (shouldBeDisabled) {
        expect(couponElement).toHaveAttribute('data-disabled', 'true');
      } else {
        expect(couponElement).toHaveAttribute('data-disabled', 'false');
      }
    }
  );
});
