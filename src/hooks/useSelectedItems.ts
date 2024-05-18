import { selectedCartItems } from '../recoil/atoms';
import { CartItem } from '../api/get/getItems';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const useSelectedItems = (data: CartItem[]) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);
  const [allSelectedItems, setAllSelectedItems] = useState(false);

  useEffect(() => {
    setAllSelectedItems(data.length === selectedItems.length);
  }, [data, selectedItems]);

  const onSelectAllClick = () => {
    if (!allSelectedItems) {
      setSelectedItems(
        data.map(item => ({
          cartItemId: item.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      );
      setAllSelectedItems(true);
    } else {
      setSelectedItems([]);
      setAllSelectedItems(false);
    }
  };

  return {
    selectedItems,
    onSelectAllClick,
    allSelectedItems,
  };
};

export default useSelectedItems;
