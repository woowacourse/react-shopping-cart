import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedCartItems } from '../recoil/atoms';
import { CartItem } from '../types/cartItem';

const useSelectAll = (data: CartItem[], getOneItemQuantity: (id: number) => number | undefined) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);
  const [all, setAll] = useState<boolean>(data.length === selectedItems.length);

  useEffect(() => {
    setAll(data.length === selectedItems.length);
  }, [data, selectedItems]);

  const onSelectAllClick = () => {
    if (!all) {
      setSelectedItems(
        data.map(item => ({
          cartItemId: item.id,
          quantity: getOneItemQuantity(item.id) ?? item.quantity,
          price: item.product.price,
        })),
      );
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
