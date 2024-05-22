import { useCartItemQuantity } from '@hooks/shoppingCart';
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
        const { quantity, updateCartItemQuantity } = useCartItemQuantity(cartItems[0].id);

        return { cartItems, updateCartItemQuantity, quantity };
      },
      INITIAL_ITEMS,
      new Set(INITIAL_ITEMS.map((item) => item.id)),
    );

    act(() => {
      result.current.updateCartItemQuantity(result.current.quantity - 1);
    });

    // then
    expect(result.current.quantity).toBe(QUANTITY - 1);
  });

  it('+ 버튼을 누를 경우, 수량이 1 증가한다.', () => {
    // given
    const QUANTITY = INITIAL_ITEMS[0].quantity;

    // when
    const { result } = executeCartItemRenderHook(
      () => {
        const cartItems = useRecoilValue(cartItemsAtom);
        const { quantity, updateCartItemQuantity } = useCartItemQuantity(cartItems[0].id);

        return { cartItems, updateCartItemQuantity, quantity };
      },
      INITIAL_ITEMS,
      new Set(INITIAL_ITEMS.map((item) => item.id)),
    );

    act(() => {
      result.current.updateCartItemQuantity(result.current.quantity + 1);
    });

    // then
    expect(result.current.quantity).toBe(QUANTITY + 1);
  });

  describe('최저 수량, 최대 수량 테스트', () => {
    it('수량이 1일때 - 버튼을 누를 경우, 수량이 변경되지 않는다.', () => {
      // given
      const QUANTITY = INITIAL_ITEMS[1].quantity;

      // when
      const { result } = executeCartItemRenderHook(
        () => {
          const cartItems = useRecoilValue(cartItemsAtom);

          const { quantity, updateCartItemQuantity, getDecreasedQuantity } = useCartItemQuantity(cartItems[1].id);

          return { quantity, cartItems, updateCartItemQuantity, getDecreasedQuantity };
        },
        INITIAL_ITEMS,
        new Set(INITIAL_ITEMS.map((item) => item.id)),
      );

      const newQuantity = result.current.getDecreasedQuantity();

      console.log(newQuantity, result.current.quantity);

      act(() => {
        result.current.updateCartItemQuantity(newQuantity);
      });

      // then
      expect(newQuantity).toBe(QUANTITY);
      expect(result.current.quantity).toBe(newQuantity);
    });

    it('수량이 100개 일때 + 버튼을 누를 경우, 수량이 변경되지 않는다.', () => {
      // given
      const QUANTITY = QUANTITY_TEST_ITEMS[0].quantity;

      // when
      const { result } = executeCartItemRenderHook(
        () => {
          const cartItems = useRecoilValue(cartItemsAtom);

          const { updateCartItemQuantity, getIncreasedQuantity } = useCartItemQuantity(cartItems[0].id);

          return { cartItems, updateCartItemQuantity, getIncreasedQuantity };
        },
        QUANTITY_TEST_ITEMS,
        new Set(QUANTITY_TEST_ITEMS.map((item) => item.id)),
      );

      const newQuantity = result.current.getIncreasedQuantity();

      act(() => {
        result.current.updateCartItemQuantity(newQuantity);
      });

      // then
      expect(newQuantity).toBe(QUANTITY);
      expect(result.current.cartItems[0].quantity).toBe(newQuantity);
    });
  });
});
