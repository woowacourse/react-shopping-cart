import { useState } from 'react';
import { requestGetCartItems } from '../apis/cart';
import { CartItem } from '../type';
import { parseCartItemData } from '../utils/parseData';

import useRequest from './request';

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { loading, responseOK } = useRequest(async () => {
    const response = await requestGetCartItems();
    const cartItems = response.data.map(parseCartItemData);
    setCartItems(cartItems);
  });

  return { cartItems, loading, responseOK, setCartItems };
};

export default useCart;
