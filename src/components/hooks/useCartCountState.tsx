import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { AddToCartCountProps } from '../../types/addToCartCountType';
import { CartProductList } from '../../types/productType';
import { cartState } from '../../atoms/CartState';

export const useCartCountState = ({
  id,
  onDeleteCart,
}: AddToCartCountProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [cartProductList, setCartProductList] = useRecoilState(cartState);

  const increaseCount = () => {
    setQuantity(quantity + 1);

    const updatedCartList = cartProductList.map((item: CartProductList) => {
      if (item.id === id)
        return {
          ...item,
          quantity: item.quantity + 1,
        };

      return item;
    });
    setCartProductList(updatedCartList);
  };

  const decreaseCount = () => {
    const updatedCartList = cartProductList.map((item: CartProductList) => {
      if (item.id === id)
        return {
          ...item,
          quantity: item.quantity - 1,
        };

      return item;
    });
    setCartProductList(updatedCartList);

    if (quantity === 1) {
      onDeleteCart();
    }

    setQuantity(quantity - 1);
  };

  return { increaseCount, decreaseCount, quantity };
};
