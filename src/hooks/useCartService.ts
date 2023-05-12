import { useRecoilState } from 'recoil';
import cartState from '../globalState/atoms/cartState';
import { uuid } from '../utils/uuid';
import type { Product } from '../types/product';

const useCartService = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const getNewCartItem = (product: Product) => {
    return {
      id: uuid(),
      quantity: 1,
      product,
    };
  };

  const addCartItem = (product: Product) => {
    setCart((prevCart) => {
      const newCartItem = getNewCartItem(product);

      return [...prevCart, newCartItem];
    });
  };

  const updateCartItemQuantity = (targetId: number, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.product.id !== targetId) return cartItem;

        return {
          ...cartItem,
          quantity,
        };
      });
    });
  };

  const removeCartItem = (targetId: number) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.product.id !== targetId),
    );
  };

  return {
    cart,
    addCartItem,
    updateCartItemQuantity,
    removeCartItem,
  } as const;
};
export default useCartService;
