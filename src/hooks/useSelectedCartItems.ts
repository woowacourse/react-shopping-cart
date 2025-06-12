import { useCartItemsContext } from '../components/Common/CartItemsProvider/CartItemsProvider';
import { getItem, SELECTED_CART_ITEM_IDS } from '../utils/localStorage';

function useSelectedCartItems() {
  const { cartItems } = useCartItemsContext();

  const selectedCartItemIds = getItem<string[]>(SELECTED_CART_ITEM_IDS, []);

  const selectedCartItems = cartItems.filter((cartItem) =>
    selectedCartItemIds.includes(cartItem.id.toString())
  );

  const selectedCartItemsTotalQuantity = selectedCartItems.reduce(
    (a, b) => a + b.quantity,
    0
  );

  return {
    selectedCartItemIds,
    selectedCartItems,
    selectedCartItemsTotalQuantity,
  };
}

export default useSelectedCartItems;
