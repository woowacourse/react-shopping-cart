import { useRecoilState } from 'recoil';
import { useLocalStorage } from '../useLocalStorage';
import { cartIdListState } from '../../components/atoms/cartIdListAtom';

export const useCartIdList = () => {
  const [cartIdList, setCartIdList] = useRecoilState(cartIdListState);
  const { addNewCartId, deleteCartId } = useLocalStorage();

  const addProductToCartIdList = (id: number) => {
    if (!cartIdList.includes(id)) {
      setCartIdList((current) => [...current, id]);
      addNewCartId(id);
    }
  };

  const removeProductFromCartIdList = (id: number) => {
    setCartIdList((current) => current.filter((productId) => productId !== id));
    deleteCartId(id);
  };

  return {
    addProductToCartIdList,
    removeProductFromCartIdList,
    cartIdList,
  };
};
