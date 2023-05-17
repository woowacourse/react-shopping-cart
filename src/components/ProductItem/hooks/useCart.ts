import { useRecoilState } from 'recoil';
import { deleteItemIndexAt, replaceItemIndexAt } from '../../../utils/array';
import { Product } from '../../../types/product';
import { cartState } from '../../../atoms/cart';

const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addCart = (product: Product) =>
    setCart((prev) => [...prev, { id: Date.now(), quantity: 1, product }]);

  const updateCart = (quantity: number, product: Product) => {
    const index = cart.findIndex((item) => item.product.id === product.id);
    const newCart = replaceItemIndexAt(cart, index, {
      ...cart[index],
      quantity,
    });

    setCart(newCart);
  };

  const deleteCart = (product: Product) => {
    const index = cart.findIndex((item) => item.product.id === product.id);
    const newCart = deleteItemIndexAt(cart, index);

    setCart(newCart);
  };

  return { cart, addCart, updateCart, deleteCart };
};

export default useCart;
