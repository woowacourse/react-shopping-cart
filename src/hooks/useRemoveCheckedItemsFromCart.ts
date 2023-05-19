import { useSetRecoilState } from 'recoil';
import { cartState } from '../recoil';
import { CartItem } from '../types';

export const useRemoveCheckedItemsFromCart = (checkedItemIdList: number[]) => {
  const setCart = useSetRecoilState(cartState);

  const removeAllCheckedItemsFromCart = (prev: CartItem[]) => {
    const cart = [...prev];
    const updatedCart = cart.filter((item) => !checkedItemIdList.includes(item.id));

    return updatedCart;
  };

  const removeCheckedItemsFromCart = () => {
    setCart((prev: CartItem[]) => removeAllCheckedItemsFromCart(prev));
  };

  return removeCheckedItemsFromCart;
};
