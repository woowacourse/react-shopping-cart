import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/cart';
import { CartItem } from '../../types/cart';
import { Product } from '../../types/products';
import {
  addCart,
  deleteCartItem,
  fetchCart,
  modifyCart,
} from '../../apis/cart';

const useCart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const updateCart = async () => {
    const newCart = await fetchCart();
    setCartItems(newCart);
  };

  const addInCart = (product: Product, quantity: number) => {
    addCart({ id: product.id, quantity, product });
    updateCart();
  };

  const adjustQuantityInCart = (
    id: CartItem['id'],
    quantity: CartItem['quantity']
  ) => {
    modifyCart(id, { quantity });
    updateCart();
  };

  const deleteInCart = (id: CartItem['id']) => {
    deleteCartItem(id);
    updateCart();
  };

  return { cartItems, addInCart, adjustQuantityInCart, deleteInCart };
};

export default useCart;
