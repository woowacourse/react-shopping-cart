import { atom, useRecoilState } from 'recoil';
import { useLocalStorage } from './useLocalStorage';
import { getCartIdList } from '../utils/localStorage';

export const cartListState = atom<number[]>({
  key: 'cartListState',
  default: getCartIdList(),
});

export const useCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const { addNewCartId, deleteCartId } = useLocalStorage();

  const addProductToCartList = (id: number) => {
    if (!cartList.includes(id)) {
      setCartList((current) => [...current, id]);
      addNewCartId(id);
    }
  };

  const removeProductFromCartList = (id: number) => {
    setCartList((current) => current.filter((productId) => productId !== id));
    deleteCartId(id);
  };

  return {
    addProductToCartList,
    removeProductFromCartList,
    cartList,
  };
};
