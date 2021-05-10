import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ShoppingCartPage from '.';
import store from '../../states/store';

describe('ShoppingCartPage', () => {
  test('장바구니에 담긴 상품들을 불러온다.', async () => {
    render(
      <Provider store={store}>
        <ShoppingCartPage />
      </Provider>
    );

    await waitFor(() => screen.getByText('test cart item name'));
  });
});
