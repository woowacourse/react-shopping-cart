import axios from 'axios';
import { useEffect, useState } from 'react';
import { STATUS_CODE, URL } from '../constants';

const useCart = () => {
  const [cartItems, setCartItems] = useState<Cart>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseOK, setResponseOK] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(URL.CART);
        if (response.status !== STATUS_CODE.GET_SUCCESS) {
          setResponseOK(false);
          throw new Error('장바구니 정보를 불러오지 못했습니다');
        }

        const cartItems = response.data.map((item: CartItem) => ({ ...item, isSelected: true }));
        setCartItems(cartItems);
      } catch (error) {
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
