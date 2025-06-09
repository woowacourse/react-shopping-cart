import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import OrderReviewPage from '../OrderReviewPage';
import { APIDataProvider } from '../../../context/APIDataProvider';
import { ToastProvider } from '../../../context/ToastProvider';
import { cartMockData } from '@/__mocks__/cartData';
import { couponMockData } from '@/__mocks__/couponData';

// Mock 데이터
const cartMock = [...cartMockData];
const couponMock = [...couponMockData];

// OrderListProvider를 올바르게 모킹
vi.mock(
  '../../shopping-cart/context/OrderListProvider',
  async (importOriginal) => {
    const actual = await importOriginal();
    return Object.assign({}, actual, {
      useOrderListContext: () => ({
        selectedItems: cartMock,
        orderPrice: 22100,
        cartListData: cartMock,
      }),
    });
  }
);

// API 호출 관련 훅들만 모킹
vi.mock('../hooks/useOrderCoupons', () => ({
  useOrderCoupons: () => ({
    coupons: couponMock,
    isLoading: false,
    availableCoupons: couponMock,
    selectedCouponIds: [],
    bestCouponIds: [], // ← 이게 빠져있었음!
    handleSelectCoupons: vi.fn(),
  }),
}));

vi.mock('../hooks/useOrderInfo', () => ({
  useOrderInfo: () => ({
    typeCount: 2,
    totalCount: 2,
    isDisabled: false,
  }),
}));

vi.mock('../hooks/useShipping', () => ({
  useShipping: () => ({
    isJejuOrRemoteArea: false,
    actualShippingFee: 3000,
    handleJejuOrRemoteAreaToggle: vi.fn(),
  }),
}));

vi.mock('../hooks/useModal', () => ({
  useModal: () => ({
    showCouponModal: false,
    handleShowCouponModal: vi.fn(),
  }),
}));

vi.mock('../hooks/useNavigation', () => ({
  useNavigation: () => ({
    handleBackClick: vi.fn(),
    handleCheckout: vi.fn(),
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <APIDataProvider>{children}</APIDataProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

describe('OrderReviewPage 통합테스트', () => {
  it('페이지가 정상적으로 렌더링되고 실제 데이터가 표시된다', () => {
    render(
      <TestWrapper>
        <OrderReviewPage />
      </TestWrapper>
    );

    // 현재 렌더링된 내용 확인
    screen.debug();

    // 실제 컴포넌트들이 렌더링되는지 확인
    expect(screen.getByText('쿠폰 적용')).toBeInTheDocument();
    expect(screen.getByText('결제하기')).toBeInTheDocument();
  });
});
