import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemSelectedIdListAtom } from './cartItemAtom';
import { cartItemListState } from '../cartItemList/cartItemListSelector';

export const useCartItemSelectedIdList = () => {
  const [selectedIdList, setSelectedIdList] = useRecoilState(cartItemSelectedIdListAtom);
  const cartItemList = useRecoilValue(cartItemListState);

  const addSelectedId = async (cartItemId: number) => {
    setSelectedIdList((prev) => [...prev, cartItemId]);
  };

  const removeSelectedId = async (cartItemId: number) => {
    setSelectedIdList((prev) => [...prev].filter((id) => id !== cartItemId));
  };

  const selectAll = () => {
    const totalIdList = cartItemList.map(({ id }) => id);

    setSelectedIdList(totalIdList);
  };

  const unselectAll = () => {
    setSelectedIdList([]);
  };

  const isSelected = (cartItemId: number) => {
    return selectedIdList.some((id) => id === cartItemId);
  };

  const isSelectedAll = selectedIdList.length === cartItemList.length;

  return {
    isSelected,
    isSelectedAll,
    selectedIdList,
    addSelectedId,
    removeSelectedId,
    selectAll,
    unselectAll,
  };
};
