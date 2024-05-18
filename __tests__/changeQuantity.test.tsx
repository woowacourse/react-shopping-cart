import { useUpdateCartItemCount } from '@hooks/shoppingCart';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { INITIAL_ITEMS, QUANTITY_TEST_ITEMS } from './constants/cartItems';

describe('수량 변경 테스트', () => {
  it('- 버튼을 누를 경우, 수량이 1 감소한다.', async () => {
    const QUANTITY = INITIAL_ITEMS[0].quantity;

    const { result } = renderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsSelector);
        const { updateCartItems, getDecreasedQuantity, getIncreasedQuantity } = useUpdateCartItemCount(cartItems[0]);

        return { cartItems, updateCartItems, getDecreasedQuantity, getIncreasedQuantity };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, INITIAL_ITEMS);
              set(selectedIdsAtom, new Set(INITIAL_ITEMS.map((item) => item.id)));
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    await waitFor(() => {
      return result.current !== undefined;
    });

    const newQuantity = result.current.getDecreasedQuantity();

    await waitFor(() => {
      result.current.updateCartItems(newQuantity);
    });

    expect(newQuantity).toBe(QUANTITY - 1);
    expect(result.current.cartItems[0].quantity).toBe(newQuantity);
  });

  it('+ 버튼을 누를 경우, 수량이 1 증가한다.', async () => {
    const QUANTITY = INITIAL_ITEMS[0].quantity;

    const { result } = renderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsSelector);
        const { updateCartItems, getIncreasedQuantity } = useUpdateCartItemCount(cartItems[0]);

        return { cartItems, updateCartItems, getIncreasedQuantity };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, INITIAL_ITEMS);
              set(selectedIdsAtom, new Set(INITIAL_ITEMS.map((item) => item.id)));
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );

    await waitFor(() => {
      return result.current !== undefined;
    });

    const newQuantity = result.current.getIncreasedQuantity();

    await waitFor(() => {
      result.current.updateCartItems(newQuantity);
    });

    expect(newQuantity).toBe(QUANTITY + 1);
    expect(result.current.cartItems[0].quantity).toBe(newQuantity);
  });

  describe('최저 수량, 최대 수량 테스트', () => {
    it('수량이 1일때 - 버튼을 누를 경우, 수량이 변경되지 않는다.', async () => {
      const QUANTITY = INITIAL_ITEMS[1].quantity;

      const { result } = renderHook(
        () => {
          const cartItems = useRecoilValue(cartItemsSelector);

          const { updateCartItems, getDecreasedQuantity } = useUpdateCartItemCount(cartItems[1]);

          return { cartItems, updateCartItems, getDecreasedQuantity };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsSelector, INITIAL_ITEMS);
                set(selectedIdsAtom, new Set(INITIAL_ITEMS.map((item) => item.id)));
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => {
        return result.current !== undefined;
      });

      const newQuantity = result.current.getDecreasedQuantity();

      await waitFor(() => {
        result.current.updateCartItems(newQuantity);
      });

      expect(newQuantity).toBe(QUANTITY);
      expect(result.current.cartItems[1].quantity).toBe(newQuantity);
    });

    it('수량이 100개 일때 + 버튼을 누를 경우, 수량이 변경되지 않는다.', async () => {
      const QUANTITY = QUANTITY_TEST_ITEMS[0].quantity;

      const { result } = renderHook(
        () => {
          const cartItems = useRecoilValue(cartItemsSelector);

          const { updateCartItems, getIncreasedQuantity } = useUpdateCartItemCount(cartItems[0]);

          return { cartItems, updateCartItems, getIncreasedQuantity };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsSelector, QUANTITY_TEST_ITEMS);
                set(selectedIdsAtom, new Set(INITIAL_ITEMS.map((item) => item.id)));
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );

      await waitFor(() => {
        return result.current !== undefined;
      });

      const newQuantity = result.current.getIncreasedQuantity();

      await waitFor(() => {
        result.current.updateCartItems(newQuantity);
      });

      expect(newQuantity).toBe(QUANTITY);
      expect(result.current.cartItems[0].quantity).toBe(newQuantity);
    });
  });
});
