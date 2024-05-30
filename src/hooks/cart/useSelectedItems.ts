import { useRecoilState, useRecoilValue } from "recoil";

import { cartItemsState } from "@/recoil/cartItems";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";

const useSelectedItems = () => {
  const [selectedItemsId, setSelectedItemsId] = useRecoilState(
    selectedCartItemsIdState
  );
  const cartItemState = useRecoilValue(cartItemsState);

  const isItemSelected = (id: number) => selectedItemsId.includes(id);

  const isAllItemSelected = cartItemState.length === selectedItemsId.length;

  const onDeleteFromSelectedItems = (targetId: number) => {
    const newItems = selectedItemsId.filter((id) => id !== targetId);
    setSelectedItemsId(newItems);
  };

  const onAddToSelectedItems = (targetId: number) => {
    const newItems = [...selectedItemsId, targetId];
    setSelectedItemsId(newItems);
  };

  const selectAllItem = () => {
    const allItemsId = cartItemState.map((item) => item.id);
    setSelectedItemsId(allItemsId);
  };

  const unselectAllItem = () => {
    setSelectedItemsId([]);
  };

  const resetSelectedItems = () => {
    setSelectedItemsId([]);
  };

  return {
    onDeleteFromSelectedItems,
    onAddToSelectedItems,
    selectAllItem,
    unselectAllItem,
    isItemSelected,
    resetSelectedItems,
    isAllItemSelected,
  };
};

export default useSelectedItems;
