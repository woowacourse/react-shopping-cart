import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { act } from 'react-test-renderer';
import useCartAddItem from '.';
import useCartItems from '..';
import store from '../../../states/store';

describe('useCartAddItem', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  test('addItem', async () => {
    const { result: useCartItemsResult, waitForNextUpdate } = renderHook(() => useCartItems(), {
      wrapper,
    });
    const { result } = renderHook(() => useCartAddItem(), {
      wrapper,
    });

    const beforeCartItems = useCartItemsResult.current.itemsInCart;

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

    expect(beforeCartItems.length + 1).toBe(useCartItemsResult.current.itemsInCart.length);
  });
});
