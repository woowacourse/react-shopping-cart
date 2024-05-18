import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const useSelectedCartItems = () => {
  const cartItems = useRecoilValue(cartItemsSelector);
  const selectedIds = useRecoilValue(selectedIdsAtom);

  const selectedItems = cartItems.filter((cartItem) => selectedIds.has(cartItem.id));

  const selectedTotalQuantity = selectedItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalSelectedItemLength = selectedItems.length;

  return { selectedItems, selectedTotalQuantity, totalSelectedItemLength };
};

export default useSelectedCartItems;
