import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/cart';
import { CartItem } from '../../types/cart';
import { Product } from '../../types/products';

const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const hasItemInCart = (id: CartItem['id']) => {
    return cart.find((item) => item.id === id);
  };

  const addInCart = (product: Product, quantity: number) => {
    const { id } = product;

    if (hasItemInCart(id)) {
      setCart((cart) =>
        cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      return;
    }

    setCart((cart) => [...cart, { id, quantity, product }]);
  };

  const adjustQuantityInCart = (
    id: CartItem['id'],
    quantity: CartItem['quantity']
  ) => {
    setCart((cart) =>
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const deleteInCart = (id: CartItem['id']) => {
    setCart((cart) => cart.filter((item) => item.id !== id));
  };

  return { cart, addInCart, adjustQuantityInCart, deleteInCart };
};

export default useCart;
