import { useRecoilState } from 'recoil';
import cartItemsState from '../recoil/atoms/cartItemsState';
import type { Product } from '../type';

const useCartOrder = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const selectedCount = cartItems.filter((cartItem) => !cartItem.unselectedForOrder).length;

  const allSelected = selectedCount === cartItems.length;

  const selectForOrder = (productId: Product['id']) =>
    setCartItems((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.product.id === productId ? { ...cartItem, unselectedForOrder: false } : cartItem,
      ),
    );

  const toggleForOrder = (productId: Product['id']) => {
    setCartItems((cartItems) =>
      cartItems.map((cartItem) =>
        cartItem.product.id === productId
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
    selectedCount,
    allSelected,
    selectForOrder,
    toggleForOrder,
    unselectAllForOrder,
  };
};

export default useCartOrder;
