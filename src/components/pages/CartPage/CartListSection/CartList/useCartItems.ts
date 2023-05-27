import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import fetchApis from '@apis/fetchApis';
import { CartItem } from '@customTypes/Product';
import { cartItemsLengthSelector } from '@recoil/selector';

export const useCartItems = () => {
  const cartItemLength = useRecoilValue(cartItemsLengthSelector);
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
  }, [cartItemLength]);

  return { cartItems, isGetCartItemsError };
};
