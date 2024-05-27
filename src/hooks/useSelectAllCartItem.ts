import { useRecoilCallback, useRecoilValue } from "recoil";

import { cartItems } from "@/recoil/cartItems";
import { isAllItemSelectedSelector } from "@/recoil/selectedCardItems";
import { selectedCartItemIds } from "@/recoil/selectedCardItems";

const useSelectAllCartItem = () => {
  const cartItemState = useRecoilValue(cartItems);
  const isAllItemSelected = useRecoilValue(isAllItemSelectedSelector);

  const selectAllItem = useRecoilCallback(({ set }) => () => {
    cartItemState.forEach((cartItem) => {
      set(selectedCartItemIds(cartItem.id), true);
    });
  });

  const unselectAllItem = useRecoilCallback(({ set }) => () => {
    cartItemState.forEach((cartItem) => {
      set(selectedCartItemIds(cartItem.id), false);
    });
  });

  return {
    selectAllItem,
    unselectAllItem,
    isAllItemSelected,
  };
};

export default useSelectAllCartItem;
