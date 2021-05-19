import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { act } from 'react-test-renderer';
import useCartAddItem from '.';
import store from '../../../states/store';

describe('useCartAddItem', () => {
  test('addItem', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCartAddItem(), {
      wrapper: ({ children }) => {
        return <Provider store={store}>{children}</Provider>;
      },
    });

    const beforeCartItems = result.current.itemsInCart;

    const newCartItem = {
      id: '100',
      image: 'http://test.com',
      name: '테스트 상품',
      price: 5000000,
    };

    act(() => {
      result.current.addItem(newCartItem);
    });

    await waitForNextUpdate();

    expect(beforeCartItems.length + 1).toBe(result.current.itemsInCart.length);
  });
});
