import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { resetCartItems } from '../src/mocks/handlers';
import CartPage from '../src/pages/cart/CartPage';
import OrderCheckPage from '@/pages/orderCheck/OrderCheckPage';

describe('OrderCheckPage 테스트', () => {
  beforeEach(() => {
    resetCartItems();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/order-check" element={<OrderCheckPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('CartTitle이 현재 장바구니에 담겨있는 수량으로 나타난다.', async () => {
    const buttons = await screen.findAllByRole('button');
    const orderCheckButton = buttons[buttons.length - 1];

    fireEvent.click(orderCheckButton);

    expect(
      screen.getByText((content) =>
        content.includes('총 4종류의 상품 5개를 주문합니다.')
      )
    ).toBeInTheDocument();
    expect(screen.getByText('158,000원')).toBeInTheDocument();
  });
});
