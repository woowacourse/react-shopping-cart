import { useRecoilState } from 'recoil';
import { cartState } from '../atoms';
import type { Product } from '../types/product';
import { uuid } from '../utils/uuid';

const useCartService = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addProductToCart = (product: Product) => {
    setCart((prevCart) => {
      return [
        ...prevCart,
        {
          id: uuid(),
          quantity: 1,
          product,
        },
      ];
    });
  };

  const updateProductQuantity = (targetId: number, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((cartProduct) => {
        if (cartProduct.product.id !== targetId) return cartProduct;

        return {
          ...cartProduct,
          quantity,
        };
      });
    });
  };

  const removeProductFromCart = (targetId: number) => {
    setCart((prevCart) =>
      prevCart.filter((cartProduct) => cartProduct.product.id !== targetId),
    );
  };

  return {
    cart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
  } as const;
};
export default useCartService;
