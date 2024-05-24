import { useRecoilValue } from 'recoil';

import {
  cartItemListState,
  selectedCartItemIdListState,
} from './../../recoil/cartItem/atom';

const useSelectedCartItemList = () => {
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListState);
  const cartItemList = useRecoilValue(cartItemListState);
  const selectedCartItemList = cartItemList.filter(({ id }) =>
    selectedCartItemIdList.includes(id),
  );

  return { selectedCartItemList };
};

export default useSelectedCartItemList;
