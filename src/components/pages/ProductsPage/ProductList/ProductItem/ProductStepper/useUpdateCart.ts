import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import cartState from '@recoil/cartState';

const useUpdateCart = (productId: number, productCount: number) => {
  const setCart = useSetRecoilState(cartState);

  useEffect(() => {
    setCart(prev => {
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
  }, [productCount, productId, setCart]);
};

export default useUpdateCart;
