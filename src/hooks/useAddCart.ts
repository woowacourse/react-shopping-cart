import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { cartState } from '../atoms/cartState';
import { CartType } from '../type/cart';
import useCount from './useCount';
import {
  cartQuery,
  patchCartItemQuantityQuery,
  postCartItemQuery,
} from '../api/api';

export function useAddCart() {
  const [isSelected, setIsSelected] = useState(false);
  const [cart, setCart] = useRecoilState<CartType[]>(cartState);
  const { count, setCount } = useCount();

  const selectProductItem = () => {
    setIsSelected(true);
  };

  const addCartProductItem = async (productId: number) => {
    setIsSelected(false);

    const cartItem = cart.find((cartItem) => cartItem.product.id === productId);
    let cartId = cartItem ? cartItem.id : await postCartItemQuery(productId);
    await patchCartItemQuantityQuery(cartId, count.value);
    const newCart = await cartQuery();
    setCart(newCart);
  };

  return { isSelected, selectProductItem, addCartProductItem, count, setCount };
}
