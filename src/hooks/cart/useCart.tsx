import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/cart';
import { CartItem } from '../../types/cart';
import { Product } from '../../types/products';

const useCart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const hasItemInCart = (id: CartItem['id']) => {
    return cartItems.find((item) => item.id === id);
  };

  const addInCart = (product: Product, quantity: number) => {
    const { id } = product;

    if (hasItemInCart(id)) {
      setCartItems((cart) =>
        cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      return;
    }

    setCartItems((cart) => [...cart, { id, quantity, product }]);
  };

  const adjustQuantityInCart = (
    id: CartItem['id'],
    quantity: CartItem['quantity']
  ) => {
    setCartItems((cart) =>
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const deleteInCart = (id: CartItem['id']) => {
    setCartItems((cart) => cart.filter((item) => item.id !== id));
  };

  return { cart: cartItems, addInCart, adjustQuantityInCart, deleteInCart };
};

export default useCart;
