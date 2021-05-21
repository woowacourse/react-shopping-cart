import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import OrderListPage from '.';
import { ORDER_LIST_MOCK } from '../../mocks/mockData';
import store from '../../states/store';

describe('OrderListPage', () => {
  test('결제 별로 구매한 상품의 목록을 보여준다.', async () => {
    render(
      <Provider store={store}>
        <OrderListPage />
      </Provider>
    );

    const $$orderListItems = await screen.findAllByTestId('order-section');
    expect($$orderListItems).toHaveLength(ORDER_LIST_MOCK.length);
  });
});
