import { useRecoilState } from 'recoil';

import { selectedCartItemListState } from '../recoil/CartItem/atoms/selectedCartItemListState';

import type { CartItem } from '../types/CartItem';

export function useSelectedCartItemList() {
  const [selectedCartItemList, setSelectedCartItemList] = useRecoilState(selectedCartItemListState);

  const isSelected = (newItem: CartItem) => {
    return selectedCartItemList.some((item) => item.id === newItem.id);
  };

  const toggleSelection = (newItem: CartItem) => {
    if (!isSelected(newItem)) {
      setSelectedCartItemList([...selectedCartItemList, newItem]);
    } else {
      setSelectedCartItemList(selectedCartItemList.filter((item) => item.id !== newItem.id));
    }
  };

  return { isSelected, toggleSelection };
}
