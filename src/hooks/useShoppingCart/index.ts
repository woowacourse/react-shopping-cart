import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import shoppingCartState from '@Atoms/shoppingCartState';

import { FETCH_URL } from '@Constants/index';

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);

  const updateShoppingCart: UpdateShoppingCart = async (url, method, body) => {
    await fetch(url, {
      method,
      body,
    });

    setShoppingCart(localStorageHelper.getValue('cartItems'));
  };

  useEffect(() => {
    const setInitValue = async () => {
      const response = await fetch(FETCH_URL.cartItems);
      const savedShoppingCart = (await response.json()) as ShoppingCartProduct[];
      setShoppingCart(savedShoppingCart);
    };

    setInitValue();
  }, []);

  return { shoppingCart, updateShoppingCart };
};

export default useShoppingCart;
