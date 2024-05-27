import { useRecoilState } from 'recoil';

import { deleteItem, updateItemQuantity } from '@apis/cartItem';
import { cartItemsState } from '@globalState/cartItems/atoms';

const useCartItems = (cartId: number) => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const deleteCartItem = async () => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== cartId));
    await deleteItem(cartId);
  };

  const updateCartItemQuantity = async (quantity: number) => {
    const item = cartItems.find(({ id }) => id === cartId);

    if (!item || quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: quantity } : cartItem,
      ),
    );

    try {
      await updateItemQuantity(item.id, quantity);
    } catch {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: item.quantity } : cartItem,
        ),
      );
    }
  };

  return { deleteCartItem, updateCartItemQuantity };
};

export default useCartItems;
