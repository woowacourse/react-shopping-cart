import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

// 모달 상태를 전역으로 관리
const modalState = {
  showCouponModal: false,
  handleShowCouponModal: vi.fn(),
};

// OrderListProvider 모킹
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

// useOrderCoupons 훅 모킹
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

// 기타 훅 모킹
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

// useModal 훅 모킹 - 실제 상태 변경이 되도록
vi.mock('../hooks/useModal', () => ({
  useModal: () => ({
    showCouponModal: modalState.showCouponModal,
    handleShowCouponModal: () => {
      modalState.showCouponModal = !modalState.showCouponModal;
      modalState.handleShowCouponModal();
    },
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

describe('OrderReviewPage 쿠폰 모달 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 모달 상태 초기화
    modalState.showCouponModal = false;
    modalState.handleShowCouponModal = vi.fn();
  });

  it('쿠폰 적용 버튼 클릭 시 쿠폰 모달이 표시된다', async () => {
    const { rerender } = render(
      <TestWrapper>
        <OrderReviewPage />
      </TestWrapper>
    );

    // 쿠폰 적용 버튼 클릭
    const couponButton = screen.getByText('쿠폰 적용');
    fireEvent.click(couponButton);

    // 상태 변경 후 리렌더링
    rerender(
      <TestWrapper>
        <OrderReviewPage />
      </TestWrapper>
    );

    // 실제 모달 요소들로 확인
    await waitFor(() => {
      expect(screen.getByText('쿠폰을 선택해주세요')).toBeInTheDocument();
    });

    // 모달 내용 확인
    expect(screen.getByText('5,000원 할인 쿠폰')).toBeInTheDocument();
    expect(
      screen.getByText('쿠폰은 최대 2개까지 사용할 수 있습니다.')
    ).toBeInTheDocument();
    expect(screen.getByText('총 0원 할인 쿠폰 사용하기')).toBeInTheDocument();
  });

  it('모든 쿠폰 목 데이터가 모달에 정상적으로 렌더링된다', async () => {
    const { rerender } = render(
      <TestWrapper>
        <OrderReviewPage />
      </TestWrapper>
    );

    // 쿠폰 적용 버튼 클릭
    const couponButton = screen.getByText('쿠폰 적용');
    fireEvent.click(couponButton);

    // 상태 변경 후 리렌더링
    rerender(
      <TestWrapper>
        <OrderReviewPage />
      </TestWrapper>
    );

    // 모달이 열릴 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('쿠폰을 선택해주세요')).toBeInTheDocument();
    });

    // 모든 쿠폰 description이 화면에 렌더링되는지 확인
    couponMock.forEach((coupon) => {
      expect(screen.getByText(coupon.description)).toBeInTheDocument();
    });

    // 개별 쿠폰들 확인
    couponMock.forEach((coupon) => {
      expect(screen.getByText(coupon.description)).toBeInTheDocument();
    });
  });
});
