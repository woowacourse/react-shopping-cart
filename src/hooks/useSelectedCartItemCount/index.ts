import { useRecoilValue } from "recoil";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";
import { cartItemsState } from "../../recoil/cartItems";
import { calculateSelectedCartItemCount } from "./calculateSelectedCartItemCount";

interface UseSelectCartItemCountReturn {
  selectedCartItemCount: number;
  selectedUniqueCartItemCount: number;
}

export const useSelectedCartItemCount = (): UseSelectCartItemCountReturn => {
  const selectedCartItemIds = useRecoilValue(selectedCartItemIdsState);
  const cartItems = useRecoilValue(cartItemsState);

  const selectedCartItemCount = calculateSelectedCartItemCount(cartItems);
  const selectedUniqueCartItemCount = selectedCartItemIds.length;

  return { selectedCartItemCount, selectedUniqueCartItemCount };
};
