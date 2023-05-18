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

  // TODO:
  const updateCartItemQuantityIncrease = (id: number) => {
    setCartList(
      cartList.map((item) => {
        if (item.id !== id) return item;
        return {
          id,
          quantity: item.quantity + 1,
          product: item.product,
          isChecked: true,
        };
      })
    );
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

  // TODO:
  const getCartItemSum = () => {
    return cartList.reduce((acc, item) => {
      if (item.isChecked) return acc + item.quantity * item.product.price;
      return acc;
    }, 0);
  };

  const checkedItemRemove = () => {
    setCartList(
      cartList.filter((item) => {
        return !item.isChecked;
      })
    );
  };

  const selectedItemRemove = (id: number) => {
    setCartList(
      cartList.filter((item) => {
        return item.id !== id;
      })
    );
  };

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

  // TODO:
  const updateCartItemQuantityDecrease = (id: number) => {
    setCartList(
      cartList.map((item) => {
        if (item.id !== id) return item;
        return {
          id,
          quantity: item.quantity - 1,
          product: item.product,
          isChecked: true,
        };
      })
    );
  };

  return {
    cartList,
    addCartItem,
    updateCartItem,
    getNewCartItem,
    updateCartItemQuantityIncrease,
    updateCartItemQuantityDecrease,
    reverseCheckCartItem,
    checkedItemRemove,
    selectedItemRemove,
    getCartItemSum,
    cartListCheckedLength,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
  };
};
