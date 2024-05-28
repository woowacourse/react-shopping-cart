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
  const totalProducts = selectedCartItemList.length;
  const totalQuantity = selectedCartItemList.reduce((sum, { quantity }) => {
    return sum + quantity;
  }, 0);

  return { selectedCartItemList, totalProducts, totalQuantity };
};

export default useSelectedCartItemList;
