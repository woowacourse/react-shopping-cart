import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { cartItemsState } from '@recoil/atom';

const useUpdateCart = (productId: number, productCount: number) => {
  const setCartItems = useSetRecoilState(cartItemsState);

  useEffect(() => {
    setCartItems(prev => {
      const newCartItems = { ...prev };

      if (!productId || (productCount !== 0 && productCount !== 1)) {
        return newCartItems;
      }

      const newCartItemsLength = Object.keys(newCartItems).length;
      const key = `product${productId}`;
      const newCartItem = {
        cartItemId: newCartItemsLength + 1,
        productId: productId,
        quantity: productCount,
      };
      newCartItems[key] = newCartItem;

      if (productCount === 0) delete newCartItems[key];

      return newCartItems;
    });
  }, [productCount, productId, setCartItems]);
};

export default useUpdateCart;
