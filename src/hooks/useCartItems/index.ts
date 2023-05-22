import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { CartItemType, UpdateCartItem } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import localStorageHelper from '@Utils/localStorageHelper';

import cartItemsState from '@Atoms/cartItemsState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/index';

const useCartItems = () => {
  const [cartItems, setCartItems] = useRecoilState<CartItemType[] | null>(cartItemsState);
  const { data, status, errorMessage, fetchData } = useFetch<CartItemType[]>(FETCH_URL.cartItems);

  const isEmpty = cartItems ? !cartItems.length : 0;

  const isSelected = (id: number) => {
    if (!cartItems) return false;
    const cartItem = cartItems.find((cartItem) => cartItem.id === id);
    if (!cartItem) return false;

    return cartItem.isSelected;
  };

  const updateCartItem: UpdateCartItem = async (url, method, body) => {
    await fetchData({ url, method, body });

    const prevCartItems = localStorageHelper.getValue('cartItems') as CartItemType[];
    const newCartItems = prevCartItems.map((cartItem) => {
      return {
        ...cartItem,
        isSelected: isSelected(cartItem.id),
      };
    });

    setCartItems(newCartItems);
  };

  const toggleSelected = (id: number) => {
    if (!cartItems) return;

    const index = cartItems.findIndex((cartItem) => cartItem.id === id);
    const newCartItem = { ...cartItems[index], isSelected: !isSelected(id) };

    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1, newCartItem);

    setCartItems(newCartItems);
  };

  const toggleAllSelected = () => {
    if (!cartItems) return;

    const isAllSelected = cartItems.every((cartItem) => cartItem.isSelected);

    setCartItems(
      cartItems.map((cartItem) => {
        return { ...cartItem, isSelected: !isAllSelected };
      }),
    );
  };

  const deleteSelectedCartItem = (id: number) => {
    if (!cartItems) return;

    updateCartItem(`${FETCH_URL.cartItems}/${id}`, FETCH_METHOD.DELETE);

    setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
  };

  const deleteAllSelectedCartItem = () => {
    if (!cartItems) return;

    cartItems.forEach((cartItem) => {
      if (!cartItem.isSelected) return;
      updateCartItem(`${FETCH_URL.cartItems}/${cartItem.id}`, FETCH_METHOD.DELETE);
    });

    setCartItems(cartItems.filter((cartItem) => !cartItem.isSelected));
  };

  useEffect(() => {
    if (data)
      setCartItems(
        data.map((cartItem) => {
          return {
            ...cartItem,
            isSelected: true,
          };
        }),
      );
  }, [data]);

  return {
    cartItems,
    status,
    isEmpty,
    errorMessage,
    updateCartItem,
    toggleSelected,
    toggleAllSelected,
    deleteSelectedCartItem,
    deleteAllSelectedCartItem,
  };
};

export default useCartItems;
