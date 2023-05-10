import { useRecoilState } from 'recoil';
import cartState from '../recoil/atoms/cartState';
import type { Product } from '../type';

const useCartProduct = (productId: Product['id']) => {
  const [cart, setCart] = useRecoilState(cartState);

  const cartProduct = cart.find((it) => it.productId === productId) ?? null;

  const setQuantity = (quantity: number) => {
    if (cartProduct === null) {
      setCart([...cart, { id: Math.round(Math.random() * 100000), quantity, productId }]);
      return;
    }

    const cartProductIndex = cart.findIndex((it) => it.id === cartProduct.id);
    const newCart = [
      ...cart.slice(0, cartProductIndex),
      {
        ...cartProduct,
        quantity,
      },
      ...cart.slice(cartProductIndex + 1),
    ].filter((it) => it.quantity > 0);
    setCart(newCart);
  };

  return { cartProduct, setQuantity };
};

export default useCartProduct;
