import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { cartItemsState } from '@recoil/atom';

const useUpdateCart = (productId: number, quantity: number) => {
  const setCartItems = useSetRecoilState(cartItemsState);

  useEffect(() => {
    setCartItems(prev => {
      if (!productId) {
        return prev;
      }

      const newCartItems = { ...prev };
      const cartItemsLength = Object.keys(prev).length;
      const key = `product${productId}`;
      const newCartItem = {
        cartItemId: cartItemsLength + 1,
        productId: productId,
        quantity: quantity,
      };
      newCartItems[key] = newCartItem;

      if (quantity === 0) delete newCartItems[key];

      return newCartItems;
    });
  }, [quantity, productId, setCartItems]);
};

export default useUpdateCart;
