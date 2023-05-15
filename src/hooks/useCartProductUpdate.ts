import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import useCartProductStorage from './useCartProductStorage';
import { cartProductState } from '../states/cartProductState';

const useCartProductUpdate = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);
  const [storedCartProducts, setStoredCartProducts] = useCartProductStorage();

  useEffect(() => {
    if (cartProducts.length >= 0) {
      setStoredCartProducts(cartProducts);
    }
  }, [cartProducts, setStoredCartProducts]);

  useEffect(() => {
    setCartProducts(storedCartProducts);
  }, []);
};

export default useCartProductUpdate;
