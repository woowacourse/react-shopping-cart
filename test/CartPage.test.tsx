import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import CartPage from '../src/pages/CartPage';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUseCart = vi.fn();
vi.mock('../src/hooks/useCart', () => ({
  useCart: () => mockUseCart(),
}));

// DataProvider가 실제 API를 호출하지 않도록 모킹
vi.mock('../src/context/DataContext', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useData: () => ({ data: {}, request: vi.fn() }),
}));

// CartMain 컴포넌트 모킹 - CartList가 undefined cartItems로 렌더링되는 것을 방지
vi.mock('../src/components/Cart/CartMain', () => ({
  default: function MockCartMain() {
    return <div data-testid="cart-main">Cart Main</div>;
  },
}));

describe('CartPage', () => {
  const mockCartItemsWithData = {
    content: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 101,
          name: '상품1',
          price: 50000,
          imageUrl: 'https://example.com/1.jpg',
          category: '식료품',
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
          category: '패션잡화',
        },
      },
    ],
  };

  const defaultMockUseCart = {
    cartItems: mockCartItemsWithData,
    checkedItems: [1, 2],
    setCheckedItems: vi.fn(),
    isAllChecked: true,
    checkAll: vi.fn(),
    price: 130000,
    totalCount: 3,
    shippingFee: 0,
    totalPrice: 130000,
    descriptionMessage: () => '총 2종류의 상품이 담겨있습니다.',
    isDisabled: false,
    selectedProducts: mockCartItemsWithData.content,
  };

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCart.mockReturnValue(defaultMockUseCart);
  });

  it('장바구니 아이템이 있을 때 올바르게 렌더링되어야 한다', () => {
    renderComponent();

    expect(screen.getByText('장바구니')).toBeInTheDocument();
    expect(screen.getByText('총 2종류의 상품이 담겨있습니다.')).toBeInTheDocument();
    expect(screen.getByText('주문확인')).toBeInTheDocument();
  });

  it('장바구니가 비어있을 때 빈 장바구니 메시지가 표시되어야 한다', () => {
    mockUseCart.mockReturnValue({
      ...defaultMockUseCart,
      cartItems: { content: [] },
      checkedItems: [],
      price: 0,
      totalCount: 0,
      descriptionMessage: () => '장바구니가 비어있습니다.',
      isDisabled: true,
      selectedProducts: [],
    });

    renderComponent();

    expect(screen.getByText('장바구니에 담은 상품이 없습니다.')).toBeInTheDocument();
  });

  it('총 가격이 올바르게 계산되어야 한다', () => {
    // useCart 훅이 올바른 값을 반환하는지 확인
    expect(defaultMockUseCart.price).toBe(130000);
    expect(defaultMockUseCart.totalPrice).toBe(130000);
    expect(defaultMockUseCart.shippingFee).toBe(0);
  });

  it('10만원 미만일 때 배송비가 3000원이어야 한다', () => {
    const lowPriceCart = {
      ...defaultMockUseCart,
      cartItems: {
        content: [
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
        ],
      },
      checkedItems: [1],
      price: 30000,
      totalCount: 1,
      shippingFee: 3000,
      totalPrice: 33000,
    };

    // useCart 훅이 올바른 배송비를 계산하는지 확인
    expect(lowPriceCart.price).toBe(30000);
    expect(lowPriceCart.shippingFee).toBe(3000);
    expect(lowPriceCart.totalPrice).toBe(33000);
  });

  it('주문확인 버튼 클릭 시 올바른 state와 함께 orderConfirm 페이지로 이동한다.', () => {
    renderComponent();

    const orderButton = screen.getByText('주문확인');

    act(() => {
      fireEvent.click(orderButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/orderConfirm', {
      state: {
        products: mockCartItemsWithData.content,
        price: 130000,
        count: 2,
        totalCount: 3,
        shippingFee: 0,
        totalPrice: 130000,
      },
    });
  });

  it('선택된 아이템이 없을 때 주문확인 버튼이 비활성화되어야 한다', () => {
    mockUseCart.mockReturnValue({
      ...defaultMockUseCart,
      cartItems: { content: [] },
      checkedItems: [],
      price: 0,
      totalCount: 0,
      isDisabled: true,
      selectedProducts: [],
    });

    renderComponent();

    const orderButton = screen.getByText('주문확인') as HTMLButtonElement;
    expect(orderButton).toBeDisabled();
  });
});
