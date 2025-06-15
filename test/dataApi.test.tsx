import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
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
