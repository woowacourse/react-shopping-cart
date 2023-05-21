import { useRecoilState } from 'recoil';
import { cartListAtom } from '../stores/cartListStore.ts';
import { Item } from '../types/CartList.ts';
import { useCallback } from 'react';

const useCart = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);

  const updateCart = useCallback(
    (cartItem: Item) => {
      if (!cartList) {
        // 카트가 없는 경우
        setCartList({
          items: [{ ...cartItem, isSelected: true }],
        });

        return;
      }

      // -1 은 없는 경우
      const existingItemIndex = cartList.items.findIndex((item) => item.id === cartItem.id);

      if (existingItemIndex !== -1) {
        // 기존 아이템 업데이트
        setCartList({
          ...cartList,
          items: cartList.items.map((item, index) => (index === existingItemIndex ? { ...cartItem, isSelected: true } : item)),
        });

        return;
      }

      // 새로운 아이템 추가
      setCartList({
        ...cartList,
        items: [...cartList.items, { ...cartItem, isSelected: true }],
      });
    },
    [cartList, setCartList]
  );

  const removeCartItem = useCallback(
    (itemId: number) => {
      if (!cartList) {
        return;
      }

      const updatedItems = cartList.items.filter((item) => item.id !== itemId);

      setCartList({
        ...cartList,
        items: updatedItems,
      });
    },
    [cartList, setCartList]
  );

  const toggleIsSelected = useCallback(
    (itemId: number) => {
      if (!cartList) {
        return;
      }

      const updatedItems = cartList.items.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return {
          ...item,
          isSelected: !item.isSelected,
        };
      });

      setCartList({
        ...cartList,
        items: updatedItems,
      });
    },
    [cartList, setCartList]
  );

  const selectAllItems = useCallback(() => {
    if (!cartList) {
      return;
    }

    const updatedItems = cartList.items.map((item) => {
      return {
        ...item,
        isSelected: true,
      };
    });

    setCartList({
      ...cartList,
      items: updatedItems,
    });
  }, [cartList, setCartList]);

  return { cartList, setCartList, updateCart, removeCartItem, toggleIsSelected, selectAllItems };
};

export default useCart;
