import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { act } from 'react-test-renderer';
import useCartChangeCheckState from '.';
import useCartItems from '..';
import { CART_ITEM_LIST_MOCK } from '../../../mocks/mockData';
import store from '../../../states/store';

describe('useCartChangeCheckState', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  test('toggleChecked', async () => {
    const { result: useCartItemsResult, waitForNextUpdate } = renderHook(() => useCartItems(), {
      wrapper,
    });
    const { result } = renderHook(() => useCartChangeCheckState(), { wrapper });

    act(() => {
      useCartItemsResult.current.loadCartItems();
    });

    await waitForNextUpdate();

    const targetItem = CART_ITEM_LIST_MOCK[0];
    const beforeCheckState = targetItem.checked;

    act(() => {
      result.current.toggleChecked(targetItem);
    });

    await waitForNextUpdate();

    const updatedTargetItem = useCartItemsResult.current.cartItems.find(
      (item) => item.id === targetItem.id
    );

    expect(updatedTargetItem.checked).toBe(!beforeCheckState);
  });

  test('changeAllChecked', async () => {
    const { result: useCartItemsResult } = renderHook(() => useCartItems(), { wrapper });
    const { result, waitForNextUpdate } = renderHook(() => useCartChangeCheckState(), { wrapper });
    const EXPECTED_CHECK_STATE = false;

    act(() => {
      useCartItemsResult.current.loadCartItems();
    });

    await waitForNextUpdate();

    act(() => {
      result.current.changeAllChecked(EXPECTED_CHECK_STATE);
    });

    await waitForNextUpdate();

    const isAllCheckStateAsExpected = useCartItemsResult.current.cartItems.every(
      (item) => item.checked === EXPECTED_CHECK_STATE
    );

    expect(isAllCheckStateAsExpected).toBe(true);
  });
});
