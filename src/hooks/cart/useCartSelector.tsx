import { ChangeEvent, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, selectedItemsState } from '../../atoms/cart';
import { CartItem } from '../../types/cart';

const useCartSelector = () => {
  const cart = useRecoilValue(cartState);
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

  const handleSelectDeselectAll = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    checked
      ? setSelectedItems(new Set(cart.map(({ id }) => id)))
      : setSelectedItems(new Set());
  };
  return { selectedItems, selectItem, handleSelectDeselectAll };
};

export default useCartSelector;
