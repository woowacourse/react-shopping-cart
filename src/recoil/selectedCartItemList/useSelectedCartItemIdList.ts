import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCartItemIdListState } from './selectedCartItemIdListState';
import { cartItemListState } from '../cartItemList/cartItemListState';

export const useSelectedCartItemIdList = () => {
  const [selectedCartItemIdList, setSelectedCartItemIdList] = useRecoilState(selectedCartItemIdListState);
  const cartItemList = useRecoilValue(cartItemListState);

  const addSelectedItemId = (cartItemId: number) => {
    setSelectedCartItemIdList([...selectedCartItemIdList, cartItemId]);
  };

  // TODO: prev 사용과 사용하지 않는 방식의 차이
  const deleteSelectedItemId = (cartItemId: number) => {
    setSelectedCartItemIdList((prev) => [...prev].filter((id) => id !== cartItemId));
  };

  const selectAllCartItem = () => {
    setSelectedCartItemIdList([...cartItemList.map(({ cartItemId }) => cartItemId)]);
  };

  const clearSelectedCartItemIdList = () => {
    setSelectedCartItemIdList([]);
  };

  const getIsSelectedCartItem = (cartItemId: number) => {
    return selectedCartItemIdList.some((id) => id === cartItemId);
  };

  return {
    addSelectedItemId,
    deleteSelectedItemId,
    selectAllCartItem,
    clearSelectedCartItemIdList,
    getIsSelectedCartItem,
  };
};
