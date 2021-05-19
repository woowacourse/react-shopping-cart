import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { act } from 'react-test-renderer';
import useCartChangeCheckState from '.';
import useCartItems from '..';
import { CART_ITEM_LIST_MOCK } from '../../../mocks/mockData';
import store from '../../../states/store';

describe('useCartChangeCheckState', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  test('changeChecked', async () => {
    const { result: useCartItemsResult } = renderHook(() => useCartItems(), { wrapper });
    const { result, waitForNextUpdate } = renderHook(() => useCartChangeCheckState(), { wrapper });

    useCartItemsResult.current.loadCartItems();

    await waitForNextUpdate();

    const targetItem = {
      id: '1',
      image: 'https://picsum.photos/200/200',
      name: 'test cart item name',
      price: 43400,
      checked: true,
      quantity: 3,
    };
    const beforeCheckState = targetItem.checked;

    act(() => {
      result.current.changeChecked(targetItem);
    });

    await waitForNextUpdate();

    const updatedTargetItem = result.current.itemsInCart.find((item) => item.id === targetItem.id);

    console.log(updatedTargetItem);

    expect(updatedTargetItem.checked).toBe(!beforeCheckState);
  });

  test('changeAllChecked', async () => {
    const { result: useCartItemsResult } = renderHook(() => useCartItems(), { wrapper });
    const { result, waitForNextUpdate } = renderHook(() => useCartChangeCheckState(), { wrapper });
    const EXPECTED_CHECK_STATE = false;

    useCartItemsResult.current.loadCartItems();

    await waitForNextUpdate();

    act(() => {
      result.current.changeAllChecked(EXPECTED_CHECK_STATE);
    });

    await waitForNextUpdate();

    const isAllCheckStateAsExpected = result.current.itemsInCart.every(
      (item) => item.checked === EXPECTED_CHECK_STATE
    );

    expect(isAllCheckStateAsExpected).toBe(true);
  });
});
