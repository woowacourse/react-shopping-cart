import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { cartRequestAction } from '../atoms/cartState';
import useCount from './useCount';

export function useAddCart() {
  const [isSelected, setIsSelected] = useState(false);
  const setCartRequestActions = useSetRecoilState(
    cartRequestAction({ action: 'GET' })
  );
  const { count, setCount } = useCount();

  const selectProductItem = () => {
    setIsSelected(true);
  };

  const addCartProductItem = async (productId: number) => {
    setIsSelected(false);

    setCartRequestActions({
      action: 'POST',
      payload: { productId: productId, quantity: count.value },
    });
  };

  return { isSelected, selectProductItem, addCartProductItem, count, setCount };
}
