import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import cartState, { productCountSelector } from '../recoil/cartState';
import usePreviousValue from './usePreviousValue';
import { Product } from '../types/Product';

const useCartStateUpdateEffect = (productId: number, value: number, product?: Product) => {
  const prevValue = usePreviousValue(value);
  const setCartState = useSetRecoilState(cartState);
  const updateProductQuantity = useSetRecoilState(productCountSelector(productId));

  useEffect(() => {
    if (prevValue === 0 && value > 0) {
      if (!product) throw new Error(`'product' parameter must be given to add item to cartState!`);

      setCartState((prevCart) => [...prevCart, { product, id: productId, quantity: value }]);
      return;
    }

    updateProductQuantity(value);
  }, [productId, value]);
};

export default useCartStateUpdateEffect;
