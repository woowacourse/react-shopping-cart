import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ShoppingCartPage from '.';
import { server } from '../../mocks/server';
import store from '../../states/store';

server.listen();
afterEach(() => server.resetHandlers());

describe('ShoppingCartPage', () => {
  test('장바구니에 담긴 상품들을 불러온다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    await waitFor(() => screen.getByText('test cart name'));
  });
});

server.close();
