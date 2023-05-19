import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { cartProductAtom } from '../recoil/cartProductData';
import {
  storedCartProducts,
  setStoredCartProducts,
} from './../utils/localStorage';

const useCartProductUpdate = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);

  // useEffect(() => {
  //   if (cartProducts.length >= 0) {
  //     setStoredCartProducts(cartProducts);
  //   }
  // }, [cartProducts, setStoredCartProducts]);

  // useEffect(() => {
  //   setCartProducts(storedCartProducts);
  // }, []);
};

export default useCartProductUpdate;
