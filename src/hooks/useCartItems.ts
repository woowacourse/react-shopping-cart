import { useEffect, useState } from 'react';
import getCartItems from '../api/getCartItems';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getCartItems();
      setCartItems(content);
    };
    fetchData();
  }, []);

  return { cartItems };
};

export default useCartItems;
