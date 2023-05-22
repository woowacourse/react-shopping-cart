import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import * as api from '../api';
import { cartState } from '../recoil/state';
import { API_ERROR_MESSAGE } from '../constants';

const useQuantityInput = (cartItemId: number) => {
  const [quantityInput, setQuantityInput] = useState('');
  const setCart = useSetRecoilState(cartState);

  const getCart = async () => {
    try {
      const cart = await api.getCart();
      setCart(cart);
    } catch {
      alert(API_ERROR_MESSAGE.getCart);
    }
  };

  const deleteCartItem = async () => {
    try {
      await api.deleteCartItem(cartItemId);
    } catch {
      alert(API_ERROR_MESSAGE.deleteCartItem);
      return;
    }

    getCart();
  };

  const patchCartItemQuantity = async (quantity: number) => {
    try {
      await api.patchCartItemQuantity(cartItemId, quantity);
    } catch {
      alert(API_ERROR_MESSAGE.postCartItem);
    }

    getCart();
  };

  const setQuantityInputProxy = async (quantity: number) => {
    if (quantity === 0) {
      deleteCartItem();
    } else {
      patchCartItemQuantity(quantity);
    }

    setQuantityInput(quantity.toString());
  };

  return [quantityInput, { setQuantityInput, setQuantityInputProxy }] as const;
};

export default useQuantityInput;
