import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import useCartChangeQuantity from '.';
import useCartItems from '..';
import { CART_ITEM_LIST_MOCK } from '../../../mocks/mockData';
import store from '../../../states/store';

describe('useCartChangeQuantity', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  test('changeQuantity', async () => {
    const { result: useCartItemsResult, waitForNextUpdate } = renderHook(() => useCartItems(), {
      wrapper,
    });
    const { result } = renderHook(() => useCartChangeQuantity(), { wrapper });

    useCartItemsResult.current.loadCartItems();

    await waitForNextUpdate();

    const targetItem = CART_ITEM_LIST_MOCK[0];
    const EXPECTED_QUANTITY = 100;

    result.current.changeQuantity(targetItem, EXPECTED_QUANTITY);

    await waitForNextUpdate();

    const updatedTargetItem = useCartItemsResult.current.itemsInCart.find(
      (item) => item.id === targetItem.id
    );

    expect(updatedTargetItem.quantity).toBe(EXPECTED_QUANTITY);
  });
});
