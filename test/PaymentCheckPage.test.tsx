import PaymentCheckPage from '@/pages/paymentCheck/PaymentCheckPage';
import { ROUTE } from '@/shared/constants/route';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { resetCartItems } from '../src/mocks/handlers';

describe('PaymentCheckPage 테스트', () => {
  beforeEach(() => {
    resetCartItems();

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: ROUTE.paymentCheck,
            state: {
              orderItemQuantity: 4,
              totalProductQuantity: 5,
              paymentPrice: 158_000,
            },
          },
        ]}
      >
        <Routes>
          <Route path={ROUTE.paymentCheck} element={<PaymentCheckPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('CartTitle이 현재 장바구니에 담겨있는 수량으로 나타난다.', async () => {
    expect(
      await screen.findByText((content) =>
        content.includes('총 4종류의 상품 5개를 주문했습니다.')
      )
    ).toBeInTheDocument();
    expect(await screen.findByText('158,000원')).toBeInTheDocument();
  });
});
