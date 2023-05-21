import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { selectedItemsState } from '../../atoms/cart';
import { CartItem } from '../../types/cart';

const useCartSelector = () => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);

  const selectItem = useCallback((id: CartItem['id']) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = new Set(prevSelectedItems);

      prevSelectedItems.has(id)
        ? updatedSelectedItems.delete(id)
        : updatedSelectedItems.add(id);

      return updatedSelectedItems;
    });
  }, []);
  return { selectedItems, selectItem };
};

export default useCartSelector;
