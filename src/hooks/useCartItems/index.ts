import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { CartItemType, UpdateCartItem } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import localStorageHelper from '@Utils/localStorageHelper';

import shoppingCartState from '@Atoms/cartItemsState';

import { FETCH_URL } from '@Constants/index';

const useCartItems = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState<CartItemType[] | null>(shoppingCartState);
  const { data, status } = useFetch<CartItemType[]>(FETCH_URL.cartItems);

  const isEmpty = shoppingCart ? !shoppingCart.length : 0;

  const updateCartItem: UpdateCartItem = async (url, method, body) => {
    await fetch(url, {
      method,
      body,
    });

    setShoppingCart(localStorageHelper.getValue('cartItems'));
  };

  useEffect(() => {
    if (data) setShoppingCart(data);
  }, [data]);

  return { shoppingCart, status, isEmpty, setShoppingCart, updateCartItem };
};

export default useCartItems;
