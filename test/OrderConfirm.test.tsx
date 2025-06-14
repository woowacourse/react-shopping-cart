import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { OrderConfirmPage } from '@/pages/OrderConfirmPage';

import { cartItems } from './Cart.data';

const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
const renderOrderConfirmPage = () => {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/order-confirm',
          state: {
            cartItems: cartItems,
            totalDiscountPrice: totalPrice,
          },
        },
      ]}
    >
      <OrderConfirmPage />
    </MemoryRouter>
  );
};

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('결제 확인 페이지를 렌더링 한다.', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });
  it('주문 확인 페이지에 진입했을 때, 주문 확인 페이지가 렌더링된다.', async () => {
    act(() => {
      renderOrderConfirmPage();
    });

    expect(
      screen.getByText(/총 2종류의 상품 3개를 주문합니다. 최종 결제 금액을 확인해 주세요./)
    ).toBeInTheDocument();

    expect(screen.getByText('총 결제 금액 50,000원')).toBeInTheDocument();
  });

  it('장바구니로 돌아가기 버튼을 클릭했을 때, 장바구니 페이지로 이동한다.', async () => {
    renderOrderConfirmPage();

    const backToCartButton = screen.getByRole('button', { name: '장바구니로 돌아가기' });
    expect(backToCartButton).toBeInTheDocument();

    await user.click(backToCartButton);
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
