import { useRecoilState, useRecoilValue } from "recoil";

import { cartItems } from "@/recoil/cartItems";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";

const useSelectAll = () => {
  const [selectedItemsId, setSelectedItemsId] = useRecoilState(
    selectedCartItemsIdState
  );
  const cartItemState = useRecoilValue(cartItems);

  const isAllItemSelected = cartItemState.length === selectedItemsId.length;

  const selectAllItem = () => {
    const allItemsId = cartItemState.map((item) => item.id);
    setSelectedItemsId(allItemsId);
  };

  const unselectAllItem = () => {
    setSelectedItemsId([]);
  };

  return {
    selectAllItem,
    unselectAllItem,
    isAllItemSelected,
  };
};

export default useSelectAll;
