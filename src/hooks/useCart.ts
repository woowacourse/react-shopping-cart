import { useRecoilState } from 'recoil';
import { productsInCartState } from '../atom';
import { QUANTITY } from '../constants';

export const useCart = () => {
  const [productsInCart, setProductsInCart] = useRecoilState(productsInCartState);

  const addToCart = (productId: number) => {
    setProductsInCart((prev) => ({
      ...prev,
      [productId]: {
        id: productId,
        quantity: 1,
      },
    }));
  };

  const findProductInCart = (productId: number) => {
    return productsInCart[productId];
  };

  const increaseProductQuantity = (productId: number) => {
    setProductsInCart((prev) => ({
      ...prev,
      [productId]: {
        id: productId,
        quantity: prev[productId].quantity + 1,
      },
    }));
  };

  const decreaseProductQuantity = (productId: number) => {
    setProductsInCart((prev) => ({
      ...prev,
      [productId]: {
        id: productId,
        quantity: prev[productId].quantity - 1,
      },
    }));
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    const count = quantity > QUANTITY.MAX ? QUANTITY.MAX : quantity;

    setProductsInCart((prev) => ({
      ...prev,
      [productId]: {
        id: productId,
        quantity: count,
      },
    }));
  };

  return {
    productsInCart,
    findProductInCart,
    addToCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    updateProductQuantity,
  };
};
