import { render, screen, waitFor } from '@testing-library/react';
import CartItemsProvider from '../src/contexts/CartItemsProvider';
import CartPage from '../src/pages/CartPage';
import { mockCartItems } from './mocks';
import { act } from 'react';

describe('CartItemCountMessage 컴포넌트 테스트', () => {
  beforeEach(async () => {
    await act(() =>
      render(
        <CartItemsProvider>
          <CartPage />
        </CartItemsProvider>
      )
    );
  });

  it('장바구니에 담긴 상품 종류 개수를 반영해서 표시한다', async () => {
    const cartItemCount = mockCartItems.length;

    await waitFor(() => {
      expect(
        screen.getByText(`현재 ${cartItemCount}종류의 상품이 담겨있습니다.`)
      ).toBeInTheDocument();
    });
  });
});
