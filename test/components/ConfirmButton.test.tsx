import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { act } from 'react';
import App from '../../src/App';

describe('ConfirmButton 컴포넌트 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<App />));
  });

  it('장바구니에 하나라도 상품이 선택된 경우, 버튼이 활성화된다.', async () => {
    const confirmButton = screen.getByText('주문 확인');
    await waitFor(() => {
      expect(confirmButton).toBeEnabled();
    });
  });

  it('장바구니 목록이 아예 없는 경우, 버튼이 비활성화된다.', async () => {
    const confirmButton = screen.getByText('주문 확인');
    const allDeleteButton = await screen.findAllByText('삭제');
    allDeleteButton.forEach((button) => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(confirmButton).not.toBeEnabled();
    });
  });

  it('선택된 상품이 하나도 없는 경우, 버튼이 비활성화된다.', async () => {
    const confirmButton = screen.getByText('주문 확인');
    const allCheckSection = screen.getByTestId('allCheckSection');
    const allCheckBox = within(allCheckSection).getByTestId('checkBox');
    fireEvent.click(allCheckBox);

    await waitFor(() => {
      expect(confirmButton).not.toBeEnabled();
    });
  });
});
