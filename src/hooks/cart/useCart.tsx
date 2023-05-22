import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/cart';
import { CartItem } from '../../types/cart';
import { Product } from '../../types/products';
import {
  addCartItem,
  deleteCartItem,
  fetchCartItems,
  modifyCartItem,
} from '../../apis/cart';

const useCart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);

  const updateCart = async () => {
    const newCart = await fetchCartItems();
    setCartItems(newCart);
  };

  const addInCart = async (product: Product, quantity: number) => {
    await addCartItem({ id: product.id, quantity, product });
    await updateCart();
  };

  const adjustQuantityInCart = async (
    id: CartItem['id'],
    quantity: CartItem['quantity']
  ) => {
    await modifyCartItem(id, { quantity });
    await updateCart();
  };

  const deleteInCart = async (id: CartItem['id']) => {
    await deleteCartItem(id);
    await updateCart();
  };

  const emptyCart = async () => {
    cartItems.forEach(async (item) => {
      await deleteInCart(item.id);
    });
  };

  return {
    cartItems,
    addInCart,
    adjustQuantityInCart,
    deleteInCart,
    emptyCart,
  };
};

export default useCart;
