import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import type { CartItem, Product } from '../types/types';
import { cartListState } from '../store/atom';

const useCartList = (product: Product) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const existItemIndex = cartList.findIndex((cartItem) => cartItem.product.id === product.id);

  const [quantity, setQuantity] = useState<number>(
    existItemIndex !== -1 ? cartList[existItemIndex].quantity : 0,
  );

  const updateCartList = () => {
    const newCartItem: CartItem = {
      quantity,
      product,
    };

    if (existItemIndex !== -1) {
      const newCartList = cartList.slice();
      newCartList.splice(existItemIndex, 1, newCartItem);
      setCartList(newCartList);
      return;
    }

    setCartList([...cartList, newCartItem]);
  };

  const deleteCartItem = () => {
    if (existItemIndex !== -1) {
      const newCartList = cartList.slice();
      newCartList.splice(existItemIndex, 1);
      setCartList(newCartList);
    }
  };

  useEffect(() => {
    if (quantity !== 0) {
      updateCartList();
      return;
    }
    deleteCartItem();
  }, [quantity]);

  return { quantity, setQuantity };
};

export default useCartList;
