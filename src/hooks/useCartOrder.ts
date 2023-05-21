import { useRecoilState } from 'recoil';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { CartItem } from '../type';

const useCartOrder = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const allSelected = cartItems.every((cartItem) => !cartItem.unselectedForOrder);

  const selectForOrder = (cartItemId: CartItem['id']) =>
    setCartItems((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.id === cartItemId ? { ...cartItem, unselectedForOrder: false } : cartItem,
      ),
    );

  const toggleForOrder = (cartItemId: CartItem['id']) => {
    setCartItems((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.id === cartItemId
          ? { ...cartItem, unselectedForOrder: !cartItem.unselectedForOrder }
          : cartItem,
      ),
    );
  };

  const unselectAllForOrder = () => {
    setCartItems((cartItem) =>
      cartItem.map((cartItem) => ({ ...cartItem, unselectedForOrder: true })),
    );
  };

  return {
    allSelected,
    selectForOrder,
    toggleForOrder,
    unselectAllForOrder,
  };
};

export default useCartOrder;
