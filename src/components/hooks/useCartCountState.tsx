import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { addedCartState } from '../../atoms/AddedCartState';
import { AddedProductList } from '../../types/productType';
import { AddToCartCountProps } from '../../types/addToCartCountType';

export const useCartCountState = ({
  id,
  onDeleteCart,
}: AddToCartCountProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedCartStates, setAddedCartStates] = useRecoilState(addedCartState);

  const increaseCount = () => {
    setQuantity(quantity + 1);

    const addedCartList = addedCartStates.map((item: AddedProductList) => {
      if (item.id === id)
        return {
          ...item,
          quantity: item.quantity + 1,
        };

      return item;
    });
    setAddedCartStates(addedCartList);
  };

  const decreaseCount = () => {
    const addedCartList = addedCartStates.map((item: AddedProductList) => {
      if (item.id === id)
        return {
          ...item,
          quantity: item.quantity - 1,
        };

      return item;
    });
    setAddedCartStates(addedCartList);

    if (quantity === 1) {
      onDeleteCart();
    }

    setQuantity(quantity - 1);
  };

  return { increaseCount, decreaseCount, quantity };
};
