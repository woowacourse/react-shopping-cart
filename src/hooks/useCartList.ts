import { useRecoilState, useSetRecoilState } from 'recoil';

import { cartAdditionState, cartListState } from '../store/cart';
import { CartItemType, ProductItemType } from '../types';

export const useCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const setCartAddition = useSetRecoilState(cartAdditionState);

  const updateCartList = (newCartItem: CartItemType[]) => {
    setCartList([...cartList, ...newCartItem]);
  };

  const setCartAdditionToTrue = () => {
    setCartAddition(true);
  };

  const getNewCartItem = (itemQuantity: number, productInformation: ProductItemType) => {
    const newCartId = Number(new Date());
    return {
      id: newCartId,
      quantity: itemQuantity,
      product: productInformation,
    };
  };

  return { cartList, updateCartList, setCartAdditionToTrue, getNewCartItem };
};
