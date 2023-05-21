import { useSetCartState } from '../recoils/recoilCart';

import { QUANTITY } from '../constants';
import { CartItem } from '../types';
import { useMutation } from './useMutation';

export const useUpdateCart = () => {
  const { mutation: addCartMutation, error: addCartError } = useMutation('POST');
  const { mutation: updateQuantityMutation, error: updateQuantityError } = useMutation('PATCH');
  const { mutation: deleteCartMutation, error: deleteCartError } = useMutation('DELETE');

  const setCart = useSetCartState();

  const addProductToCart = (product: CartItem) => {
    addCartMutation('/cart-items', {
      productId: product.id,
    });

    setCart((prev) => [product, ...prev]);
  };

  const increaseProductQuantity = (productId: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          updateQuantityMutation(`/cart-items/${productId}`, {
            quantity: item.quantity + 1,
          });

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
          updateQuantityMutation(`/cart-items/${productId}`, {
            quantity: item.quantity - 1,
          });

          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    const count = quantity > QUANTITY.MAX ? QUANTITY.MAX : quantity;

    updateQuantityMutation(`/cart-items/${productId}`, {
      quantity,
    });

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
    productId.forEach((id) => {
      deleteCartMutation(`/cart-items/${id}`);
    });

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
