import { useUpdateCartItemCount } from '@hooks/shoppingCart';
import { cartItemsAtom } from '@recoil/shoppingCart';
import { act } from 'react';
import { useRecoilValue } from 'recoil';

import { INITIAL_ITEMS, QUANTITY_TEST_ITEMS } from './constants/cartItems';
import executeCartItemRenderHook from './utils/executeRenderHook';

describe('수량 변경 테스트', () => {
  it('- 버튼을 누를 경우, 수량이 1 감소한다.', () => {
    // given
    const QUANTITY = INITIAL_ITEMS[0].quantity;

    // when
    const { result } = executeCartItemRenderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsAtom);
        const { updateCartItems, getDecreasedQuantity } = useUpdateCartItemCount(cartItems[0]);

        return { cartItems, updateCartItems, getDecreasedQuantity };
      },
      INITIAL_ITEMS,
      new Set(INITIAL_ITEMS.map((item) => item.id)),
    );

    act(() => {
      const newQuantity = result.current.getDecreasedQuantity();
      result.current.updateCartItems(newQuantity);
    });

    // then
    expect(result.current.cartItems[0].quantity).toBe(QUANTITY - 1);
  });

  it('+ 버튼을 누를 경우, 수량이 1 증가한다.', () => {
    // given
    const QUANTITY = INITIAL_ITEMS[0].quantity;

    // when
    const { result } = executeCartItemRenderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsAtom);
        const { updateCartItems, getIncreasedQuantity } = useUpdateCartItemCount(cartItems[0]);

        return { cartItems, updateCartItems, getIncreasedQuantity };
      },
      INITIAL_ITEMS,
      new Set(INITIAL_ITEMS.map((item) => item.id)),
    );

    const newQuantity = result.current.getIncreasedQuantity();

    act(() => {
      result.current.updateCartItems(newQuantity);
    });

    // then
    expect(newQuantity).toBe(QUANTITY + 1);
    expect(result.current.cartItems[0].quantity).toBe(newQuantity);
  });

  describe('최저 수량, 최대 수량 테스트', () => {
    it('수량이 1일때 - 버튼을 누를 경우, 수량이 변경되지 않는다.', () => {
      // given
      const QUANTITY = INITIAL_ITEMS[1].quantity;

      // when
      const { result } = executeCartItemRenderHook(
        () => {
          const cartItems = useRecoilValue(cartItemsAtom);

          const { updateCartItems, getDecreasedQuantity } = useUpdateCartItemCount(cartItems[1]);

          return { cartItems, updateCartItems, getDecreasedQuantity };
        },
        INITIAL_ITEMS,
        new Set(INITIAL_ITEMS.map((item) => item.id)),
      );

      const newQuantity = result.current.getDecreasedQuantity();

      act(() => {
        result.current.updateCartItems(newQuantity);
      });

      // then
      expect(newQuantity).toBe(QUANTITY);
      expect(result.current.cartItems[1].quantity).toBe(newQuantity);
    });

    it('수량이 100개 일때 + 버튼을 누를 경우, 수량이 변경되지 않는다.', () => {
      // given
      const QUANTITY = QUANTITY_TEST_ITEMS[0].quantity;

      // when
      const { result } = executeCartItemRenderHook(
        () => {
          const cartItems = useRecoilValue(cartItemsAtom);

          const { updateCartItems, getIncreasedQuantity } = useUpdateCartItemCount(cartItems[0]);

          return { cartItems, updateCartItems, getIncreasedQuantity };
        },
        QUANTITY_TEST_ITEMS,
        new Set(QUANTITY_TEST_ITEMS.map((item) => item.id)),
      );

      const newQuantity = result.current.getIncreasedQuantity();

      act(() => {
        result.current.updateCartItems(newQuantity);
      });

      // then
      expect(newQuantity).toBe(QUANTITY);
      expect(result.current.cartItems[0].quantity).toBe(newQuantity);
    });
  });
});
