import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from '../../src/App';

describe('쿠폰 상태를 보여주는 모달 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<App />));
  });

  it('주문 확인 페이지에서 쿠폰 적용 버튼을 누르면 모달이 표시된다.', async () => {
    const confirmButton = screen.getByText('주문 확인');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByTestId('orderPage')).toBeInTheDocument();
    });

    const couponButton = screen.getByText('쿠폰 적용');
    fireEvent.click(couponButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  it('모달은 overlay를 눌러 닫을 수 있다.', async () => {
    const couponButton = screen.getByText('쿠폰 적용');
    fireEvent.click(couponButton);

    const modal = await screen.findByTestId('modal');

    const overlay = await screen.findByTestId('modal-overlay');
    fireEvent.click(overlay);

    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });
});
