import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCartItemIdListAtom } from './states';
import { cartItemListAtom } from '../cartItemList/states';

export const useSelectedCartItemIdList = () => {
  const [selectedCartItemIdList, setSelectedCartItemIdList] = useRecoilState(selectedCartItemIdListAtom);
  const cartItemList = useRecoilValue(cartItemListAtom);

  const addSelectedItemId = (cartItemId: number) => {
    setSelectedCartItemIdList([...selectedCartItemIdList, cartItemId]);
  };

  // TODO: prev 사용과 사용하지 않는 방식의 차이
  const deleteSelectedItemId = (cartItemId: number) => {
    setSelectedCartItemIdList((prev) => [...prev].filter((id) => id !== cartItemId));
  };

  const selectAll = () => {
    setSelectedCartItemIdList([...cartItemList.map(({ cartItemId }) => cartItemId)]);
  };

  const clear = () => {
    setSelectedCartItemIdList([]);
  };

  const getIsSelected = (cartItemId: number) => {
    return selectedCartItemIdList.some((id) => id === cartItemId);
  };

  return {
    addSelectedItemId,
    deleteSelectedItemId,
    selectAll,
    clear,
    getIsSelected,
  };
};
