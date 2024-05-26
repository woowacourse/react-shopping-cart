import { useRecoilState } from 'recoil';

import useApiErrorState from '../error/useApiErrorState';
import { cartItemListState } from '../../recoil/cartItem/atom';
import { useSelectedCartItemId } from './useSelectedCartItemId';
import { useSelectedCartItemIdList } from './useSelectedCartItemIdList';
import {
  requestCartItemList,
  requestDeleteCartItem,
} from '../../apis/cartItemList';
import {
  FailedDeleteCartItemError,
  FailedFetchCartItemListError,
} from '../../error/customError';

const useCartItemList = () => {
  const { setApiError } = useApiErrorState();
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);
  const { unselectCartItem } = useSelectedCartItemId();
  const { selectedIdList } = useSelectedCartItemIdList();

  const deleteCartItem = async (cartItemId: number) => {
    try {
      await requestDeleteCartItem(cartItemId);
      setCartItemList(cartItemList.filter((item) => item.id !== cartItemId));
      unselectCartItem(cartItemId);
    } catch (error) {
      setApiError(new FailedDeleteCartItemError());
    }
  };

  const fetchCartItemList = async () => {
    try {
      const result = await requestCartItemList();
      setCartItemList(result);
      selectedIdList.forEach((id) => {
        if (!result.map(({ id }) => id).includes(id)) {
          unselectCartItem(id);
        }
      });
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
