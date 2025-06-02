import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from '../../src/App';

describe('NoCartItems 컴포넌트 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<App />));
  });

  it('장바구니에 상품이 하나도 없을 때, 메세지를 표시한다', async () => {
    const allDeleteButton = await screen.findAllByText('삭제');
    allDeleteButton.forEach((button) => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('장바구니에 담은 상품이 없습니다.')).toBeInTheDocument();
    });
  });
});
