import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import myCartState from '@recoil/myCartState';

const useMyCart = (productId: number) => {
  const [myCart, setMyCart] = useRecoilState(myCartState);

  const updateCartProductCount = useCallback(
    (productCount: number) => {
      setMyCart(prevCart => {
        const newCart = { ...prevCart };

        newCart[productId] = productCount;

        if (productCount === 0) {
          delete newCart[productId];
        }

        return newCart;
      });
    },
    [productId, setMyCart]
  );

  return { myCart, updateCartProductCount };
};

export default useMyCart;
