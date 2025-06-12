import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OrderReviewPage from '../OrderReviewPage';
import { APIDataProvider } from '../../../context/APIDataProvider';
import { ToastProvider } from '../../../context/ToastProvider';
import { cartMockData } from '@/__mocks__/cartData';
import { couponMockData } from '@/__mocks__/couponData';

const modalState = {
  showCouponModal: false,
  handleShowCouponModal: vi.fn(),
};

vi.mock(
  '../../shopping-cart/context/OrderListProvider',
  async (importOriginal) => {
    const actual = (await importOriginal()) as object;
    return {
      ...actual,
      useOrderListContext: () => ({
        selectedItems: [...cartMockData],
        orderPrice: 22100,
        cartListData: [...cartMockData],
      }),
    };
  }
);

vi.mock('../hooks/useOrderCoupons', () => ({
  useOrderCoupons: () => ({
    coupons: [...couponMockData],
    isLoading: false,
    availableCoupons: [...couponMockData],
    selectedCouponIds: [],
    bestCouponIds: [],
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

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ToastProvider>
      <APIDataProvider>{children}</APIDataProvider>
    </ToastProvider>
  </BrowserRouter>
);

const openCouponModal = async () => {
  const { rerender } = render(
    <TestWrapper>
      <OrderReviewPage />
    </TestWrapper>
  );

  fireEvent.click(screen.getByText('쿠폰 적용'));

  rerender(
    <TestWrapper>
      <OrderReviewPage />
    </TestWrapper>
  );

  await waitFor(() => {
    expect(screen.getByText('쿠폰을 선택해주세요')).toBeInTheDocument();
  });
};

const assertCouponDescriptionsRendered = () => {
  couponMockData.forEach((coupon) => {
    expect(screen.getByText(coupon.description)).toBeInTheDocument();
  });
};

describe('OrderReviewPage 쿠폰 모달 테스트', () => {
  beforeEach(() => {
    modalState.showCouponModal = false;
    modalState.handleShowCouponModal = vi.fn();
  });

  it('쿠폰 적용 버튼 클릭 시 쿠폰 모달이 표시된다', async () => {
    await openCouponModal();

    expect(screen.getByText('5,000원 할인 쿠폰')).toBeInTheDocument();
    expect(
      screen.getByText('쿠폰은 최대 2개까지 사용할 수 있습니다.')
    ).toBeInTheDocument();
    expect(screen.getByText('총 0원 할인 쿠폰 사용하기')).toBeInTheDocument();
  });

  it('모든 쿠폰 목 데이터가 모달에 정상적으로 렌더링된다', async () => {
    await openCouponModal();
    assertCouponDescriptionsRendered();
  });
});
