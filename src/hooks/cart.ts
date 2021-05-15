import { useEffect, useState } from 'react';
import { requestGetCartItems } from '../apis/cart';
import { parseCartItemData } from '../utils/parseData';

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseOK, setResponseOK] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await requestGetCartItems();
        const cartItems = response.data.map(parseCartItemData);
        setCartItems(cartItems);
      } catch (error) {
        setResponseOK(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [setCartItems]);

  return { cartItems, loading, responseOK, setCartItems };
};

export default useCart;
