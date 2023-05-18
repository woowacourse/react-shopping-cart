import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import myCartState from '@recoil/myCartState';

const useUpdateMyCart = (productId: number, productCount: number) => {
  const setMyCart = useSetRecoilState(myCartState);

  useEffect(() => {
    setMyCart(prev => {
      const newCart = { ...prev };

      if (!productId || (productCount !== 0 && productCount !== 1)) {
        return newCart;
      }

      newCart[productId] = productCount;

      if (productCount === 0) {
        delete newCart[productId];
      }

      return newCart;
    });
  }, [productCount, productId, setMyCart]);
};

export default useUpdateMyCart;
