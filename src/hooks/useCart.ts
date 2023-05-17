import { QUANTITY } from '../constants';
import { useCartState } from '../recoilCart';

export const useCart = () => {
  const [cart, setCart] = useCartState();

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: {
        id: productId,
        quantity: 1,
      },
    }));
  };

  const findProductInCart = (productId: number) => {
    return cart[productId];
  };

  const increaseProductQuantity = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: {
        id: productId,
        quantity: prev[productId].quantity + 1,
      },
    }));
  };

  const decreaseProductQuantity = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: {
        id: productId,
        quantity: prev[productId].quantity - 1,
      },
    }));
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    const count = quantity > QUANTITY.MAX ? QUANTITY.MAX : quantity;

    setCart((prev) => ({
      ...prev,
      [productId]: {
        id: productId,
        quantity: count,
      },
    }));
  };

  return {
    cart,
    findProductInCart,
    addToCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    updateProductQuantity,
  };
};
