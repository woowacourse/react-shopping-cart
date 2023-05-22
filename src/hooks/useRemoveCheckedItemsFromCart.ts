import { useSetRecoilState } from 'recoil';
import { CART_URL } from '../constants/url';
import { cartState } from '../recoil';
import { CartItem } from '../types';
import { useFetchData } from './useFetchData';

export const useRemoveCheckedItemsFromCart = (checkedItemIdList: number[]) => {
  const setCart = useSetRecoilState(cartState);

  const { api } = useFetchData();

  const removeAllCheckedItemsFromCart = (prev: CartItem[]) => {
    const cart = [...prev];
    const updatedCart = cart.filter((item) => !checkedItemIdList.includes(item.id));

    return updatedCart;
  };

  const removeCheckedItemsFromCart = () => {
    checkedItemIdList.forEach((id) => api.delete(`${CART_URL}/${id}`, { id }));
    setCart((prev: CartItem[]) => removeAllCheckedItemsFromCart(prev));
  };

  return removeCheckedItemsFromCart;
};
