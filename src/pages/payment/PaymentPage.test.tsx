import { act, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaymentPage from './PaymentPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockOrderItems = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: '토마토',
      price: 10000,
      imageUrl: '1',
      quantity: 5,
    },
  },
  {
    id: 2,
    quantity: 3,
    product: {
      id: 2,
      name: '우비',
      price: 50000,
      imageUrl: '2',
      quantity: 5,
    },
  },
];

const mockOrderTotalPrice = 170_000;

const mockState = {
  orderItems: mockOrderItems,
  orderTotalPrice: mockOrderTotalPrice,
};

describe('PaymentPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('state가 없을 경우 장바구니 페이지로 이동한다', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/payment' }]}>
          <PaymentPage />
        </MemoryRouter>,
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('orderList의 종류, 각 아이템의 개수, 총 주문 금액이 올바르게 렌더링된다', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/payment', state: mockState }]}>
          <PaymentPage />
        </MemoryRouter>,
      );
    });

    expect(screen.getByText(/총 2종류의 상품/)).toBeInTheDocument();
    expect(screen.getByText(/5개를 주문했습니다/)).toBeInTheDocument();
    expect(screen.getByText('170,000원')).toBeInTheDocument();
  });

  it('장바구니로 돌아가기 버튼을 클릭하면 장바구니 페이지로 이동한다', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/payment', state: mockState }]}>
          <PaymentPage />
        </MemoryRouter>,
      );
    });

    const cartButton = screen.getByText('장바구니로 돌아가기');
    expect(cartButton).toBeInTheDocument();

    fireEvent.click(cartButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
