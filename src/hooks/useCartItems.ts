import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/atoms';
import { TCartItem } from '../types/CartItem.type';
import { fetchCartItemList } from '../apis';

const useCartItems = (initialCartItems: TCartItem[] = []) => {
  const [cartItemList, setCartItemList] = useState<TCartItem[]>(initialCartItems);
  const [selectedItemList, setSelectedItemList] = useRecoilState(selectedCartItemListState);

  const updateCartItemList = async () => {
    const newCartItemList = await fetchCartItemList();

    setCartItemList(newCartItemList);

    const newSelectedItemList = newCartItemList.filter((newItem) =>
      selectedItemList.some((item) => newItem.id === item.id),
    );

    setSelectedItemList(newSelectedItemList);
  };

  return { cartItemList, selectedItemList, updateCartItemList };
};

export default useCartItems;
