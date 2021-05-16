import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import OrderConfirmPage from '.';
import { ORDER_CONFIRM_ITEM_LIST_MOCK } from '../../mocks/mockData';
import store from '../../states/store';

describe('OrderConfirmPage', () => {
  test('주문할 상품 목록을 보여준다.', async () => {
    render(
      <Provider store={store}>
        <OrderConfirmPage />
      </Provider>
    );

    const $$orderConfirmListItems = await screen.findAllByTestId('order-confirm-list-item');
    expect($$orderConfirmListItems).toHaveLength(ORDER_CONFIRM_ITEM_LIST_MOCK.length);
  });
});
