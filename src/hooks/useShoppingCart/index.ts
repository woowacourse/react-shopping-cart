import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { ShoppingCartProduct, UpdateShoppingCart } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import localStorageHelper from '@Utils/localStorageHelper';

import shoppingCartState from '@Atoms/shoppingCartState';

import { FETCH_URL } from '@Constants/index';

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<ShoppingCartProduct[]>(shoppingCartState);
  const { data, status } = useFetch<ShoppingCartProduct[]>(FETCH_URL.cartItems);

  const isEmpty = !shoppingCart.length;

  const updateShoppingCart: UpdateShoppingCart = async (url, method, body) => {
    await fetch(url, {
      method,
      body,
    });

    setShoppingCart(localStorageHelper.getValue('cartItems'));
  };

  useEffect(() => {
    if (data) setShoppingCart(data);
  }, [data]);

  return { shoppingCart, status, isEmpty, setShoppingCart, updateShoppingCart };
};

export default useShoppingCart;
