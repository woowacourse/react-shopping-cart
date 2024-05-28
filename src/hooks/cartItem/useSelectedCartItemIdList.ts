import { useRecoilState, useRecoilValue } from 'recoil';

import {
  cartItemListState,
  selectedCartItemIdListState,
} from '../../recoil/cartItem/atom';

export const useSelectedCartItemIdList = () => {
  const [selectedIdList, setSelectedIdList] = useRecoilState(
    selectedCartItemIdListState,
  );
  const cartItemList = useRecoilValue(cartItemListState);

  const selectAll = () => {
    const totalIdList = cartItemList.map(({ id }) => id);

    setSelectedIdList(totalIdList);
  };

  const unselectAll = () => {
    setSelectedIdList([]);
  };

  const isSelectedAll =
    selectedIdList.length !== 0 &&
    selectedIdList.length === cartItemList.length;

  return {
    selectedIdList,
    isSelectedAll,
    selectAll,
    unselectAll,
  };
};
