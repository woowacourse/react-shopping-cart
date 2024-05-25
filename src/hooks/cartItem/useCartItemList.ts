import { useRecoilState } from 'recoil';

import { cartItemListState } from '../../recoil/cartItem/atom';
import {
  requestCartItemList,
  requestDeleteCartItem,
} from '../../apis/cartItemList';
import { useSelectedCartItemId } from './useSelectedCartItemId';

const useCartItemList = () => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);
  const { unselectCartItem } = useSelectedCartItemId();

  const deleteCartItem = async (cartItemId: number) => {
    await requestDeleteCartItem(cartItemId);

    setCartItemList(cartItemList.filter((item) => item.id !== cartItemId));
    unselectCartItem(cartItemId);
  };

  const fetchCartItemList = async () => {
    const result = await requestCartItemList();
    setCartItemList(result);
  };

  return {
    cartItemList,
    setCartItemList,
    deleteCartItem,
    fetchCartItemList,
  };
};

export default useCartItemList;
