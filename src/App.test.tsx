import App from './App';

import { fireEvent, render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { TEST_ID } from './constants/test';

describe('App', () => {
  beforeEach(cleanup);

  describe('Routing', () => {
    it('Header Routing', async () => {
      const { getByTestId, findByTestId } = render(<App />);

      const homeLink = getByTestId(TEST_ID.HOME_LINK);
      await act(async () => {
        fireEvent.click(homeLink);
        await findByTestId(TEST_ID.PRODUCT_LIST_PAGE);
      });

      const cartLink = getByTestId(TEST_ID.CART_LINK);
      await act(async () => {
        fireEvent.click(cartLink);
        await findByTestId(TEST_ID.SHOPPING_CART_PAGE);
      });

      const orderListLink = getByTestId(TEST_ID.ORDER_LIST_LINK);
      await act(async () => {
        fireEvent.click(orderListLink);
        await findByTestId(TEST_ID.ORDER_LIST_PAGE);
      });
    });
  });
});
