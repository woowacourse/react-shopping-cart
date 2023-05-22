import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartListAtom, checkedItemsAtom } from 'recoil/cartList';
import { Cart } from 'types';

export const useCheckedItems = () => {
  const [checkedItems, setCheckedItems] = useRecoilState(checkedItemsAtom);
  const cartList = useRecoilValue(cartListAtom);

  useEffect(() => {
    setCheckedItems(cartList);
  }, [cartList]);

  const removeAllCheckedItems = () => {
    setCheckedItems([]);
  };

  const checkAllItems = () => {
    setCheckedItems(cartList);
  };

  const checkItem = (cartItem: Cart) => {
    if (checkedItems.includes(cartItem)) {
      setCheckedItems((prev) => prev.filter(({ id }) => id !== cartItem.id));
      return;
    }
    setCheckedItems((prev) => [...prev, cartItem]);
  };

  return {
    checkedItems,
    checkItem,
    removeAllCheckedItems,
    checkAllItems,
  };
};
