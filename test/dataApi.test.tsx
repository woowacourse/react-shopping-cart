import { cleanup, render, screen, within } from '@testing-library/react';
import App from '../src/App';
import cartItems from '../src/mocks/data/cartItems.json';
import { describe, it, expect } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../src/mocks/handler';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
  server.close();
});

describe('Cart List Rendering', () => {
  it('장바구니 아이템이 올바르게 fetch 되는지 확인한다.', async () => {
    render(<App />);
    const cartItemListElement = await screen.findByTestId('cart-item-list');
    expect(cartItemListElement.children.length).toBe(cartItems.content.length);
  });
});

describe('Cart Item Delete', () => {
  it('상품 삭제 버튼 클릭 시 장바구니에서 제거된다.', async () => {
    render(<App />);
    const cartItemListElement = await screen.findByTestId('cart-item-list');

    expect(cartItemListElement.children.length).toBe(cartItems.content.length);

    const deleteButton = screen.getAllByRole('button', { name: '삭제' })[0];
    deleteButton.click();

    const updatedCartItemListElement = await screen.findByTestId('cart-item-list');
    expect(updatedCartItemListElement.children.length).toBe(cartItems.content.length - 1);
  });
});

describe('Cart Item Quantity', () => {
  it('플러스 버튼 클릭 시 수량이 1 증가해야 한다.', async () => {
    render(<App />);

    const steppers = await screen.findAllByTestId('stepper');
    const stepper = steppers[0];

    const quantitySpan = within(stepper).getByText(/\d+/);
    const initialQuantity = Number(quantitySpan.textContent);

    const plusButton = within(stepper).getByRole('button', { name: /플러스 버튼/i });
    plusButton.click();

    const updatedQuantity = await within(stepper).findByText(String(initialQuantity + 1));
    expect(updatedQuantity).toBeInTheDocument();
  });

  it('플러스 버튼 클릭 시 수량이 1 증가해야 한다.', async () => {
    render(<App />);

    const steppers = await screen.findAllByTestId('stepper');
    const stepper = steppers[0];

    const quantitySpan = within(stepper).getByText(/\d+/);
    const initialQuantity = Number(quantitySpan.textContent);

    const plusButton = within(stepper).getByRole('button', { name: /마이너스 버튼/i });
    plusButton.click();

    const updatedQuantity = await within(stepper).findByText(String(initialQuantity - 1));
    expect(updatedQuantity).toBeInTheDocument();
  });
});
