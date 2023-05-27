import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { Product } from '@customTypes/Product';
import { cartItemsState } from '@recoil/atom';

const useUpdateCart = (product: Product, quantity: number) => {
  const setCartItems = useSetRecoilState(cartItemsState);

  useEffect(() => {
    setCartItems(prev => {
      const newCartItems = { ...prev };
      const key = `product${product.id}`;
      const newCartItem = {
        id: product.id,
        quantity: quantity,
        product: product,
        isChecked: false,
      };
      newCartItems[key] = newCartItem;

      if (quantity === 0) delete newCartItems[key];

      return newCartItems;
    });
  }, [quantity, product, setCartItems]);
};

export default useUpdateCart;
