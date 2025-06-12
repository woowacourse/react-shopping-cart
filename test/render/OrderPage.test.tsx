import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from '../../src/App';

describe('OrderPage 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<App />));
  });

  it('하단 버튼을 한 번 누르면 주문 확인 페이지로 이동된다.', async () => {
    const confirmButton = screen.getByText('주문 확인');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByTestId('orderPage')).toBeInTheDocument();
    });
  });

  it('주문 확인 페이지에선 쿠폰 적용 버튼이 표시된다.', async () => {
    await waitFor(() => {
      expect(screen.getByText('쿠폰 적용')).toBeInTheDocument();
    });
  });

  it('주문 확인 페이지에선 제주도 및 도서 산간 지역을 확인하기 위한 체크박스가 표시된다.', async () => {
    await waitFor(() => {
      expect(screen.getByText('제주도 및 도서 산간 지역')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('checkBox')).toBeInTheDocument();
    });
  });

  it('주문 확인 페이지에선 결제하기 버튼이 표시된다.', async () => {
    await waitFor(() => {
      expect(screen.getByText('결제하기')).toBeInTheDocument();
    });
  });

  it('주문 확인 페이지에선 다시 장바구니 목록으로 돌아갈 수 있는 버튼이 표시된다.', async () => {
    const backButton = screen.getByAltText('goBack');

    await waitFor(() => {
      expect(backButton).toBeInTheDocument();
    });

    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });
  });
});
