import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms';
import { CART_BASE_URL } from '../constants';
import type { CartItem, Product } from '../types/product';

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

  const updateProductQuantity = (
    targetId: Product['id'],
    quantity: CartItem['quantity'],
  ) => {
    fetch(`${CART_BASE_URL}/${targetId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quantity),
    }).then(() => {
      fetch(CART_BASE_URL)
        .then((res) => res.json())
        .then((data) => setCart(data));
    });
  };

  const removeProductFromCart = (targetId: Product['id']) => {
    fetch(`${CART_BASE_URL}/${targetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      fetch(CART_BASE_URL)
        .then((res) => res.json())
        .then((data) => setCart(data));
    });
  };

  return {
    cart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
  } as const;
};

export default useCartService;
