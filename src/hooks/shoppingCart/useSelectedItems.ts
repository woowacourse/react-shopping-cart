import { selectedItemsSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const useSelectedCartItems = () => {
  const selectedItems = useRecoilValue(selectedItemsSelector);

  const selectedTotalQuantity = selectedItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalSelectedItemLength = selectedItems.length;

  return { selectedItems, selectedTotalQuantity, totalSelectedItemLength };
};

export default useSelectedCartItems;
