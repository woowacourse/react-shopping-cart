import { cartAtom } from '@recoil/atoms/cartAtom';
import { CartInformation, ProductInformation } from '@type/types';
import {
  createCartItem,
  removedItemCart,
  changedQuantityCart,
} from '@utils/cart';
import { CART_LIST_LOCAL_KEY } from '@constants/common';
import useAtomLocalStorage from './useAtomLocalStorage';

const useControlCart = () => {
  const [cart, setCart] = useAtomLocalStorage<CartInformation[]>(
    cartAtom,
    CART_LIST_LOCAL_KEY
  );

  const updateQuantityOfCartItem = (id: number, quantity: number) => {
    const updatedCart = changedQuantityCart({ quantity, id, cart });

    setCart(updatedCart);
  };

  const addProductToCart = ({
    name,
    id,
    price,
    imageUrl,
  }: ProductInformation) => {
    const cartItem = createCartItem({ id, name, price, imageUrl });

    setCart([...cart, cartItem]);
  };

  const removeProductFromCart = (id: number) => {
    const updatedCart = removedItemCart(cart, id);

    setCart(updatedCart);
  };

  return { addProductToCart, removeProductFromCart, updateQuantityOfCartItem };
};

export default useControlCart;
