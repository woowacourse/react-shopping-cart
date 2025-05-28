import { render, screen } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';

import * as cartApi from '@/api/cart';
import { CartPage } from '@/features/Cart/pages/CartPage';

export const renderCartPage = () => render(<CartPage />);

vi.mock('@/api/cart');
const mockCartApi = vi.mocked(cartApi);

describe('장바구니 목록을 렌더링 한다.', () => {
  it('장바구니 페이지에 진입했을 때, 상품이 존재한다면 목록을 보여준다.', async () => {
    // Given: 장바구니 페이지를 렌더링한다.
    // When: 장바구니 페이지에 삭제 버튼이 존재한다는 것은 상품이 존재한다는 것이다.
    mockCartApi.getCartItemList.mockResolvedValue([
      {
        id: 1,
        quantity: 2,
        isChecked: true,
        product: {
          id: 1,
          name: '상품1',
          category: 'dd',
          quantity: 10,
          price: 10000,
          imageUrl: '/test1.jpg',
        },
      },
      {
        id: 2,
        quantity: 1,
        isChecked: false,
        product: {
          id: 2,
          name: '상품2',
          price: 20000,
          quantity: 10,
          category: 'dd',
          imageUrl: '/test2.jpg',
        },
      },
    ]);

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
});
