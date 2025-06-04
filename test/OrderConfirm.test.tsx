import { render, screen } from '@testing-library/react';
import { resetCartItems } from '../src/mocks/handlers';
import { server } from '../src/mocks/server';
import { OrderConfirm } from '../src/pages/OrderConfirm/OrderConfirm';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('주문확인 페이지 테스트', () => {
  beforeEach(() => {
    resetCartItems();
  });

  it("장바구니 페이지에서 '주문확인' 버튼을 누르면, 전송된 값을 주문확인 페이지에서 확인할 수 있다.", () => {
    const fakeState = {
      selectedItemGroupCount: 2,
      selectedCartItem: 4,
      totalPrice: 10000,
    };

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/confirm',
            state: fakeState,
          },
        ]}
      >
        <OrderConfirm />
      </MemoryRouter>
    );

    expect(screen.getByText('10,000원')).toBeInTheDocument();
    expect(
      screen.getByText(
        '총 2종류의 상품 4개를 주문합니다. 최종 결제 금액을 확인해 주세요.'
      )
    ).toBeInTheDocument();
  });
});
