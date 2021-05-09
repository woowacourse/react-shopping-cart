import { render, screen, waitFor } from '@testing-library/react';
import ProductListPage from '.';
import { server } from '../../mocks/server';

server.listen();
afterEach(() => server.resetHandlers());

describe('ProductListPage', () => {
  test('상품 리스트를 불러온다.', async () => {
    render(<ProductListPage />);

    await waitFor(() => screen.getByText('test product name'));
  });
});

server.close();
