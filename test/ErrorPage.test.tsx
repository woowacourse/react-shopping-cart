import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../src/router/router';

describe('에러 페이지 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<RouterProvider router={router} />));
  });

  it('잘못된 URL 접근 시 에러 이미지가 보여야 한다.', async () => {
    await act(() => router.navigate('/wrong_url'));
    const errorImage = screen.getByAltText('에러 이미지');
    const errorMessage = screen.getByText('404! 잘못된 URL 접근입니다.');

    await waitFor(() => {
      expect(errorImage).toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
