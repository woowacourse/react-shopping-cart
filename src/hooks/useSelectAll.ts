import { useRecoilCallback, useRecoilValue } from "recoil";

import { cartItems } from "@/recoil/cartItems";
import { isAllItemSelectedSelector } from "@/recoil/orderInformation";
import { selectedCartItems } from "@/recoil/selectedCardItems";

const useSelectAll = () => {
  const cartItemState = useRecoilValue(cartItems);
  const isAllItemSelected = useRecoilValue(isAllItemSelectedSelector);

  const selectAllItem = useRecoilCallback(({ set }) => () => {
    cartItemState.forEach((cartItem) => {
      set(selectedCartItems(cartItem.id), true);
    });
  });

  const unselectAllItem = useRecoilCallback(({ set }) => () => {
    cartItemState.forEach((cartItem) => {
      set(selectedCartItems(cartItem.id), false);
    });
  });

  return {
    selectAllItem,
    unselectAllItem,
    isAllItemSelected,
  };
};

export default useSelectAll;
