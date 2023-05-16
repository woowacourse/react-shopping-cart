import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms';
import { CART_BASE_URL } from '../constants';
import type { Product } from '../types/product';

const useCartService = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addProductToCart = (productId: Product['id']) => {
    fetch(CART_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productId),
    }).then(() => {
      fetch(CART_BASE_URL)
        .then((res) => res.json())
        .then((data) => setCart(data));
    });
  };

  const updateProductQuantity = (targetId: number, quantity: number) => {
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

  const removeProductFromCart = (targetId: number) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.product.id !== targetId),
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
