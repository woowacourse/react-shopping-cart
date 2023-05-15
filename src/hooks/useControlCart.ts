import { useRecoilState } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { CartInformation, ProductInformation } from '@type/types';

export const useControlCart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

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
    setCart([...cart, product]);
  };

  const removeProductFromCart = (id: number) => {
    const updatedCart = cart.filter((product) => id !== product.id);

    setCart(updatedCart);
  };

  return { addProductToCart, removeProductFromCart };
};
