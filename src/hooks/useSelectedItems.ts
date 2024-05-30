import useItemQuantity from './useItemQuantity';
import { selectedCartItems } from '../recoil/atoms';
import { CartItem } from '../api/get/getItems';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const useSelectedItems = (data: CartItem[]) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);
  const [allSelectedItems, setAllSelectedItems] = useState(false);

  const { getOneItemQuantity } = useItemQuantity(data);

  useEffect(() => {
    const isEveryItemSelected = data.every(item =>
      selectedItems.some(selected => selected.cartItemId === item.id),
    );

    setAllSelectedItems(isEveryItemSelected);
  }, [data, selectedItems]);

  useEffect(() => {
    if (data.length > 0) {
      const updatedSelectedItems = selectedItems.filter(selected =>
        data.some(item => item.id === selected.cartItemId),
      );

      if (updatedSelectedItems.length !== selectedItems.length) {
        setSelectedItems(updatedSelectedItems);
      }
    }
  }, [data, selectedItems]);

  const onSelectAllClick = () => {
    if (!allSelectedItems) {
      setSelectedItems(
        data.map(item => ({
          cartItemId: item.id,
          quantity: getOneItemQuantity(item.id) ?? item.quantity,
          price: item.product.price,
          name: item.product.name,
          imageUrl: item.product.imageUrl,
        })),
      );
    } else {
      setSelectedItems([]);
    }
  };

  return {
    selectedItems,
    onSelectAllClick,
    allSelectedItems,
  };
};

export default useSelectedItems;
