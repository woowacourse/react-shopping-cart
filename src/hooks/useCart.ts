import { QUANTITY } from '../constants';
import { useCartState } from '../recoils/recoilCart';
import { CartItem } from '../types';

export const useCart = () => {
  const [cart, setCart] = useCartState();

  const addProductToCart = (product: CartItem) => {
    setCart((prev) => {
      return [product, ...prev];
    });
  };

  const findProductInCartById = (productId: number) => {
    const foundProduct = cart.find((item) => item.id === productId);

    return foundProduct || null;
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

  return {
    cart,
    findProductInCartById,
    addProductToCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    updateProductQuantity,
  };
};
