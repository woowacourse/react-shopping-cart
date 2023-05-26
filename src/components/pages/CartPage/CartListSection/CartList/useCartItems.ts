import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import fetchApis from '@apis/fetchApis';
import { CartItemApi } from '@customTypes/Product';
import { cartItemsState } from '@recoil/atom';

export const useCartItems = () => {
  const cartItemsAtom = useRecoilValue(cartItemsState);
  const [cartItems, setCartItems] = useState<CartItemApi[]>([]);
  const [isGetCartItemsError, setIsGetCartItemsError] = useState(false);

  useEffect(() => {
    const { getData } = fetchApis();

    const getCartItems = async () => {
      try {
        const data = await getData<CartItemApi[]>('/cart-items');
        setCartItems(data);
      } catch (error) {
        setIsGetCartItemsError(true);
      }
    };

    getCartItems();
  }, [cartItemsAtom]);

  return { cartItems, isGetCartItemsError };
};
