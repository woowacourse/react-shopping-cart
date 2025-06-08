import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PaymentContents from '../src/components/features/payment/paymentContents/PaymentContents';

vi.mock('react-router', () => ({
  useLocation: () => ({
    state: {
      quantity: 2,
      price: 50000,
      productQuantity: 3,
    },
  }),
  useNavigate: () => vi.fn(),
}));

describe('PaymentContents', () => {
  it('주문 정보가 올바르게 표시된다', () => {
    render(
      <MemoryRouter>
        <PaymentContents />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        (content) =>
          content.includes('총 2종류의 상품') &&
          content.includes('3개를 주문합니다.')
      )
    ).toBeInTheDocument();

    expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByText('50,000원')).toBeInTheDocument();
  });

  it('장바구니로 돌아가기 버튼이 존재한다', () => {
    render(
      <MemoryRouter>
        <PaymentContents />
      </MemoryRouter>
    );

    expect(screen.getByText('장바구니로 돌아가기')).toBeInTheDocument();
  });
});
