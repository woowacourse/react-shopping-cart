import { useCartItemsContext } from '../contexts/CartItemsContext';
import { useCheckedCartItemsContext } from '../contexts/CheckedCartItemContext';

const useToggleAllChecked = () => {
  const { cartItems } = useCartItemsContext();
  const { checkedCartIds, init } = useCheckedCartItemsContext();

  const isAllChecked =
    cartItems.length > 0 && checkedCartIds.length === cartItems.length;

  const toggleAllChecked = () => {
    if (isAllChecked) init([]);
    else init(cartItems);
  };

  return { isAllChecked, toggleAllChecked };
};

export default useToggleAllChecked;
