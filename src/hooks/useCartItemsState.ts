import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { fetchCartItems } from '../apis';
import { cartItemsState } from '../recoil/atoms';

export default function useCartItemsState() {
  const setCartItems = useSetRecoilState(cartItemsState);

  useEffect(() => {
    const fetchData = async () => {
      const cartItems = await fetchCartItems();
      setCartItems(cartItems);
    };

    fetchData();
  }, [setCartItems]);
}
