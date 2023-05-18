import { RecoilState, useRecoilState } from 'recoil';
import { Product } from '../../../types/product';
import { Cart } from '../../../types/cart';

const useCart = (cartState: RecoilState<Cart[]>, product: Product) => {
  const [cart, setCart] = useRecoilState(cartState);

  const addCart = () => setCart((prev) => [...prev, { id: Date.now(), quantity: 1, product }]);

  const updateCart = (quantity: number) => {
    const index = cart.findIndex((item) => item.product.id === product.id);

    const newCart = cart.toSpliced(index, 1, {
      ...cart[index],
      quantity,
    });

    setCart(newCart);
  };

  const deleteCart = () => {
    const index = cart.findIndex((item) => item.product.id === product.id);

    const newCart = cart.toSpliced(index, 1);

    setCart(newCart);
  };

  return { cart, addCart, updateCart, deleteCart };
};

export default useCart;
