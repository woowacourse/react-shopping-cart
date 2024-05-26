import { useRecoilState } from 'recoil';

import useApiErrorState from '../error/useApiErrorState';
import { cartItemListState } from '../../recoil/cartItem/atom';
import { useSelectedCartItemId } from './useSelectedCartItemId';
import {
  requestCartItemList,
  requestDeleteCartItem,
} from '../../apis/cartItemList';

const useCartItemList = () => {
  const { setApiError, resetApiError } = useApiErrorState();
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);
  const { unselectCartItem } = useSelectedCartItemId();

  const deleteCartItem = async (cartItemId: number) => {
    try {
      await requestDeleteCartItem(cartItemId);
      setCartItemList(cartItemList.filter((item) => item.id !== cartItemId));
      unselectCartItem(cartItemId);

      resetApiError();
    } catch (error) {
      setApiError(new Error('네트워크 오류로 인해 삭제에 실패했어요.'));
    }
  };

  const fetchCartItemList = async () => {
    try {
      const result = await requestCartItemList();
      setCartItemList(result);
    } catch (error) {
      setApiError(
        new Error('네트워크 오류로 인해 장바구니를 불러올 수 없어요.'),
      );
    }
  };

  return {
    cartItemList,
    setCartItemList,
    deleteCartItem,
    fetchCartItemList,
  };
};

export default useCartItemList;
