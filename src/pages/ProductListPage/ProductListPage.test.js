import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ProductListPage from '.';
import { server } from '../../mocks/server';
import store from '../../states/store';

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
});

describe('ProductListPage', () => {
  test('상품 리스트를 불러온다.', async () => {
    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );

    await waitFor(() => screen.getByText('test product name'));
  });
});
