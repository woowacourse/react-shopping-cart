import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CartItemsProvider from '../src/contexts/CartItemsProvider';
import { act } from 'react';
import PageProvider from '../src/contexts/PageProvider';
import PageController from '../src/pages/PageController';

describe('NoCartItems 컴포넌트 테스트', () => {
  beforeEach(async () => {
    await act(() =>
      render(
        <PageProvider>
          <CartItemsProvider>
            <PageController />
          </CartItemsProvider>
        </PageProvider>
      )
    );
  });

  it('장바구니에 상품이 하나도 없을 때, 메세지를 표시한다', async () => {
    const allDeleteButton = await screen.findAllByText('삭제');
    allDeleteButton.forEach((button) => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(
        screen.getByText('장바구니에 담은 상품이 없습니다.')
      ).toBeInTheDocument();
    });
  });
});
