import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { act } from 'react-test-renderer';
import useCartDeleteItem from '.';
import useCartItems from '..';
import { CART_ITEM_LIST_MOCK } from '../../../mocks/mockData';
import store from '../../../states/store';

describe('useCartDeleteItem', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  test('deleteItem', async () => {
    const { result: useCartItemsResult, waitForNextUpdate } = renderHook(() => useCartItems(), {
      wrapper,
    });
    const { result } = renderHook(() => useCartDeleteItem(), { wrapper });

    act(() => {
      useCartItemsResult.current.loadCartItems();
    });

    await waitForNextUpdate();

    const targetItemId = CART_ITEM_LIST_MOCK[0].id;

    act(() => {
      result.current.deleteItem(targetItemId);
    });

    await waitForNextUpdate();

    const isTargetItemExist =
      useCartItemsResult.current.cartItems.find((item) => item.id === targetItemId) || false;

    expect(isTargetItemExist).toBe(false);
  });

  test('deleteItems', async () => {
    const { result: useCartItemsResult, waitForNextUpdate } = renderHook(() => useCartItems(), {
      wrapper,
    });
    const { result } = renderHook(() => useCartDeleteItem(), { wrapper });

    act(() => {
      useCartItemsResult.current.loadCartItems();
    });

    await waitForNextUpdate();

    const targetItems = CART_ITEM_LIST_MOCK.slice(0, 2);

    act(() => {
      result.current.deleteItems(targetItems);
    });

    await waitForNextUpdate();

    const isTargetItemExist = useCartItemsResult.current.cartItems.every(
      (item) => item.id !== targetItems[0].id && item.id !== targetItems[1].id
    );

    expect(isTargetItemExist).toBe(false);
  });

  test('clearCart', async () => {
    const { result: useCartItemsResult, waitForNextUpdate } = renderHook(() => useCartItems(), {
      wrapper,
    });
    const { result } = renderHook(() => useCartDeleteItem(), { wrapper });

    act(() => {
      useCartItemsResult.current.loadCartItems();
    });

    await waitForNextUpdate();

    act(() => {
      result.current.clearCart();
    });

    await waitForNextUpdate();

    expect(useCartItemsResult.current.cartItems.length).toBe(0);
  });
});
