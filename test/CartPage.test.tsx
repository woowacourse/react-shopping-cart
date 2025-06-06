import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import CartPage from '../src/pages/CartPage';
import * as cartApi from '../src/apis/cart';
import { DataProvider } from '../src/context/DataContext';
import { CartSelectionProvider } from '../src/context/CartSelectContext';
import { CartProduct } from '../src/types/cart';

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

vi.mock('../src/components/Header/Header', () => ({
  default: function MockHeader({ title }: { title: string }) {
    return <div data-testid="header">{title}</div>;
  },
}));

vi.mock('../src/components/Cart/CartMain', () => ({
  default: function MockCartMain({
    price,
    shippingFee,
    totalPrice,
  }: {
    price: number;
    shippingFee: number;
    totalPrice: number;
  }) {
    return (
      <div data-testid="cart-main">
        <div data-testid="price">{price}</div>
        <div data-testid="shipping-fee">{shippingFee}</div>
        <div data-testid="total-price">{totalPrice}</div>
      </div>
    );
  },
}));

describe('CartPage', () => {
  const mockCartItems: CartProduct[] = [
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
  ];

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <DataProvider>
          <CartSelectionProvider>
            <CartPage />
          </CartSelectionProvider>
        </DataProvider>
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (cartApi.getCartItems as Mock).mockResolvedValue({
      content: mockCartItems,
    });
  });

  it('장바구니 아이템이 있을 때 올바르게 렌더링되어야 한다', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('cart-main')).toBeInTheDocument();
      expect(screen.getByText('주문확인')).toBeInTheDocument();
    });
  });

  it('장바구니가 비어있을 때 빈 장바구니 메시지가 표시되어야 한다', async () => {
    (cartApi.getCartItems as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      content: [],
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('장바구니에 담은 상품이 없습니다.')).toBeInTheDocument();
    });
  });

  it('총 가격이 올바르게 계산되어야 한다', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('price')).toHaveTextContent('130000');
    });
  });

  it('10만원 미만일 때 배송비가 3000원이어야 한다', async () => {
    const cheapItems = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 101,
          name: '상품1',
          price: 30000,
          imageUrl: 'https://example.com/1.jpg',
          category: 'test',
        },
      },
    ];
    (cartApi.getCartItems as Mock).mockResolvedValue({
      content: cheapItems,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('shipping-fee')).toHaveTextContent('3000');
      expect(screen.getByTestId('total-price')).toHaveTextContent('33000');
    });
  });

  it('10만원 이상일 때 배송비가 면제되어야 한다', async () => {
    const exactItems = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 101,
          name: '상품1',
          price: 100000,
          imageUrl: 'https://example.com/1.jpg',
          category: 'test',
        },
      },
    ];
    (cartApi.getCartItems as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      content: exactItems,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('shipping-fee')).toHaveTextContent('0');
      expect(screen.getByTestId('total-price')).toHaveTextContent('100000');
    });
  });

  it('주문확인 버튼 클릭 시 올바른 state와 함께 orderConfirm 페이지로 이동한다.', async () => {
    const mockCartItems = {
      content: [
        {
          id: 1,
          quantity: 1,
          product: { id: 101, name: '상품1', price: 100000, imageUrl: '', category: '패션잡화' },
        },
        {
          id: 2,
          quantity: 2,
          product: { id: 102, name: '상품2', price: 15000, imageUrl: '', category: '식료품' },
        },
      ],
    };

    vi.mock('../context/DataContext', () => ({
      useData: () => ({
        data: mockCartItems,
      }),
    }));

    renderComponent();

    await waitFor(() => {
      const orderButton = screen.getByText('주문확인');
      expect(orderButton).toBeInTheDocument();
    });

    const orderButton = screen.getByText('주문확인');
    fireEvent.click(orderButton);

    expect(mockNavigate).toHaveBeenCalledWith('/orderConfirm', {
      state: {
        price: 130000,
        count: 2,
        totalCount: 3,
      },
    });
  });

  it('선택된 아이템이 없을 때 주문확인 버튼이 비활성화되어야 한다', async () => {
    (cartApi.getCartItems as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      content: [],
    });

    renderComponent();

    await waitFor(() => {
      const orderButton = screen.getByText('주문확인') as HTMLButtonElement;
      expect(orderButton).toBeDisabled();
    });
  });
});
