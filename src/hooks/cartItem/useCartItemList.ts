import { useRecoilState } from 'recoil';

import useApiErrorState from '../error/useApiErrorState';
import { cartItemListState } from '../../recoil/cartItem/atom';
import { useSelectedCartItemId } from './useSelectedCartItemId';
import {
  requestCartItemList,
  requestDeleteCartItem,
} from '../../apis/cartItemList';
import {
  FailedDeleteCartItemError,
  FailedFetchCartItemListError,
} from '../../error/customError';

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
      setApiError(new FailedDeleteCartItemError());
    }
  };

  const fetchCartItemList = async () => {
    try {
      const result = await requestCartItemList();
      setCartItemList(result);

      resetApiError();
    } catch (error) {
      setApiError(new FailedFetchCartItemListError());
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
