import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { DataProvider } from '../src/context/DataContext';
import { CouponProvider } from '../src/context/CouponContext';
import { ShippingProvider } from '../src/context/ShippingContext';
import { OrderProvider } from '../src/context/OrderContext';
import OrderConfirmPage from '../src/pages/OrderConfirmPage';
import * as cartApi from '../src/apis/cart';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../src/apis/cart', () => ({
  getCartItems: vi.fn(),
}));

// Header 컴포넌트 모킹
vi.mock('../src/components/Header/Header', () => ({
  default: function MockHeader() {
    return <div data-testid="header">Header</div>;
  },
}));

describe('OrderConfirmPage', () => {
  const mockCartItems = {
    content: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 101,
          name: '상품1',
          price: 50000,
          imageUrl: 'https://example.com/1.jpg',
          category: 'test',
        },
      },
      {
        id: 2,
        quantity: 1,
        product: {
          id: 102,
          name: '상품2',
          price: 30000,
          imageUrl: 'https://example.com/2.jpg',
          category: 'test',
        },
      },
    ],
  };

  const renderComponent = () => {
    return render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/order',
            state: { checkedItems: [1, 2] },
          },
        ]}
      >
        <DataProvider>
          <CouponProvider>
            <ShippingProvider>
              <OrderProvider
                selectedCartItems={mockCartItems.content}
                price={130000}
                shippingFee={0}
                totalPrice={130000}
              >
                <OrderConfirmPage />
              </OrderProvider>
            </ShippingProvider>
          </CouponProvider>
        </DataProvider>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (cartApi.getCartItems as Mock).mockResolvedValue(mockCartItems);
  });

  it('주문 확인 페이지가 올바르게 렌더링되어야 한다', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  });

  it('선택된 상품 정보가 올바르게 표시되어야 한다', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('상품1')).toBeInTheDocument();
      expect(screen.getByText('상품2')).toBeInTheDocument();
      const quantityElements = screen.getAllByTestId('item-quantity');
      expect(quantityElements[0]).toHaveTextContent('2개');
      expect(quantityElements[1]).toHaveTextContent('1개');
    });
  });

  it('총 주문 금액이 올바르게 표시되어야 한다', async () => {
    renderComponent();

    await waitFor(() => {
      // 주문 금액 확인
      const orderAmount = screen.getByText('주문 금액');
      expect(orderAmount).toBeInTheDocument();
      expect(orderAmount.nextSibling).toHaveTextContent('130,000원');

      const shippingFee = screen.getByText('배송비');
      expect(shippingFee).toBeInTheDocument();
      expect(shippingFee.nextSibling).toHaveTextContent('0원');

      const totalPrice = screen.getByText('총 결제 금액');
      expect(totalPrice).toBeInTheDocument();
      expect(totalPrice.nextSibling).toHaveTextContent('130,000원');
    });
  });

  it('10만원 이상일 때 배송비가 면제되어야 한다', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('배송비')).toBeInTheDocument();
      expect(screen.getByText('0원')).toBeInTheDocument();
    });
  });

  it('결제하기 버튼 클릭 시 paymentConfirm 페이지로 이동해야 한다', async () => {
    renderComponent();

    await waitFor(() => {
      const paymentButton = screen.getByText('결제하기');
      expect(paymentButton).toBeInTheDocument();
    });

    const paymentButton = screen.getByText('결제하기');
    fireEvent.click(paymentButton);

    expect(mockNavigate).toHaveBeenCalledWith('/paymentConfirm', {
      state: {
        count: 2,
        totalCount: 3,
        price: 130000,
      },
    });
  });

  it('쿠폰 적용 버튼이 표시되어야 한다', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('쿠폰 적용')).toBeInTheDocument();
    });
  });
});
