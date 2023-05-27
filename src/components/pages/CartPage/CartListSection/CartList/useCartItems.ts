import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import fetchApis from '@apis/fetchApis';
import { CartItem } from '@customTypes/Product';
import { cartItemsState } from '@recoil/atom';

export const useCartItems = () => {
  const cartItemsAtom = useRecoilValue(cartItemsState);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isGetCartItemsError, setIsGetCartItemsError] = useState(false);

  useEffect(() => {
    const { getData } = fetchApis();

    const getCartItems = async () => {
      try {
        const data = await getData<CartItem[]>('/cart-items');
        setCartItems(data);
      } catch (error) {
        setIsGetCartItemsError(true);
      }
    };

    getCartItems();
  }, [cartItemsAtom]);

  return { cartItems, isGetCartItemsError };
};
