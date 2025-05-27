import { useEffect, useState } from 'react';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items'
      );
      const { content } = await data.json();
      setCartItems(content);
    };
    fetchData();
  }, []);

  return { cartItems };
};

export default useCartItems;
