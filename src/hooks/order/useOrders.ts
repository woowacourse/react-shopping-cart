import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemListQuery } from '../../recoil/cartItem/selector';
import {
  cartItemListState,
  selectedCartItemIdListState,
} from '../../recoil/cartItem/atom';

const useOrder = () => {
  const setCartItemList = useSetRecoilState(cartItemListState);
  const newCartItemList = useRecoilValue(cartItemListQuery);
  const setSelectedCartItemIdList = useSetRecoilState(
    selectedCartItemIdListState,
  );
  const resetCartItemList = () => {
    setCartItemList(newCartItemList);
    setSelectedCartItemIdList([]);
  };

  return { resetCartItemList };
};

export default useOrder;
