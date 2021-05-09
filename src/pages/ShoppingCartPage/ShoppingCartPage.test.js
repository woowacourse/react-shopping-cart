import { render, screen, waitFor } from '@testing-library/react';
import ShoppingCartPage from '.';
import { server } from '../../mocks/server';

server.listen();
afterEach(() => server.resetHandlers());

describe('ShoppingCartPage', () => {
  test('장바구니에 담긴 상품들을 불러온다.', async () => {
    render(<ShoppingCartPage />);

    await waitFor(() => screen.getByText('test cart item name'));
  });
});

server.close();
