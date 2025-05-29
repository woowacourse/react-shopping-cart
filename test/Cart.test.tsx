import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach } from 'vitest';

import * as cartApi from '@/api/cart';
import { CartPage } from '@/features/Cart/pages/CartPage';
import { ShoppingContext } from '@/shared/context/shoppingContext';

import { cartItems } from './Cart.data';

export const renderCartPage = () =>
  render(
    <ShoppingContext>
      <CartPage />
    </ShoppingContext>
  );

vi.mock('@/api/cart');
const mockCartApi = vi.mocked(cartApi);

describe('장바구니 목록을 렌더링 한다.', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let currentCartItems: typeof cartItems;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    currentCartItems = [...cartItems];
  });
  it('장바구니 페이지에 진입했을 때, 상품이 존재한다면 목록을 보여준다.', async () => {
    // Given: 장바구니 페이지를 렌더링한다.
    // When: 장바구니 페이지에 삭제 버튼이 존재한다는 것은 상품이 존재한다는 것이다.
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    renderCartPage();
    const cartButton = await screen.findAllByRole('button', {
      name: /삭제$/,
    });

    // Then: cartButton의 개수가 1개 이상이어야 한다.
    expect(cartButton.length).toBeGreaterThan(1);
  });

  it('장바구니 페이지에 진입했을 때, 상품이 존재하지 않는다면 빈 장바구니 메시지를 보여준다.', async () => {
    mockCartApi.getCartItemList.mockResolvedValue([]);

    renderCartPage();

    const emptyText = await screen.findByText(/장바구니가 비어있습니다\.?$/);
    expect(emptyText).toBeInTheDocument();
  });

  it('장바구니 상품의 금액이 10만원 이하이라면, 배송비가 3000원임을 보여준다.', async () => {
    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...currentCartItems]);
    });

    renderCartPage();

    const deliveryFee = await screen.findByText('3,000원');
    expect(deliveryFee).toBeInTheDocument();
  });

  it('장바구니 상품의 금액이 10만원 이상이라면, 배송비가 0원임을 보여준다.', async () => {
    const highPriceItems = currentCartItems.map((item) => ({
      ...item,
      isChecked: true,
      product: { ...item.product, price: 50000 },
    }));

    mockCartApi.getCartItemList.mockImplementation(async () => {
      return Promise.resolve([...highPriceItems]);
    });

    renderCartPage();

    const deliveryFee = await screen.findByText('0원');
    expect(deliveryFee).toBeInTheDocument();
  });
});
