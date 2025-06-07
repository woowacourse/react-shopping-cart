import { act, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderSuccessPage from './OrderSuccessPage';

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

const mockOrderList = [
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

const mockPaymentAmount = 170_000;

const mockState = {
  orderList: mockOrderList,
  paymentAmount: mockPaymentAmount,
};

describe('OrderSuccessPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('orderList의 종류, 각 아이템의 개수, 총 주문 금액이 올바르게 렌더링된다', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/order-success', state: mockState }]}>
          <OrderSuccessPage />
        </MemoryRouter>,
      );
    });

    expect(screen.getByText(/총 2종류의 상품/)).toBeInTheDocument();
    expect(screen.getByText(/5개를 주문합니다/)).toBeInTheDocument();
    expect(screen.getByText('170,000원')).toBeInTheDocument();
  });

  it('헤더의 뒤로 가기 버튼을 클릭하면 navigate 함수가 호출된다.', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/order-success', state: mockState }]}>
          <OrderSuccessPage />
        </MemoryRouter>,
      );
    });

    const backButton = screen.getByRole('button', { name: '뒤로 가기' });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
