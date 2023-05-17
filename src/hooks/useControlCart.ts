import { cartAtom } from '@recoil/atoms/cartAtom';
import { CartInformation, ProductInformation } from '@type/types';
import { CART_LIST_LOCAL_KEY } from '@constants';
import useAtomLocalStorage from './useAtomLocalStorage';

const useControlCart = () => {
  const [cart, setCart] = useAtomLocalStorage<CartInformation[]>(
    cartAtom,
    CART_LIST_LOCAL_KEY
  );

  const updateQuantityOfCartItem = (id: number, quantity: number) => {
    const updateCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity };
      }
      return product;
    });

    setCart(updateCart);
  };

  const addProductToCart = ({
    name,
    id,
    price,
    imageUrl,
  }: ProductInformation) => {
    const product: CartInformation = {
      id,
      product: { name, price, imageUrl, id },
      quantity: 1,
    };

    const updatedCart = [...cart, product];

    setCart(updatedCart);
  };

  const removeProductFromCart = (id: number) => {
    const updatedCart = cart.filter((product) => id !== product.id);

    setCart(updatedCart);
  };

  return { addProductToCart, removeProductFromCart, updateQuantityOfCartItem };
};

export default useControlCart;
