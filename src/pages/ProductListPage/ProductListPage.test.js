import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ProductListPage from '.';
import { server } from '../../mocks/server';
import store from '../../states/store';

server.listen();
afterEach(() => server.resetHandlers());

describe('ProductListPage', () => {
  test('상품 리스트를 불러온다.', async () => {
    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );

    await waitFor(() => screen.getByText('test product name'));
  });

  test('각 상품을 장바구니에 담을 수 있다.', async () => {
    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );

    const [$addCartButton] = await waitFor(() => screen.getAllByTestId('add-cart-button'));

    fireEvent.click($addCartButton);

    const [$productName] = screen.getAllByTestId('product-name');

    expect(store.getState().cart.items[0].name).toEqual($productName.textContent);
  });
});

server.close();
