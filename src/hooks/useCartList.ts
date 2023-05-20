import { useRecoilState } from 'recoil';

import { cartListState } from '../store/cart';
import { CartItemType, ProductItemType } from '../types';

export const useCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  // TODO:
  const addCartItem = (newCartItem: CartItemType) => {
    if (newCartItem) setCartList([...cartList, newCartItem]);
  };

  // TODO:
  const updateCartItem = (newCartItem: CartItemType[]) => {
    if (newCartItem) setCartList([...newCartItem]);
  };

  // TODO:
  const getNewCartItem = (itemQuantity: number, productInformation: ProductItemType) => {
    const newCartId = Number(new Date());
    return {
      id: newCartId,
      quantity: itemQuantity,
      product: productInformation,
      isChecked: true,
    };
  };

  const resetCartCheckStatusToTrue = () => {
    setCartList(
      cartList.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          product: item.product,
          isChecked: true,
        };
      })
    );
  };

  const resetCartCheckStatusToFalse = () => {
    setCartList(
      cartList.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          product: item.product,
          isChecked: false,
        };
      })
    );
  };

  const cartListCheckedLength = () => {
    const isAllChecked = cartList.filter((item) => {
      return item.isChecked === true;
    });
    return isAllChecked.length;
  };

  const getCartItemSum = () => {
    return cartList.reduce((acc, item) => {
      if (item.isChecked) return acc + item.quantity * item.product.price;
      return acc;
    }, 0);
  };

  //   // TODO:
  //   const selectedItemRemove = (id: number) => {

  //   };

  const reverseCheckCartItem = (id: number) => {
    setCartList(
      cartList.map((item) => {
        if (item.id !== id) return item;
        return {
          id,
          quantity: item.quantity,
          product: item.product,
          isChecked: !item.isChecked,
        };
      })
    );
  };

  return {
    cartList,
    addCartItem,
    updateCartItem,
    getNewCartItem,
    reverseCheckCartItem,
    getCartItemSum,
    cartListCheckedLength,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
  };
};
