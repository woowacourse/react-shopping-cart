import { useRecoilState } from 'recoil';

import { selectedCartItemIdListState } from '../../recoil/cartItem/atom';

export const useSelectedCartItemId = () => {
  const [selectedIdList, setSelectedIdList] = useRecoilState(
    selectedCartItemIdListState,
  );
  const selectCartItem = async (cartItemId: number) => {
    setSelectedIdList((prev) => [...prev, cartItemId]);
  };

  const unselectCartItem = async (cartItemId: number) => {
    setSelectedIdList((prev) => [...prev].filter((id) => id !== cartItemId));
  };

  const isSelectedId = (cartItemId: number) => {
    return selectedIdList.some((id) => id === cartItemId);
  };

  return {
    isSelectedId,
    selectCartItem,
    unselectCartItem,
  };
};
