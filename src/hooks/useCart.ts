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
          items: [cartItem],
        });

        return;
      }

      // -1 은 없는 경우
      const existingItemIndex = cartList.items.findIndex((item) => item.id === cartItem.id);

      if (existingItemIndex !== -1) {
        // 기존 아이템 업데이트
        setCartList({
          ...cartList,
          items: cartList.items.map((item, index) => (index === existingItemIndex ? cartItem : item)),
        });

        return;
      }

      // 새로운 아이템 추가
      setCartList({
        ...cartList,
        items: [...cartList.items, cartItem],
      });
    },
    [cartList, setCartList]
  );

  return { cartList, setCartList, updateCart };
};

export default useCart;
