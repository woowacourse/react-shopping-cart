import { useRecoilCallback, useRecoilValue } from 'recoil';
import { cartState } from '../store/CartState';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { removeProductItemFromCartSelector, totalPriceSelector } from '../store/CartSelector';
import { CART_BASE_URL } from '../constants/url';
import useMutation from './useMutation';
import { USER } from '../constants';

export const useCart = () => {
  const cart = useRecoilValue(cartState);
  const initialCheckedItems = cart.map((item) => item.id);
  const [checkedItems, setCheckedItems] = useState<number[]>(initialCheckedItems);
  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const { mutate, error } = useMutation();

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
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmResult) {
      checkedItems.forEach((id) => {
        mutate({
          url: `${CART_BASE_URL}/${id}`,
          method: 'DELETE',
          bodyData: { id },
          headers: {
            Authorization: `Basic ${btoa(USER)}`,
            'Content-Type': 'application/json',
          },
        });
        if (error) return;
        removeProductItemFromCart(id);
      });
      setCheckedItems([]);
    }
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
