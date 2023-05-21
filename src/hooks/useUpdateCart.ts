import { useSetCartState } from '../recoils/recoilCart';

import { QUANTITY } from '../constants';
import { CartItem } from '../types';

export const useUpdateCart = () => {
  const setCart = useSetCartState();

  const addProductToCart = (product: CartItem) => {
    setCart((prev) => {
      return [product, ...prev];
    });
  };

  const increaseProductQuantity = (productId: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseProductQuantity = (productId: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    const count = quantity > QUANTITY.MAX ? QUANTITY.MAX : quantity;

    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: count };
        }
        return item;
      });
    });
  };

  const deleteCartItem = (...productId: number[]) => {
    setCart((prev) => {
      return prev.filter((item) => !productId.includes(item.id));
    });
  };

  return {
    addProductToCart,
    deleteCartItem,
    increaseProductQuantity,
    decreaseProductQuantity,
    updateProductQuantity,
  };
};
