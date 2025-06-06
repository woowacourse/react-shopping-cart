import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PriceContainer from './PriceContainer';

describe('CartPage의 PriceContainer', () => {
  it('주문 목록에 담긴 상품의 개수 * 가격만큼 주문 금액이 나온다. 주문 금액이 10만원 미만인 경우 배송비가 3,000원이다.', async () => {
    const price = 10_000;
    const deliveryFee = 3000;
    const orderTotalPrice = price + deliveryFee;
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <PriceContainer
            orderPrice={price}
            deliveryFee={deliveryFee}
            orderTotalPrice={orderTotalPrice}
          />
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('order-price').textContent).toBe('10,000원');
    expect(screen.getByTestId('delivery-price').textContent).toBe('3,000원');
    expect(screen.getByTestId('payment-price').textContent).toBe('13,000원');
  });

  it('주문 목록에 담긴 상품의 개수 * 가격만큼 주문 금액이 나온다. 주문 금액이 10만원 이상인 경우 배송비가 0원이다.', async () => {
    const price = 100_000;
    const deliveryFee = 0;
    const orderTotalPrice = price + deliveryFee;
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <PriceContainer
            orderPrice={price}
            deliveryFee={deliveryFee}
            orderTotalPrice={orderTotalPrice}
          />
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('order-price').textContent).toBe('100,000원');
    expect(screen.getByTestId('delivery-price').textContent).toBe('0원');
    expect(screen.getByTestId('payment-price').textContent).toBe('100,000원');
  });
});
