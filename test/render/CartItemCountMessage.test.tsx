import { render, screen, waitFor } from '@testing-library/react';
import { mockCartItems } from '../mocks';
import { act } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../../src/router/router';

describe('CartItemCountMessage 컴포넌트 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<RouterProvider router={router} />));
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
