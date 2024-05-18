import { useUpdateCartItemCount } from '@hooks/shoppingCart';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { describe, expect, it } from 'vitest';

import { INITIAL_ITEMS, QUANTITY_TEST_ITEMS } from './constants/cartItems';

describe('수량 변경 테스트', () => {
  it('- 버튼을 누를 경우, 변경 가능한 수량이라면 수량이 1 감소한다.', async () => {
    const QUANTITY = INITIAL_ITEMS[0].quantity;
    const EXPECTED_QUANTITY = QUANTITY - 1;

    const { result } = renderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsSelector);
        const hookResult = useUpdateCartItemCount(cartItems[0]);

        return { cartItems, ...hookResult };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, INITIAL_ITEMS);
              set(
                selectedIdsAtom,
                INITIAL_ITEMS.map((item) => item.id),
              );
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

    const newQuantity = result.current.getNewQuantity('minus');
    const validatedQuantity = result.current.validateQuantity(QUANTITY, 'minus');

    await waitFor(() => {
      result.current.updateCartItems(newQuantity);
    });

    //유효성 여부
    expect(validatedQuantity).toBeTruthy();
    expect(!!result.current.errorMessage).toBeFalsy();
    //상태 변경 여부
    expect(newQuantity).toBe(EXPECTED_QUANTITY);
    expect(result.current.cartItems[0].quantity).toBe(EXPECTED_QUANTITY);
  });

  it('+ 버튼을 누를 경우, 변경 가능한 수량이라면 수량이 1 증가한다.', async () => {
    const QUANTITY = INITIAL_ITEMS[0].quantity;
    const EXPECTED_QUANTITY = QUANTITY + 1;

    const { result } = renderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsSelector);
        const hookResult = useUpdateCartItemCount(cartItems[0]);

        return { cartItems, ...hookResult };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsSelector, INITIAL_ITEMS);
              set(
                selectedIdsAtom,
                INITIAL_ITEMS.map((item) => item.id),
              );
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

    const validatedQuantity = result.current.validateQuantity(QUANTITY, 'plus');
    const newQuantity = result.current.getNewQuantity('plus');

    await waitFor(() => {
      result.current.updateCartItems(newQuantity);
    });

    //유효성 여부
    expect(validatedQuantity).toBeTruthy();
    expect(!!result.current.errorMessage).toBeFalsy();
    //상태 변경 여부
    expect(newQuantity).toBe(EXPECTED_QUANTITY);
    expect(result.current.cartItems[0].quantity).toBe(EXPECTED_QUANTITY);
  });

  describe('최저 수량, 최대 수량 테스트', () => {
    it('수량이 1일때 - 버튼을 누를 경우, 수량이 변경되지 않고 오류 메세지를 보여준다.', async () => {
      const QUANTITY = INITIAL_ITEMS[1].quantity;

      const { result } = renderHook(
        () => {
          const cartItems = useRecoilValue(cartItemsSelector);

          const hookResult = useUpdateCartItemCount(cartItems[1]);

          return { cartItems, ...hookResult };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsSelector, INITIAL_ITEMS);
                set(
                  selectedIdsAtom,
                  INITIAL_ITEMS.map((item) => item.id),
                );
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

      await waitFor(() => {
        result.current.onUpdateCartItemCount('minus');
      });

      const validatedQuantity = result.current.validateQuantity(QUANTITY, 'minus');

      expect(validatedQuantity).toBeFalsy();
      expect(result.current.cartItems[1].quantity).toBe(QUANTITY);
      expect(!!result.current.errorMessage).toBeTruthy();
    });

    it('수량이 100개 일때 + 버튼을 누를 경우, 수량이 변경되지 않고 오류 메세지를 보여준다.', async () => {
      const QUANTITY = QUANTITY_TEST_ITEMS[0].quantity;

      const { result } = renderHook(
        () => {
          const cartItems = useRecoilValue(cartItemsSelector);

          const hookResult = useUpdateCartItemCount(cartItems[0]);

          return { cartItems, ...hookResult };
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsSelector, QUANTITY_TEST_ITEMS);
                set(
                  selectedIdsAtom,
                  QUANTITY_TEST_ITEMS.map((item) => item.id),
                );
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

      await waitFor(() => {
        result.current.onUpdateCartItemCount('plus');
      });

      const validatedQuantity = result.current.validateQuantity(QUANTITY, 'plus');

      expect(validatedQuantity).toBeFalsy();
      expect(!!result.current.errorMessage).toBeTruthy();
      expect(result.current.cartItems[0].quantity).toBe(QUANTITY);
    });
  });
});
