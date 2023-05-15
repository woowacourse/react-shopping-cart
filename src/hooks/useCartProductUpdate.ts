import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { cartProductState } from '../states/cartProductState';
import {
  storedCartProducts,
  setStoredCartProducts,
} from './../utils/localStorage';

const useCartProductUpdate = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);

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
