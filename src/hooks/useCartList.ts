import { useRecoilState } from 'recoil';

import { cartListState } from '../store/cart';
import { CartItemType, ProductItemType } from '../types';

export const useCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const addCartItem = (newCartItem: CartItemType) => {
    if (newCartItem) setCartList([...cartList, newCartItem]);
  };

  const updateCartItem = (newCartItem: CartItemType[]) => {
    if (newCartItem) setCartList([...newCartItem]);
  };

  const getNewCartItem = (itemQuantity: number, productInformation: ProductItemType) => {
    const newCartId = Number(new Date());
    return {
      id: newCartId,
      quantity: itemQuantity,
      product: productInformation,
    };
  };

  return { cartList, addCartItem, updateCartItem, getNewCartItem };
};
