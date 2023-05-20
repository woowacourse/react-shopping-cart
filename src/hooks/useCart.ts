import { useRecoilCallback, useRecoilValue } from 'recoil';
import { cartState } from '../store/CartState';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { removeProductItemFromCartSelector, totalPriceSelector } from '../store/CartSelector';
import { CART_BASE_URL } from '../constants/url';
import { useFetchData } from './useFetchData';

export const useCart = () => {
  const cart = useRecoilValue(cartState);
  const initialCheckedItems = cart.map((item) => item.id);
  const [checkedItems, setCheckedItems] = useState<number[]>(initialCheckedItems);
  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const { api } = useFetchData();

  const isChecked = (id: number) => {
    return checkedItems.includes(id);
  };

  const totalPrice = useRecoilValue(totalPriceSelector(checkedItems));

  const handleRemoveFromCartList = (id: number) => (e: MouseEvent<HTMLButtonElement>) => {
    removeProductItemFromCart(id);
  };

  const handleCheckedItem = (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
    checkedItems.includes(id)
      ? setCheckedItems((prev) => prev.filter((itemId) => itemId !== id))
      : setCheckedItems((prev) => [...prev, id]);
  };

  const handleCheckAllItems = () => {
    checkedItems.length === cart.length
      ? setCheckedItems([])
      : setCheckedItems(cart.map((item) => item.id));
  };

  const handleRemoveCheckedItem = () => {
    checkedItems.forEach((id) => {
      api.delete(`${CART_BASE_URL}/${id}`, { id });
      removeProductItemFromCart(id);
    });
    setCheckedItems([]);
  };

  return {
    checkedItems,
    isChecked,
    setCheckedItems,
    totalPrice,
    handleRemoveFromCartList,
    handleCheckAllItems,
    handleCheckedItem,
    handleRemoveCheckedItem,
  };
};
