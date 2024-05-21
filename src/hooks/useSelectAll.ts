import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedCartItems } from '../recoil/atoms';
import { CartItem } from '../types/cartItem';

const useSelectAll = (data: CartItem[]) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);
  const [all, setAll] = useState<boolean>(data.length === selectedItems.length);

  useEffect(() => {
    setAll(data.length === selectedItems.length);
  }, [data, selectedItems]);

  const onSelectAllClick = () => {
    if (!all) {
      setSelectedItems(data);
      setAll(true);
    } else {
      setSelectedItems([]);
      setAll(false);
    }
  };

  return {
    all,
    onSelectAllClick,
  };
};

export default useSelectAll;
